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
          is_featured
        )
      `
      )
      .eq("is_active", true)
      .gte("end_date", new Date().toISOString());

    if (featured) {
      query = query.eq("partner.is_featured", true);
    }

    query = query.order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: deals, error } = await query;

    if (error) {
      console.error("Error fetching deals:", error);
      throw error;
    }

    return NextResponse.json(deals || []);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
