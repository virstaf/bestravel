"use server";

import { createClient } from "@/lib/supabase/server";

export const getFeaturedDealsAction = async () => {
  try {
    const supabase = await createClient();

    // Fetch featured deals for server-side rendering
    const { data } = await supabase
      .from("deals")
      .select(
        `
      *,
      partners:partner_id (
        name,
        type,
        location,
        images,
        amenities,
        is_featured
      )
    `
      )
      .eq("is_active", true)
      .eq("partners.is_featured", true)
      .gte("end_date", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(3);

    return data;
  } catch (error) {
    return { errorMessage: error.message };
  }
};
