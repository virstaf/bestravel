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
      priceId: priceId,
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
