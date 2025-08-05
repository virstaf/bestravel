"use server";

import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { findPlanByPriceId, pricingPlans } from "@/lib/constants";
import { resendEmail } from "../resendEmail";
// import Stripe from "stripe";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // must be service role for admin updates
);

export const createCustomerAction = async (session) => {
  // console.log("Creating customer action with session:", session);

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("email", session.email)
    .single();

  if (!profile) {
    console.error("Profile not found");
    return { success: false, errorMessage: "Profile not found" };
  }

  let customer;

  if (profile.stripe_customer_id) {
    console.log(
      "Customer already exists, updating:",
      profile.stripe_customer_id
    );
    // update the customer in Stripe
    customer = await stripe.customers.update(profile.stripe_customer_id, {
      name: profile.full_name,
      metadata: {
        userId: profile.id,
      },
    });
  } else {
    customer = await stripe.customers.update(session.id, {
      name: profile.full_name,
      metadata: {
        userId: profile.id,
      },
    });
  }

  console.log("Customer::", customer);

  // Update the profile with the Stripe customer ID
  await supabaseAdmin
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", profile.id);

  return { success: true, errorMessage: null };
};

export const createSubscriptionAction = async (session) => {
  const customerId = session?.customer || session?.customer_details?.id;
  const customer = await stripe.customers.retrieve(customerId);
  const description = session.lines?.data[0]?.description;
  const priceId = session.lines?.data[0]?.pricing?.price_details.price;
  const userEmail = customer?.email || session?.customer_email;
  const userId = customer?.metadata?.userId || session?.metadata?.userId;
  const period = session.lines?.data[0]?.period;

  // console.log("customerId:::", customerId);
  // console.log("priceId:::", priceId);
  // console.log("userEmail:::", userEmail);
  // console.log("userId:::", userId);

  let plan;
  if (priceId) {
    plan = findPlanByPriceId(priceId);
  }

  const isTrial = session?.amount_due === 0;

  if (userId && plan) {
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        is_subscribed: true,
        stripe_customer_id: customerId,
        subscription_status: isTrial ? "trialing" : "active",
        subscription_plan: isTrial ? "trial" : plan,
        ...(isTrial && {
          trial_start: new Date(period.start * 1000).toISOString(),
          trial_ends_at: new Date(period.end * 1000).toISOString(),
        }),
        subscription_plan_id:
          session.parent?.subscription_details?.subscription,
        subscription_end: new Date(period.end * 1000),
      })
      .eq("email", session.customer_email);

    if (profileError) {
      console.error("Error updating profile:", profileError);
    }

    const { error: subError } = await supabaseAdmin
      .from("subscriptions")
      .upsert(
        {
          id: session.id,
          user_id: userId,
          plan,
          user_email: userEmail,
          status: isTrial ? "trialing" : "active",
          description,
          current_period_start: new Date(period.start * 1000),
          current_period_end: new Date(period.end * 1000),
        },
        {
          onConflict: "user_id",
        }
      );
    if (subError) {
      console.error("Error updating subscription:", subError);
    }
  }

  if (period.end && plan) {
    const sendNotification = await resendEmail(
      {
        email: userEmail,
        fullname: customer.name,
        plan: isTrial ? "trial" : plan,
        trialEndsAt: isTrial ? new Date(period.end * 1000).toISOString() : null,
      },
      isTrial ? "confirm-trial" : "confirm-subscription"
    );
    console.log("sendNotification:::", sendNotification);
  }
};

// Update the old subscriptions
export const updateSubscriptionAction = async (session) => {
  console.log("Updating subscription:", session);

  // find the user by stripe_customer_id
  const customer = stripe.customers.retrieve(session.customer);
  console.log("Customer details:", customer);

  // update the subscription details
  //update profiles table with new subscription details

  return { success: true, errorMessage: null };
};

//handle subscription cancellation
export const deleteSubscriptionAction = async (session) => {
  console.log("Deleting subscription");
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .update({
      is_subscribed: false,
      subscription_status: "canceled",
      subscription_plan: null,
      // trial_start: null,
      // trial_end: null,
    })
    .eq("stripe_customer_id", session.customer);

  const { error: subError } = await supabaseAdmin
    .from("subscriptions")
    .delete()
    .eq("id", session.id);

  if (subError) {
    console.error("Error deleting subscription:", subError);
  }
  if (profileError) {
    console.error("Error updating profile:", profileError);
  }
  return { success: true, errorMessage: null };
};

export const trialWillEndAction = async (session) => {
  // const isTrial = session?.amount_due === 0;
  console.log("Trial will end:", session);
  return { success: true, errorMessage: null };
};
