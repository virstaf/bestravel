"use server";

import { createClient } from "@/lib/supabase/server";

export const getFeaturedDealsAction = async ({ limit }) => {
  const supabase = await createClient();

  const getDealsWithPartners = async () => {
    // 1. Fetch deals
    const { data: deals, error: dealsError } = await supabase
      .from("deals")
      .select("*")
      .eq("is_active", true)
      .gte("end_date", new Date().toISOString());

    if (dealsError) throw dealsError;

    // 2. Get unique partner IDs
    const partnerIds = [
      ...new Set(deals.map((d) => d.partner_id).filter(Boolean)),
    ];

    // 3. Fetch partners
    const { data: partners, error: partnersError } = await supabase
      .from("partners")
      .select("*")
      .in("id", partnerIds);

    if (partnersError) throw partnersError;

    // 4. Combine data with fallbacks
    return deals.map((deal) => ({
      ...deal,
      partner: partners.find((p) => p.id === deal.partner_id) || {
        name: "Partner Not Found",
        location: "",
        is_featured: false,
        // Add other required partner fields
      },
    }));
  };

  const dealsWithPartners = await getDealsWithPartners();
  const featuredDeals = dealsWithPartners.filter(
    (deal) => deal.partner.is_featured
  );
  return featuredDeals.slice(0, limit) || featuredDeals || [];
  // return featuredDeals || [];
};

export const getDealsAction = async (limit) => {
  try {
    const supabase = await createClient();

    // Fetch all deals for server-side rendering
    const { data } = await supabase
      .from("deals")
      .select(
        `
      *,
      partners:partner_id (
        name,
        type,
        location,
        is_featured
      )
    `
      )
      .eq("is_active", true)
      .gte("end_date", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(limit);

    return data;
  } catch (error) {
    return { errorMessage: error.message };
  }
};
