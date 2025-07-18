// app/api/webhooks/stripe/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";
import { metadata } from "@/app/layout";
// import { buffer } from "micro";

export const GET = async () => {
  return NextResponse.json({ message: "Webhook endpoint is active" });
};

// Set this to the same version you're using on the server
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // must be service role for admin updates
);

export const POST = async (req) => {
  const rawBody = await req.text(); // if using App Router
  const sig = req.headers.get("stripe-signature") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_SIGNING_SECRET
    );
    console.log("Webhook event constructed successfully:", event.type);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle events
  const session = event.data.object;
  const customerId = session?.customer;
  // const customer = await stripe.customers.retrieve(customerId);

  console.log("event session:::", session?.parent?.subscription_details);

  const isTrial = session?.amount_due === 0;

  switch (event.type) {
    case "checkout.session.completed":
    case "invoice.payment_succeeded":
      await supabaseAdmin
        .from("profiles")
        .update({
          is_subscribed: true,
          stripe_customer_id: session.customer,
          subscription_status: isTrial ? "trialing" : "active",
          subscription_plan: isTrial ? "trial" : "paid_plan",
          ...(isTrial && {
            trial_start: new Date(session.created * 1000).toISOString(),
            trial_ends_at: new Date(
              (session.created + 7 * 24 * 60 * 60) * 1000
            ).toISOString(),
          }),
          subscription_plan_id:
            session.parent?.subscription_details?.subscription,
          subscription_end: new Date(session.period_end * 1000),
        })
        .eq("email", session.customer_email);

      // Update the subscription in the database

      if (session) {
        const { data: subData, error: subError } = await supabaseAdmin
          .from("subscriptions")
          .upsert({
            id: session.id,
            user_id: session.parent?.subscription_details?.metadata.userId,
            plan_id: session.parent?.subscription_details?.subscription,
            user_email: session.customer_email,
            status: isTrial ? "trialing" : "active",
            current_period_start: new Date(session.period_start * 1000),
            current_period_end: new Date(session.period_end * 1000),
          });

        if (subError) {
          console.error("Error updating subscription:", subError);
          // return NextResponse.json({ error: "Subscription update failed" }, { status: 500 });
        }
      }

      revalidatePath("/dashboard");

      break;

    case "customer.subscription.deleted":
      // Handle cancellations or end of trial
      const customer = session.customer_email;
      if (customer) {
        await supabaseAdmin
          .from("profiles")
          .update({
            is_subscribed: false,
            subscription_status: session.status,
            subscription_end: new Date(Date.now()),
          })
          .eq("email", customer);
      }
      revalidatePath("/dashboard");
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
};
