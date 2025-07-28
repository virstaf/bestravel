"use server";

import { stripe } from "@/lib/stripe"; // Your configured Stripe instance
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { resendEmail } from "./resendEmail";

export const upgradePlanAction = async (user, priceId, customerId) => {
  console.log("upgradING:::");
  // const
  const { url } = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: {
        userId: user?.id,
        // email: user?.email,
      },
    },
    // customer_email: user?.email,
    success_url: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASEURL}`,
    allow_promotion_codes: true,
  });
  return url;
};

export const subscribeAction = async (user, priceId) => {
  console.log("subscribe parameters:::", user?.id, priceId);
  const isExistingCustomer = await stripe.customers.list({
    email: user?.email,
    limit: 1,
  });
  if (isExistingCustomer.data.length > 0) {
    console.log("Existing customer found:", isExistingCustomer.data[0].id);
    let customerId = isExistingCustomer.data[0].id;
    return upgradePlanAction(user, priceId, customerId);
  }
  const is_silver =
    priceId === "price_1RfmqFLAxh7V2BxLt2hMnLTc" ||
    priceId === "price_1Ri3nrLAxh7V2BxLaSLg2HDF"; // Example price ID for silver plan

  const { url } = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      ...(is_silver && { trial_period_days: 7 }), // Set a trial period of 7 days for silver plan
      metadata: {
        userId: user?.id,
        email: user?.email,
      },
    },
    payment_method_collection: "if_required",
    customer_email: user?.email,
    success_url: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASEURL}`,
    allow_promotion_codes: true,
  });
  return url;
};

export const trialAction = async (user) => {
  const hasTrial = user?.trial_start;
  if (hasTrial) {
    return { error: "You have already started a trial." };
  }
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
    const sendNotification = await resendEmail(
      {
        email: user.email,
        fullname: user.user_metadata?.full_name || user.email.split("@")[0],
        trialEndsAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      "confirm-trial"
    );
    if (!sendNotification.success) {
      console.error(
        "Error sending trial confirmation email:",
        sendNotification.message
      );
    }
  }

  return { data, error };
};

export async function createPortalSessionAction(customerId) {
  if (!customerId) throw new Error("Missing customer ID");
  // console.log("Creating portal session for customer:", customerId);

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard/settings`,
    });

    if (session.url) {
      // redirect(session.url); // Redirect to the portal session URL
      return session.url;
    }
  } catch (error) {
    console.error("Portal session error:", error);
    throw new Error("Could not create billing portal session");
  }
}

export const upgradeSubscription = async (user, priceId) => {
  if (!user) {
    throw new Error("User not authenticated");
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        subscription_plan: priceId,
        is_subscribed: true,
        subscription_status: "active",
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update subscription: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Upgrade subscription error:", error);
    throw new Error("Could not upgrade subscription");
  }
};
