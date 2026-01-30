"use server";

import { createClient, getUser } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const getProfileAction = async () => {
  try {
    const user = await getUser();
    if (!user) {
      revalidatePath("/dashboard");
      return { success: false, error: "User not authenticated." };
    }
    let email = user.email;

    const supabase = await createClient();
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;

    return { success: true, profile };
  } catch (err) {
    console.error("Error fetching profile:", err);
    return { success: false, error: err.message };
  }
};

export const updateProfileAction = async (profileData) => {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, error: "User not authenticated." };
    }

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
        home_country: profileData.country, // Mapping country to home_country as per DB schema
        preferred_destinations: profileData.preferred_destinations,
        travel_frequency: profileData.travel_frequency,
        // Billing information fields
        date_of_birth: profileData.date_of_birth,
        address_line1: profileData.address_line1,
        address_line2: profileData.address_line2,
        city: profileData.city,
        postal_code: profileData.postal_code,
        billing_country: profileData.billing_country,
      })
      .eq("id", user.id);

    if (error) throw error;

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (err) {
    console.error("Error updating profile:", err);
    return { success: false, error: err.message };
  }
};
