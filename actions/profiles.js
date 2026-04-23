"use server";

/**
 * Profile Actions — Phase 3 Migration
 *
 * Replaced all Supabase A profile reads/writes with FastAPI endpoints.
 *
 * GET  /v1/app/me         → get current user (replaces profiles table read)
 * PATCH /v1/app/update-kyc → update profile (replaces profiles table update)
 */

import { getMeFromAPI } from "@/lib/api/auth";
import { updateKYC } from "@/lib/api/users";
import { getServerToken } from "@/lib/session";
import { revalidatePath } from "next/cache";

// ─── Get Profile ──────────────────────────────────────────────────────────────

/**
 * Fetch the current authenticated user's profile.
 * Tries FastAPI first, falls back to Supabase A for migration-pending users.
 */
export const getProfileAction = async () => {
  try {
    const token = await getServerToken();

    if (token) {
      const { data: profile, error } = await getMeFromAPI(token);
      // console.log("Profile data:", profile);

      if (error) {
        console.warn("[getProfileAction] API returned error:", error);
        return { success: false, error };
      }
      return {
        success: true,
        profile: {
          ...profile,
          kyc: profile.kyc,
        },
      };
    }

    // Supabase A fallback — remove once all users migrated
    const { createClient, getUser } = await import("@/lib/supabase/server");
    const user = await getUser();
    if (!user) return { success: false, error: "User not authenticated." };

    const supabase = await createClient();
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", user.email)
      .maybeSingle();

    if (error) {
      console.warn("[getProfileAction] Supabase fallback error:", error);
      return { success: false, error: error.message };
    }
    return { success: true, profile };
  } catch (err) {
    console.warn("[getProfileAction] Error:", err.message);
    return { success: false, error: err.message };
  }
};

// ─── Update Profile ───────────────────────────────────────────────────────────

/**
 * Update the authenticated user's profile / KYC data.
 *
 * Maps the existing profile field names to the FastAPI KYC schema.
 * Fields that don't map to KYC are noted for future backend expansion.
 *
 * @param {object} profileData - Profile fields from the settings form
 */
export const updateProfileAction = async (profileData) => {
  try {
    const token = await getServerToken();

    if (token) {
      // Map profile form fields → KYC schema fields
      const kycPayload = {};

      if (profileData.full_name) {
        const parts = profileData.full_name.trim().split(" ");
        kycPayload.first_name = parts[0] || "";
        kycPayload.last_name = parts.slice(-1)[0] || "";
        kycPayload.other_name = parts.slice(1, -1).join(" ") || "";
      }

      if (profileData.date_of_birth) {
        kycPayload.date_of_birth = new Date(
          profileData.date_of_birth,
        ).toISOString();
      }

      if (profileData.city) kycPayload.residence_town = profileData.city;
      if (profileData.billing_country)
        kycPayload.residence_region = profileData.billing_country;
      if (profileData.address_line1)
        kycPayload.post_gps_address = profileData.address_line1;

      const { error } = await updateKYC(kycPayload, token);
      if (error) {
        console.warn("[updateProfileAction] API returned error:", error);
        return { success: false, error };
      }

      revalidatePath("/dashboard");
      revalidatePath("/dashboard/settings");
      return { success: true };
    }

    // Supabase A fallback — remove once all users migrated
    const { createClient, getUser } = await import("@/lib/supabase/server");
    const user = await getUser();
    if (!user) return { success: false, error: "User not authenticated." };

    const supabase = await createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profileData.full_name,
        username: profileData.username,
        bio: profileData.bio,
        website: profileData.website,
        public_email: profileData.public_email,
        phone: profileData.phone,
        avatar_url: profileData.avatar_url,
        home_country: profileData.country,
        preferred_destinations: profileData.preferred_destinations,
        travel_frequency: profileData.travel_frequency,
        date_of_birth: profileData.date_of_birth,
        address_line1: profileData.address_line1,
        address_line2: profileData.address_line2,
        city: profileData.city,
        postal_code: profileData.postal_code,
        billing_country: profileData.billing_country,
      })
      .eq("id", user.id);

    if (error) {
      console.warn("[updateProfileAction] Supabase fallback error:", error);
      return { success: false, error: error.message };
    }
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (err) {
    console.warn("[updateProfileAction] Error:", err.message);
    return { success: false, error: err.message };
  }
};
