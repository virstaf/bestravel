"use server";

import { createClient } from "@/lib/supabase/server.js";
import { generateCustomerId, handleError } from "../lib/utils.ts";
import { redirect } from "next/navigation.js";
import { resendEmail } from "./resendEmail.js";
import useUserStore from "@/user.store.js";
import { revalidatePath } from "next/cache.js";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "https://virstravelclub.com";

export const loginAction = async (email, password) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const token = data.session?.access_token;
    const user = data.user;
    if (!token || !user) {
      return handleError("Login failed. Please check your credentials.");
    }
    // useStore.setState({ login: { token, isAuthenticated: true, user } });

    const userId = data.user?.id;
    const { full_name, username, public_email } =
      data.user?.user_metadata || {};

    const profile = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (!profile.data) {
      // 1. Generate unique customer ID
      const isAdmin = email.endsWith("@virstravelclub.com");
      const role = isAdmin ? "ADMIN" : "USER";
      const customerId = generateCustomerId(role);
      // 2. Create profile if it doesn't exist
      const response = await supabase.from("profiles").insert({
        id: userId,
        email,
        full_name,
        username,
        public_email,
        customer_id: customerId,
        role,
      });
      if (response.error) {
        console.error("Error creating profile:", response.error);
        throw handleError(response.error || "Error creating profile");
      } else {
        console.log("Profile created successfully:", response.data);
        const sendNotification = await resendEmail(
          {
            fullname: full_name.split(" ")[0] || email.split("@")[0],
            membershipId: customerId,
            email,
          },
          "welcome"
        );
        if (!sendNotification.success) {
          console.error(
            "Error sending welcome email:",
            sendNotification.message
          );
          return handleError(sendNotification.message);
        }
      }
    }

    // revalidatePath("/", "layout");

    return { errorMessage: null, token, user };
  } catch (error) {
    return handleError(error);
  }
};

export const logoutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signupAction = async (email, password, fullname) => {
  const isAdmin = email.endsWith("@virstravelclub.com");
  try {
    const { auth } = await createClient();
    const { error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: fullname,
          username: fullname.split(" ").join("_").toLowerCase(),
          full_name: fullname,
          public_email: email,
          ...(isAdmin && { role: "ADMIN" }),
        },
      },
    });

    if (error) {
      console.error("Error signing up:", error);

      return handleError(error.message);
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const resetPasswordAction = async (email) => {
  try {
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

export const updatePasswordAction = async (password) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) throw error;
    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

export const googleAuthAction = async () => {
  const { auth } = await createClient();
  const { data, error } = await auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/dashboard`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  useUserStore.setState({ isAuthenticated: true });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
  if (error) {
    console.error("Error signing in with Google:", error.message);
    return { errorMessage: error.message };
  }
  return { errorMessage: null };
};

export const deleteAccountAction = async () => {
  try {
    const supabase = await createClient();
    const { auth } = supabase;
    const { user, error: userError } = await auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return handleError(userError.message);
    }

    if (!user) {
      return handleError("No user is currently logged in.");
    }

    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      user.id
    );
    if (deleteError) {
      console.error("Error deleting user:", deleteError);
      return handleError(deleteError.message);
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
