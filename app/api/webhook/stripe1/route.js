// app/api/webhook/stripe/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
// import { buffer } from "micro";

// Set this to the same version you're using on the server
const stripe = new Stripe(
  process.env.NODE_ENV === "development"
    ? process.env.STRIPE_SECRET_KEY_TEST
    : process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: "2020-08-27",
  }
);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // must be service role for admin updates
);

export async function POST(req) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.NODE_ENV === "development"
        ? process.env.STRIPE_WEBHOOK_SECRET_TEST
        : process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const session = event.data.object;

  switch (event.type) {
    case "checkout.session.completed":
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription
      );
      const userId = session.metadata?.user_id;

      console.log("Checkout session completed:", {
        session,
      });

      await supabaseAdmin
        .from("profiles")
        .update({
          is_subscribed: true,
          stripe_customer_id: session.customer,
          subscription_status: session.status,
          //   subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Optional: estimate 30 days
          subscription_end: new Date(session.period_end * 1000),
        })
        .eq("email", session.customer_email);

      // await supabaseAdmin.from("subscriptions").upsert({
      //   user_id: userId,
      //   user_email: session.customer_email,
      //   stripe_subscription_id: subscription.id,
      //   status: subscription.status,
      //   current_period_start: new Date(
      //     subscription.current_period_start * 1000
      //   ),
      //   current_period_end: new Date(subscription.current_period_end * 1000),
      // });
      break;

    // Handle other events...
  }

  return NextResponse.json({ received: true });
}

export const GET = async () => {
  return NextResponse.json(
    { message: "Stripe webhook endpoint" },
    { status: 201 }
  );
};

// export async function POST(req) {
//   const rawBody = await req.text(); // if using App Router
//   const sig = req.headers.get("stripe-signature") || "";

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       rawBody,
//       sig,
//       process.env.NODE_ENV === "development"
//         ? process.env.STRIPE_WEBHOOK_SECRET_TEST
//         : process.env.STRIPE_WEBHOOK_SECRET
//     );
//     console.log("Webhook event constructed successfully:", event.type);
//   } catch (err) {
//     console.error("Webhook signature verification failed.", err.message);
//     return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//   }

//   // Handle events
//   const session = event.data.object;
//   console.log("Session:", session);

//   switch (event.type) {
//     case "checkout.session.completed":
//     case "invoice.payment_succeeded":
//       await supabaseAdmin
//         .from("profiles")
//         .update({
//           is_subscribed: true,
//           stripe_customer_id: session.customer,
//           subscription_status: session.status,
//           //   subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Optional: estimate 30 days
//           subscription_end: new Date(session.period_end * 1000),
//         })
//         .eq("email", session.customer_email);

//       await supabaseAdmin.from("subscriptions").insert({
//         user_id: user.id,
//         user_email: session.customer_email,
//         stripe_subscription_id: session.id,
//         status: session.status,
//         current_period_start: new Date(session.current_period_start * 1000),
//         current_period_end: new Date(session.current_period_end * 1000),
//       });

//       break;

//     case "customer.subscription.deleted":
//       // Handle cancellations or end of trial
//       const customer = session.customer_email;
//       if (customer) {
//         await supabaseAdmin
//           .from("profiles")
//           .update({
//             is_subscribed: false,
//             subscription_status: session.status,
//             subscription_end: new Date(Date.now()),
//           })
//           .eq("email", customer);
//       }
//       break;

//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   return NextResponse.json({ received: true });
// }
