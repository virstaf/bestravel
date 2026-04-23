"use server";

/**
 * Auth Actions — Phase 2 Migration
 *
 * All auth operations now route through FastAPI (Supabase B).
 *
 * ⚠️  TEMPORARY FALLBACK:
 * loginAction includes a Supabase A fallback for legacy users.
 * Once the FastAPI backend implements the lazy migration (Supabase A password
 * fallback in /v1/app/login), the fallback block below can be removed.
 */

import {
  loginWithAPI,
  registerWithAPI,
  deregisterWithAPI,
  changePasswordWithAPI,
} from "@/lib/api/auth";
import { completeKYC, updateKYC } from "@/lib/api/users";
import {
  getServerToken,
  setServerToken,
  clearServerToken,
  getOrCreateDeviceId,
} from "@/lib/session";
import { handleError } from "@/lib/utils.ts";
import { revalidatePath } from "next/cache.js";
import { resendEmail } from "./resendEmail.js";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "https://virstravelclub.com";

// ─── Login ───────────────────────────────────────────────────────────────────

export const loginAction = async (email, password) => {
  try {
    // device_id is required by FastAPI's /v1/app/login contract.
    // On the server during a form action, we read from a cookie if it was
    // previously set, or generate a stable web ID.
    let deviceId = "web-default";

    // 1. Try FastAPI first (Supabase B)
    const { data, error } = await loginWithAPI({ email, password, deviceId });

    if (!error && data) {
      const token = data.access_token;
      if (!token) return handleError("Login failed. No token received.");

      await setServerToken(token);
      return { errorMessage: null, token, user: data };
    }

    // 2. ── AUTO-SYNC FALLBACK (SEAMLESS MIGRATION) ─────────────────────────
    //    FastAPI login failed. Let's verify if they are a legacy user in Supabase A.
    console.warn(
      "[loginAction] FastAPI login failed, trying Supabase A fallback:",
      error,
    );

    const { createClient } = await import("@/lib/supabase/server.js");
    const supabase = await createClient();
    const { data: supabaseData, error: supabaseError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (supabaseError) {
      // Both systems failed — credentials are wrong
      return handleError("Invalid email or password.");
    }

    // Supabase A login succeeded → user exists only in Supabase A!
    // Let's seamlessly migrate them to FastAPI in the background.
    console.log(
      "[loginAction] Legacy user authenticated. Auto-syncing to FastAPI...",
    );

    // Attempt to register them silently in FastAPI
    const { error: syncError } = await registerWithAPI({
      email,
      password,
      phone: "+000000000000", // Placeholder, FastAPI requires it. Can update via KYC later.
    });

    if (syncError) {
      console.error("[loginAction] Auto-sync registration failed:", syncError);
      // We couldn't sync them. Return their Supabase token so they aren't fully locked out,
      // but note that FastAPI-dependent features will fail.
      return {
        errorMessage: null,
        token: supabaseData.session?.access_token,
        user: supabaseData.user,
        isMigrationPending: true,
      };
    }

    // Auto-sync succeeded! Now log them into FastAPI to get their vs_token.
    const { data: syncLoginData, error: syncLoginError } = await loginWithAPI({
      email,
      password,
      deviceId,
    });

    if (syncLoginError || !syncLoginData?.access_token) {
      console.error("[loginAction] Auto-sync login failed:", syncLoginError);
      return {
        errorMessage: null,
        token: supabaseData.session?.access_token,
        user: supabaseData.user,
        isMigrationPending: true,
      };
    }

    // Complete success! They are now fully migrated.
    console.log(
      "[loginAction] Auto-sync complete. User migrated successfully.",
    );
    const migratedToken = syncLoginData.access_token;
    await setServerToken(migratedToken);

    return {
      errorMessage: null,
      token: migratedToken,
      user: syncLoginData,
      justMigrated: true, // Optional flag if the UI wants to show a "Welcome" toast
    };
    // ── END AUTO-SYNC FALLBACK ──────────────────────────────────────────────
  } catch (err) {
    return handleError(err);
  }
};

// ─── Logout ──────────────────────────────────────────────────────────────────

export const logoutAction = async () => {
  try {
    await clearServerToken();

    // Also clear any Supabase A session that might still be active (fallback period)
    try {
      const { createClient } = await import("@/lib/supabase/server.js");
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // Supabase may not be active — ignore
    }

    revalidatePath("/");
    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

// ─── Signup ───────────────────────────────────────────────────────────────────

export const signupAction = async (
  email,
  password,
  title,
  firstName,
  lastName,
  phone,
) => {
  try {
    // 1. Register
    console.log("Registering...");
    const { data: regData, error: regError } = await registerWithAPI({
      email,
      password,
      phone,
    });

    if (regError) {
      console.error("[signupAction] FastAPI registration error:", regError);
      return handleError(regError);
    }

    // 2. Silently login to get the token
    let deviceId = "web-default";
    console.log("Logging in...", email);
    const { data: loginData, error: loginError } = await loginWithAPI({
      email,
      password,
      deviceId,
    });

    if (loginError || !loginData?.access_token) {
      console.error(
        "[signupAction] Auto-sync login failed after registration:",
        loginError,
      );
      return handleError("Registration succeeded but login failed.");
    }

    const token = loginData.access_token;
    await setServerToken(token);

    // 3. Complete KYC
    console.log("Filling kyc data for...", firstName);

    const kycPayload = {
      title,
      first_name: firstName,
      // other_name: "string",
      last_name: lastName,
      // national_id_front_url: "https://example.com/",
      // national_id_back_url: "https://example.com/",
      // head_shot_url: "https://example.com/",
      // date_of_birth: "1990-01-01",
      // residence_region: "string",
      // residence_town: "string",
      // post_gps_address: "string",
    };
    const { error: kycError } = await completeKYC(kycPayload, token);

    if (kycError) {
      console.error("[signupAction] Complete KYC error:", kycError);
      // Even if KYC fails, user is registered and logged in, but we can return error to notify them
      return handleError(kycError);
    }

    // Send welcome email
    const displayName = firstName || email.split("@")[0];
    const sendNotification = await resendEmail(
      {
        fullname: displayName,
        email,
      },
      "welcome",
    );
    // let defaultPayload = {
    //   title:"string",
    //   first_name:"string",
    //   other_name:"string",
    //   last_name:"string",
    //   national_id_front_url:"https://example.com/",
    //   national_id_back_url:"https://example.com/",
    //   head_shot_url:"https://example.com/",
    //   date_of_birth:"1990-01-01",
    //   residence_region: "string",
    //   residence_town: "string",
    //   post_gps_address: "string",
    // }
    //     const newPayload = {
    //       // ...defaultPayload,
    //       title,
    //       first_name: firstName,
    //       last_name: lastName,
    //     }

    if (!sendNotification.success) {
      console.error(
        "[signupAction] Welcome email failed:",
        sendNotification.message,
      );
      // Don't block registration for an email failure
    }

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

// ─── Password Reset ───────────────────────────────────────────────────────────

/**
 * Initiates a password reset via Supabase A's email flow.
 * TODO: Migrate to FastAPI OTP flow once phone number is reliably collected
 *       during signup. FastAPI uses phone OTP; Supabase uses email link.
 */
export const resetPasswordAction = async (email) => {
  try {
    const { createClient } = await import("@/lib/supabase/server.js");
    const { auth } = await createClient();
    const { error } = await auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/auth/reset-password`,
    });

    if (error) throw error;
    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

// ─── Update Password (authenticated user) ────────────────────────────────────

export const updatePasswordAction = async (oldPassword, newPassword) => {
  try {
    const token = await getServerToken();

    if (token) {
      // FastAPI path — user has a FastAPI JWT
      const { error } = await changePasswordWithAPI(
        {
          oldPassword,
          newPassword,
          confirmNewPassword: newPassword,
        },
        token,
      );
      if (error) throw new Error(error);
      return { errorMessage: null };
    }

    // Supabase A fallback (migration pending users)
    const { createClient } = await import("@/lib/supabase/server.js");
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

// ─── Delete Account ──────────────────────────────────────────────────────────

export const deleteAccountAction = async () => {
  try {
    const token = await getServerToken();

    if (token) {
      const { error } = await deregisterWithAPI(token);
      if (error) throw new Error(error);
      await clearServerToken();
      return { errorMessage: null };
    }

    // Supabase A fallback
    const { createClient } = await import("@/lib/supabase/server.js");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return handleError("No user is currently logged in.");
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) throw error;
    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

// ─── Google Auth (deferred) ───────────────────────────────────────────────────

/**
 * Google OAuth is not yet supported in FastAPI.
 * This remains Supabase-based until FastAPI adds OAuth support.
 */
export const googleAuthAction = async () => {
  const { createClient } = await import("@/lib/supabase/server.js");
  const { auth } = await createClient();
  const { data, error } = await auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/dashboard`,
      queryParams: { access_type: "offline", prompt: "consent" },
    },
  });

  if (error) {
    return { errorMessage: error.message };
  }

  if (data.url) {
    const { redirect } = await import("next/navigation.js");
    redirect(data.url);
  }

  return { errorMessage: null };
};
