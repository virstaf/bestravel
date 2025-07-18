"use server";

import { createClient } from "@supabase/supabase-js";

// import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing in environment variables");
}

export const getUserSubscription = async (userId) => {
  const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
  // console.log("user id from action", userId);
  try {
    const {
      data: { subscription_plan },
      error,
    } = await supabaseAdmin
      .from("profiles")
      .select("subscription_plan")
      .eq("id", userId)
      .maybeSingle(); //

    if (error) {
      return "inactive";
    } else {
      return subscription_plan;
    }
  } catch (error) {
    console.error("Failed to fetch subscription:", error.message);
    return "inactive"; // Default on error
  }

  //   return "inactive"; // Default value, replace with actual logic if needed
};
