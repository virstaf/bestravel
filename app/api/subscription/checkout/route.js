import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/subscription";
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

    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const url = await createCheckoutSession({
      userId: user.id,
      email: user.email,
      priceId,
    });

    return Response.json({ url });
  } catch (error) {
    console.error("[API:checkout] Error:", error);
    return Response.json(
      {
        error: "Failed to create checkout session",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
