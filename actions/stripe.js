"use server";

import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { sub } from "date-fns";

export const subscribeAction = async (user, priceId) => {
  // console.log("Subscribing user:", user, "with priceId:", priceId);
  const { url } = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: 7, // Optional: Set a trial period
      metadata: {
        userId: user?.id,
        email: user?.email,
      },
    },
    customer_email: user?.email,
    success_url: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASEURL}`,
  });
  return url;
};

export const trialAction = async (user) => {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .update({
      trial_start: new Date().toISOString(), // Current time in ISO format
      trial_ends_at: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // 7 days from now
      is_subscribed: true, // Set to true to indicate trial subscription
      subscription_status: "trialing", // Set status to trialing
      subscription_end: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // Set end date to 7 days from now
    })
    .eq("id", user.id)
    .select() // Return the updated record
    .single();

  if (!error) {
  }

  return { data, error };
};
