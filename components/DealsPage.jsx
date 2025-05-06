// app/deals/page.js
import { createClient } from "@/lib/supabase/server";
import DealsList from "@/components/deals-list";

const Deals = async () => {
  const supabase = await createClient();

  // Fetch featured deals for server-side rendering
  const { data: featuredDeals } = await supabase
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

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Featured Deals</h1>
        <p className="text-muted-foreground">
          Special offers from our premium partners
        </p>
        <DealsList initialDeals={featuredDeals} featuredOnly />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Current Deals</h2>
        <p className="text-muted-foreground">Browse all available offers</p>
        <DealsList />
      </div>
    </div>
  );
};

export default Deals;
