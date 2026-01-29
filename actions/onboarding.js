"use server";

import { createClient, getUser } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Update user profile with onboarding data
 * @param {Object} onboardingData - User's onboarding preferences
 * @param {string} onboardingData.homeCountry - User's home country
 * @param {string[]} onboardingData.preferredDestinations - Array of preferred destinations (max 5)
 * @param {string} onboardingData.travelFrequency - Travel frequency selection
 * @returns {Object} Success status and optional error message
 */
export const updateOnboardingProfile = async (onboardingData) => {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, error: "User not authenticated." };
    }

    const { homeCountry, preferredDestinations, travelFrequency } =
      onboardingData;

    // Validate destinations array length (capped at 3-5)
    if (preferredDestinations && preferredDestinations.length > 5) {
      return { success: false, error: "Maximum 5 destinations allowed." };
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        home_country: homeCountry,
        preferred_destinations: preferredDestinations,
        travel_frequency: travelFrequency,
        onboarding_completed: true,
      })
      .eq("email", user.email);

    if (error) {
      console.error("Error updating onboarding profile:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    console.error("Error in updateOnboardingProfile:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Get personalized deals based on user preferences
 * @param {string[]} preferredDestinations - Array of user's preferred destinations
 * @returns {Object} Success status and deals array
 */
export const getPersonalizedDeals = async (preferredDestinations) => {
  try {
    const supabase = await createClient();

    // Fetch deals that match any of the preferred destinations
    const { data: deals, error } = await supabase
      .from("deals")
      .select("*")
      .or(
        preferredDestinations
          .map((dest) => `destination.ilike.%${dest}%`)
          .join(","),
      )
      .eq("is_active", true)
      .limit(4);

    if (error) {
      console.error("Error fetching personalized deals:", error);
      return { success: false, error: error.message, deals: [] };
    }

    return { success: true, deals: deals || [] };
  } catch (err) {
    console.error("Error in getPersonalizedDeals:", err);
    return { success: false, error: err.message, deals: [] };
  }
};

/**
 * Check if user has completed onboarding
 * @returns {Object} Success status and onboarding completion status
 */
export const checkOnboardingStatus = async () => {
  try {
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        completed: false,
        error: "User not authenticated.",
      };
    }

    const supabase = await createClient();
    const { data: profile, error } = await supabase
      .from("profiles")
      .select(
        "onboarding_completed, home_country, preferred_destinations, travel_frequency, membership_tier",
      )
      .eq("email", user.email)
      .maybeSingle();

    if (error) {
      console.error("Error checking onboarding status:", error);
      return { success: false, completed: false, error: error.message };
    }

    return {
      success: true,
      completed: profile?.onboarding_completed || false,
      profile: profile || null,
    };
  } catch (err) {
    console.error("Error in checkOnboardingStatus:", err);
    return { success: false, completed: false, error: err.message };
  }
};
