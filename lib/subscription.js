import { stripe } from "./stripe";
import { createClient } from "@supabase/supabase-js";
import { findPlanByPriceId, pricingPlans } from "./constants";
import { sendEmail } from "./email";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

// --- Backend Processing (Webhooks) ---

export const handleCustomerCreated = async (session) => {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("email", session.email)
    .single();

  if (!profile) {
    console.error("Profile not found for email:", session.email);
    return { success: false, error: "Profile not found" };
  }

  const customer = await stripe.customers.update(
    profile.stripe_customer_id || session.id,
    {
      name: profile.full_name,
      metadata: { userId: profile.id },
    },
  );

  await supabaseAdmin
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", profile.id);

  return { success: true };
};

export const handleSubscriptionCreated = async (session) => {
  const customerId = session?.customer || session?.customer_details?.id;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId =
    session.lines?.data[0]?.pricing?.price_details.price ||
    session.lines?.data[0]?.price?.id;
  const userId = customer?.metadata?.userId || session?.metadata?.userId;
  const userEmail = customer?.email || session?.customer_email;
  const period = session.lines?.data[0]?.period;

  const plan = priceId ? findPlanByPriceId(priceId) : "membership";
  const isTrial = session?.amount_due === 0 || session.status === "trialing";

  if (userId) {
    await supabaseAdmin
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
        subscription_plan_id: session.id,
        subscription_end: new Date(period.end * 1000).toISOString(),
      })
      .eq("id", userId);

    await supabaseAdmin.from("subscriptions").upsert(
      {
        id: session.id,
        user_id: userId,
        plan,
        user_email: userEmail,
        status: isTrial ? "trialing" : "active",
        current_period_start: new Date(period.start * 1000).toISOString(),
        current_period_end: new Date(period.end * 1000).toISOString(),
      },
      { onConflict: "user_id" },
    );

    await sendEmail(
      {
        email: userEmail,
        fullname: customer.name || userEmail.split("@")[0],
        plan: isTrial ? "trial" : plan,
        trialEndsAt: isTrial ? new Date(period.end * 1000).toISOString() : null,
      },
      isTrial ? "confirm-trial" : "confirm-subscription",
    );
  }
};

export const handleSubscriptionUpdated = async (session) => {
  const customerId = session.customer;
  const customer = await stripe.customers.retrieve(customerId);
  const userId = customer.metadata?.userId;
  const priceId = session.items?.data[0]?.price?.id;
  const plan = priceId ? findPlanByPriceId(priceId) : "membership";

  if (userId) {
    await supabaseAdmin
      .from("profiles")
      .update({
        subscription_plan: plan,
        subscription_status: session.status,
        subscription_end: new Date(
          session.current_period_end * 1000,
        ).toISOString(),
        subscription_plan_id: session.id,
      })
      .eq("id", userId);

    await supabaseAdmin
      .from("subscriptions")
      .update({
        plan: plan,
        status: session.status,
        current_period_start: new Date(
          session.current_period_start * 1000,
        ).toISOString(),
        current_period_end: new Date(
          session.current_period_end * 1000,
        ).toISOString(),
      })
      .eq("user_id", userId);

    await sendEmail(
      {
        email: customer.email,
        fullname: customer.name || customer.email.split("@")[0],
        plan: plan,
        link: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard/settings`,
      },
      "confirm-subscription",
    );
  }
};

export const handleSubscriptionDeleted = async (session) => {
  const customerId = session.customer;
  const customer = await stripe.customers.retrieve(customerId);
  const userId = customer.metadata?.userId;

  if (userId) {
    await supabaseAdmin
      .from("profiles")
      .update({
        is_subscribed: false,
        subscription_status: "canceled",
        subscription_plan: null,
      })
      .eq("id", userId);

    await supabaseAdmin.from("subscriptions").delete().eq("id", session.id);

    await sendEmail(
      {
        email: customer.email,
        fullname: customer.name || customer.email.split("@")[0],
        plan: customer.metadata?.planName || "membership",
        link: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard/settings`,
      },
      "subscription-canceled",
    );
  }
};

export const handleTrialWillEnd = async (session) => {
  const customer = await stripe.customers.retrieve(session.customer);
  if (customer?.email) {
    await sendEmail(
      {
        email: customer.email,
        fullname: customer.name || customer.email.split("@")[0],
        trialEndsAt: new Date(session.trial_end * 1000).toISOString(),
        link: `${process.env.NEXT_PUBLIC_BASEURL}/pricing`,
      },
      "trial-ending-reminder",
    );
  }
};

export const handlePaymentFailed = async (session) => {
  const customer = await stripe.customers.retrieve(session.customer);
  if (customer?.email) {
    const priceId = session.lines?.data[0]?.price?.id;
    const plan = priceId ? findPlanByPriceId(priceId) : "membership";

    await sendEmail(
      {
        email: customer.email,
        fullname: customer.name || customer.email.split("@")[0],
        plan: plan,
        link: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard/settings`,
      },
      "payment-failed",
    );
  }
};

// --- Client-facing Creators (API Route use) ---

export const createCheckoutSession = async ({ userId, email, priceId }) => {
  const silverPlan = pricingPlans.find((p) => p.name === "silver");
  const is_silver = silverPlan?.priceId.includes(priceId);

  // Check for existing customer to avoid duplicates
  const existingCustomers = await stripe.customers.list({ email, limit: 1 });
  const customerId =
    existingCustomers.data.length > 0 ? existingCustomers.data[0].id : null;

  const { url } = await stripe.checkout.sessions.create({
    mode: "subscription",
    ...(customerId ? { customer: customerId } : { customer_email: email }),
    payment_method_types: ["card", "klarna", "revolut_pay", "link"],
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      ...(is_silver && { trial_period_days: 7 }),
      metadata: { userId, email },
    },
    payment_method_collection: "always",
    success_url: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASEURL}/pricing`,
    allow_promotion_codes: true,
  });

  return url;
};

export const createPortalSession = async (customerId) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard/settings`,
  });
  return session.url;
};

export const activateTrialManual = async (user) => {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .update({
      trial_start: new Date().toISOString(),
      trial_ends_at: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      is_subscribed: true,
      subscription_status: "trialing",
      subscription_plan: "trial",
      subscription_end: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    })
    .eq("id", user.id)
    .select()
    .single();

  if (!error) {
    await sendEmail(
      {
        email: user.email,
        fullname: user.user_metadata?.full_name || user.email.split("@")[0],
        trialEndsAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
      "confirm-trial",
    );
  }

  return { data, error };
};
