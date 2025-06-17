"use server";

import { createClient, getUser } from "@/lib/supabase/server";

export const getProfileAction = async () => {
  const { email } = await getUser();
  console.log("Fetching profile for email:", email);

  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: error.message };
  }
  console.log("Profile fetched successfully:", profile);

  return { success: true, profile };
};
