"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const getFeaturedDealsAction = async ({ limit }) => {
  const supabase = await createClient();

  const { data: deals, error } = await supabase
    .from("deals")
    .select(
      `
      *,
      partners:partner_id (
        name,
        type,
        location
      )
    `,
    )
    .eq("is_active", true)
    .eq("is_featured", true)
    .gte("end_date", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return deals || [];
};

export const getDealsAction = async ({
  limit,
  dest,
  maxPrice,
  from,
  to,
  sort,
} = {}) => {
  try {
    const supabase = await createClient();

    // Fetch deals with optional filtering
    let query = supabase.from("deals").select(
      `
      *,
      partners:partner_id (
        name,
        type,
        location
      )
    `,
    );

    // Basic status filters
    query = query
      .eq("is_active", true)
      .gte("end_date", new Date().toISOString());

    // Destination filter
    if (dest) {
      query = query.or(`location.ilike.%${dest}%,title.ilike.%${dest}%`);
    }

    // Max Price filter
    // Note: Since discounted_price calculation happens in JS/SQL, we use the original_price or a calculated field if available
    // For now, filtering by original_price as a proxy or if discounted_price exists in DB
    if (maxPrice) {
      query = query.lte("original_price", parseInt(maxPrice));
    }

    // Dates filter
    if (from) {
      query = query.gte("travel_start_date", from);
    }
    if (to) {
      query = query.lte("end_date", to);
    }

    // Sorting
    switch (sort) {
      case "lowest-price":
        query = query.order("original_price", { ascending: true });
        break;
      case "popular":
        query = query.order("is_featured", { ascending: false });
        break;
      case "ending-soon":
        query = query.order("end_date", { ascending: true });
        break;
      case "best-value":
      default:
        query = query.order("discount_percentage", { ascending: false });
        break;
    }

    // Fallback sort to newest first
    query = query.order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error in getDealsAction:", error);
    return [];
  }
};

export const getDealByIdAction = async (dealId) => {
  try {
    const supabase = await createClient();
    const { data: deal, error } = await supabase
      .from("deals")
      .select(
        `
        *,
        partners:partner_id (
          name,
          type,
          location
        )
      `,
      )
      .eq("id", dealId)
      .single();

    if (error) throw error;

    return deal;
  } catch (error) {
    return { errorMessage: error.message };
  }
};

export const getPartnersListAction = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("partners")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
};

export const createDealAction = async (dealData) => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from("deals").insert([dealData]);

    if (error) {
      console.error("Error creating deal:", error);
      throw new Error(error.message);
    }

    revalidatePath("/admin/deals");
    revalidatePath("/dashboard/deals");
    revalidatePath("/"); // For featured deals
    return { success: true };
  } catch (error) {
    console.error("Server action error:", error);
    return { success: false, error: error.message };
  }
};

export const deleteDealAction = async (dealId) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("deals").delete().eq("id", dealId);

    if (error) throw error;

    revalidatePath("/admin/deals");
    revalidatePath("/dashboard/deals");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateDealAction = async (dealId, dealData) => {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("deals")
      .update(dealData)
      .eq("id", dealId);

    if (error) {
      console.error("Error updating deal:", error);
      throw new Error(error.message);
    }

    revalidatePath("/admin/deals");
    revalidatePath("/dashboard/deals");
    revalidatePath(`/dashboard/deals/${dealId}`);
    revalidatePath("/"); // For featured deals
    return { success: true };
  } catch (error) {
    console.error("Server action error:", error);
    return { success: false, error: error.message };
  }
};
