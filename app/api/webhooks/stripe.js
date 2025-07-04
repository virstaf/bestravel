// app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
// import { buffer } from "micro";

// Set this to the same version you're using on the server
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-06-30.basil",
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // must be service role for admin updates
);

// Required to read raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const rawBody = await req.text(); // if using App Router
  const sig = req.headers.get("stripe-signature") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle events
  const session = event.data.object;

  switch (event.type) {
    case "checkout.session.completed":
    case "invoice.payment_succeeded":
      if (session?.metadata?.supabase_user_id) {
        const userId = session.metadata.supabase_user_id;
        await supabaseAdmin
          .from("profiles")
          .update({
            is_subscribed: true,
            subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Optional: estimate 30 days
          })
          .eq("id", userId);
      }
      break;

    case "customer.subscription.deleted":
      // Handle cancellations or end of trial
      const customer = session.customer_email;
      if (customer) {
        await supabaseAdmin
          .from("profiles")
          .update({ is_subscribed: false })
          .eq("email", customer);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
