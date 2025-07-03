// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createClient, getUser } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  //   apiVersion: "2023-10-16",
});

export async function POST(req) {
  const user = await getUser();

  if (!user)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRO_PRICE_ID, // from Stripe Dashboard
        quantity: 1,
      },
    ],
    customer_email: user.email,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
    subscription_data: {
      trial_period_days: 7,
      metadata: {
        supabase_user_id: user.id,
      },
    },
  });

  return NextResponse.json({ url: session.url });
}
