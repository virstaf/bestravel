"use server";

import { createClient, getUser } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const getProfileAction = async () => {
  try {
    const user = await getUser();
    if (!user) {
      revalidatePath("/dashboard");
      console.error("No user found.");
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
