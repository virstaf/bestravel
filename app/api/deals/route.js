// app/api/deals/route.js
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const featured = searchParams.get("featured");

  const supabase = await createClient();

  try {
    let query = supabase
      .from("deals")
      .select(
        `
      *,
      partner:partner_id (
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
      .gte("end_date", new Date().toISOString())
      .order("created_at", { ascending: false });

    if (featured) {
      query = query.eq("partners.is_featured", true);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: deals, error } = await query;

    if (error) throw error;

    return NextResponse.json(deals);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
