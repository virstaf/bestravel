// app/deals/[dealId]/page.js
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import DealDetail from "@/components/deal-detail";

export default async function DealDetailPage({ params }) {
  const supabase = await createClient();

  const { data: deal } = await supabase
    .from("deals")
    .select(
      `
      *,
      partners:partner_id (
        name,
        type,
        location,
        description,
        images,
        amenities,
        contact_email,
        website_url
      )
    `
    )
    .eq("id", params.dealId)
    .single();

  if (!deal) {
    notFound();
  }

  return <DealDetail deal={deal} />;
}
