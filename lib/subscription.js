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
  try {
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("email", session.email)
      .single();

    if (profileError || !profile) {
      console.error(
        `[Subscription:CreateCustomer] Profile not found for email: ${session.email}`,
        profileError,
      );
      // We don't throw here to avoid retrying indefinitely if the user doesn't exist yet
      return { success: false, error: "Profile not found" };
    }

    const customer = await stripe.customers.update(
      profile.stripe_customer_id || session.id,
      {
        name: profile.full_name,
        metadata: { userId: profile.id },
      },
    );

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ stripe_customer_id: customer.id })
      .eq("id", profile.id);

    if (updateError) {
      console.error(
        `[Subscription:CreateCustomer] Failed to update profile with Stripe ID: ${profile.id}`,
        updateError,
      );
      throw new Error("Failed to update profile with Stripe ID");
    }

    console.log(
      `[Subscription:CreateCustomer] Successfully linked customer ${customer.id} to user ${profile.id}`,
    );
    return { success: true };
  } catch (error) {
    console.error(
      `[Subscription:CreateCustomer] Unexpected error for email ${session.email}:`,
      error,
    );
    throw error; // Re-throw to let webhook handler return 500
  }
};

export const handleSubscriptionCreated = async (session) => {
  try {
    const customerId = session?.customer || session?.customer_details?.id;
    const customer = await stripe.customers.retrieve(customerId);
    const priceId =
      session.lines?.data[0]?.pricing?.price_details.price ||
      session.lines?.data[0]?.price?.id;
    const userId = customer?.metadata?.userId || session?.metadata?.userId;
    const userEmail = customer?.email || session?.customer_email;
    const period = session.lines?.data[0]?.period;

    if (!userId) {
      console.error(
        `[Subscription:Created] Missing userId in metadata for session ${session.id}`,
      );
      return { success: false, error: "Missing userId" };
    }

    const plan = priceId ? findPlanByPriceId(priceId) : "membership";
    const isTrial = session?.amount_due === 0 || session.status === "trialing";

    console.log(
      `[Subscription:Created] Processing subscription for user ${userId} (Plan: ${plan}, Status: ${session.status})`,
    );

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
        subscription_plan_id: session.id,
        subscription_end: new Date(period.end * 1000).toISOString(),
      })
      .eq("id", userId);

    if (profileError) {
      console.error(
        `[Subscription:Created] Failed to update profile for user ${userId}`,
        profileError,
      );
      throw new Error("Database update failed (Profile)");
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
          current_period_start: new Date(period.start * 1000).toISOString(),
          current_period_end: new Date(period.end * 1000).toISOString(),
        },
        { onConflict: "user_id" },
      );

    if (subError) {
      console.error(
        `[Subscription:Created] Failed to upsert subscription record for user ${userId}`,
        subError,
      );
      // We log but don't strictly throw if profile update succeeded, though it reflects inconsistency
    }

    await sendEmail(
      {
        email: userEmail,
        fullname: customer.name || userEmail.split("@")[0],
        plan: isTrial ? "trial" : plan,
        trialEndsAt: isTrial ? new Date(period.end * 1000).toISOString() : null,
      },
      isTrial ? "confirm-trial" : "confirm-subscription",
    );

    console.log(
      `[Subscription:Created] Successfully processed for user ${userId}`,
    );
    return { success: true };
  } catch (error) {
    console.error(
      `[Subscription:Created] Unexpected error for session ${session.id}:`,
      error,
    );
    throw error;
  }
};

