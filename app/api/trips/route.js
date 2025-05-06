// app/api/trips/route.js
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    // Get current user session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch trips for the current user
    const { data: trips, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", user.id)
      .order("start_date", { ascending: true });

    if (error) {
      throw error;
    }

    return NextResponse.json(trips);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
