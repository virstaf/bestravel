import { NextResponse } from "next/server";
import { createPortalSession } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get profile to retrieve stripe_customer_id
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    const url = await createPortalSession(profile.stripe_customer_id);

    return Response.json({ url });
  } catch (error) {
    console.error("[API:portal] Error:", error);
    return Response.json(
      {
        error: "Failed to create portal session",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