export const handleSubscriptionUpdated = async (session) => {
  try {
    const customerId = session.customer;
    const customer = await stripe.customers.retrieve(customerId);
    const userId = customer.metadata?.userId;
    const priceId = session.items?.data[0]?.price?.id;
    const plan = priceId ? findPlanByPriceId(priceId) : "membership";

    if (!userId) {
      console.warn(
        `[Subscription:Updated] No userId found in metadata for customer ${customerId}`,
      );
      return { success: false, error: "Missing userId" };
    }

    console.log(
      `[Subscription:Updated] Updating subscription for user ${userId} to plan ${plan}`,
    );

    const { error: profileError } = await supabaseAdmin
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

    if (profileError) {
      console.error(
        `[Subscription:Updated] Failed to update profile for user ${userId}`,
        profileError,
      );
      throw new Error("Database update failed (Profile)");
    }

    const { error: subError } = await supabaseAdmin
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

    if (subError) {
      console.error(
        `[Subscription:Updated] Failed to update subscription record for user ${userId}`,
        subError,
      );
    }

    await sendEmail(
      {
        email: customer.email,
        fullname: customer.name || customer.email.split("@")[0],
        plan: plan,
        link: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard/settings`,
      },
      "confirm-subscription",
    );

    return { success: true };
  } catch (error) {
    console.error(
      `[Subscription:Updated] Unexpected error for session ${session.id}:`,
      error,
    );
    throw error;
  }
};

export const handleSubscriptionDeleted = async (session) => {
  try {
    const customerId = session.customer;
    const customer = await stripe.customers.retrieve(customerId);
    const userId = customer.metadata?.userId;

    if (!userId) {
      console.warn(
        `[Subscription:Deleted] No userId found in metadata for customer ${customerId}`,
      );
      return { success: false, error: "Missing userId" };
    }

    console.log(
      `[Subscription:Deleted] Processing cancellation for user ${userId}`,
    );

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        is_subscribed: false,
        subscription_status: "canceled",
        subscription_plan: null,
      })
      .eq("id", userId);

    if (profileError) {
      console.error(
        `[Subscription:Deleted] Failed to update profile for user ${userId}`,
        profileError,
      );
      throw new Error("Database update failed (Profile)");
    }

    const { error: deleteError } = await supabaseAdmin
      .from("subscriptions")
      .delete()
      .eq("id", session.id);

    if (deleteError) {
      console.error(
        `[Subscription:Deleted] Failed to delete subscription record ${session.id}`,
        deleteError,
      );
    }

    await sendEmail(
      {
        email: customer.email,
        fullname: customer.name || customer.email.split("@")[0],
        plan: customer.metadata?.planName || "membership",
        link: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard/settings`,
      },
      "subscription-canceled",
    );

    return { success: true };
  } catch (error) {
    console.error(
      `[Subscription:Deleted] Unexpected error for session ${session.id}:`,
      error,
    );
    throw error;
  }
};

export const handleTrialWillEnd = async (session) => {
  try {
    const customer = await stripe.customers.retrieve(session.customer);
    if (!customer?.email) {
      console.warn(
        `[Subscription:TrialEnd] No email found for customer ${session.customer}`,
      );
      return;
    }

    console.log(
      `[Subscription:TrialEnd] Sending reminder to ${customer.email}`,
    );

    await sendEmail(
      {
        email: customer.email,
        fullname: customer.name || customer.email.split("@")[0],
        trialEndsAt: new Date(session.trial_end * 1000).toISOString(),
        link: `${process.env.NEXT_PUBLIC_BASEURL}/pricing`,
      },
      "trial-ending-reminder",
    );
  } catch (error) {
    console.error(
      `[Subscription:TrialEnd] Error processing session ${session.id}:`,
      error,
    );
  }
};

export const handlePaymentFailed = async (session) => {
  try {
    const customer = await stripe.customers.retrieve(session.customer);
    if (!customer?.email) {
      console.warn(
        `[Subscription:PaymentFailed] No email found for customer ${session.customer}`,
      );
      return;
    }

    console.log(
      `[Subscription:PaymentFailed] Sending notification to ${customer.email}`,
    );

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
  } catch (error) {
    console.error(
      `[Subscription:PaymentFailed] Error processing session ${session.id}:`,
      error,
    );
  }
};

// --- Client-facing Creators (API Route use) ---

export const createCheckoutSession = async ({ userId, email, priceId }) => {
  try {
    if (!userId || !email || !priceId) {
      throw new Error("Missing required parameters: userId, email, or priceId");
    }

    const silverPlan = pricingPlans.find((p) => p.name === "silver");
    const is_silver = silverPlan?.priceId.includes(priceId);

    // Check for existing customer to avoid duplicates
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    const customerId =
      existingCustomers.data.length > 0 ? existingCustomers.data[0].id : null;

    console.log(
      `[Subscription:Checkout] Creating session for ${email} (Plan: ${priceId})`,
    );

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
  } catch (error) {
    console.error(
      `[Subscription:Checkout] Failed to create session for ${email}:`,
      error,
    );
    throw error;
  }
};

export const createPortalSession = async (customerId) => {
  try {
    if (!customerId) {
      throw new Error("Missing customerId");
    }

    console.log(
      `[Subscription:Portal] Creating portal session for ${customerId}`,
    );

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard/settings`,
    });
    return session.url;
  } catch (error) {
    console.error(
      `[Subscription:Portal] Failed to create session for customer ${customerId}:`,
      error,
    );
    throw error;
  }
};

export const activateTrialManual = async (user) => {
  try {
    if (!user?.id || !user?.email) {
      throw new Error("Invalid user object provided");
    }

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

    if (error) {
      console.error(
        `[Subscription:TrialManual] Database update failed for user ${user.id}`,
        error,
      );
      return { data: null, error };
    }

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

    console.log(`[Subscription:TrialManual] Activated trial for ${user.email}`);
    return { data, error: null };
  } catch (error) {
    console.error(
      `[Subscription:TrialManual] Unexpected error for user ${user?.id}:`,
      error,
    );
    return { data: null, error };
  }
};
