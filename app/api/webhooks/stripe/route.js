// app/api/webhooks/stripe/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
// import { createClient } from "@supabase/supabase-js";
// import { revalidatePath } from "next/cache";
// import { resendEmail } from "@/actions/resendEmail";
import {
  handleCustomerCreated,
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handleTrialWillEnd,
  handlePaymentFailed,
} from "@/lib/subscription";
// import { resendEmail } from "@/actions/resendEmail";

export const GET = async () => {
  return NextResponse.json({ message: "Webhook endpoint is active" });
};

// Set this to the same version you're using on the server
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

export const POST = async (req) => {
  const rawBody = await req.text(); // if using App Router
  const sig = req.headers.get("stripe-signature") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_SIGNING_SECRET,
    );
    console.log("Webhook event constructed successfully:", event.type);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle events
  const session = event.data.object;

  switch (event.type) {
    //handle new customer creation
    case "customer.created":
      await handleCustomerCreated(session);
      break;

    // Handle New subscription started
    // case "customer.subscription.created":
    case "invoice.payment_succeeded":
      await handleSubscriptionCreated(session);

      break;

    //Subscription modified (plan change, pause/resume)
    case "customer.subscription.updated":
      await handleSubscriptionUpdated(session);

      break;

    // Subscription canceled/ended
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(session);

      break;

    case "customer.subscription.trial_will_end":
      await handleTrialWillEnd(session);
      break;

    case "invoice.payment_failed":
      await handlePaymentFailed(session);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
};
