"use server";

import { createAdminClient } from "@/lib/supabase/admin/server";
import { pricingPlans } from "@/lib/constants";

export const getSubscriptionMetrics = async () => {
  try {
    const supabase = await createAdminClient();

    // Fetch all profiles with any subscription activity
    const { data: users, error } = await supabase
      .from("profiles")
      .select(
        "id, email, subscription_plan, subscription_status, subscription_end, trial_start, trial_ends_at, is_subscribed",
      )
      .or("is_subscribed.eq.true,subscription_status.neq.null");

    if (error) {
      console.error("Error fetching subscription metrics:", error);
      return null;
    }

    // Initialize counters
    let metrics = {
      mrr: 0,
      activeSubscribers: 0,
      trialingUsers: 0,
      churnedUsers: 0,
      planDistribution: {
        silver: 0,
        gold: 0,
        platinum: 0,
        other: 0,
      },
      trialConversion: 0, // To be calculated
    };

    const now = new Date();

    users.forEach((user) => {
      const planName = user.subscription_plan?.toLowerCase();
      const status = user.subscription_status;

      // MRR Calculation (Only for active, paid users)
      if (user.is_subscribed && status === "active" && planName !== "trial") {
        metrics.activeSubscribers++;

        // Find price. We don't have the interval stored in profile (monthly vs yearly),
        // effectively we'd need to look at stripe subscription object or heuristics.
        // For this MVP, we will assume MONTHLY for MRR calculation unless we can fetch it better.
        // Or better yet, let's look up the plan in constants.
        const planDetails = pricingPlans.find(
          (p) => p.name.toLowerCase() === planName,
        );

        if (planDetails) {
          // Default to monthly price for MRR
          metrics.mrr += planDetails.price[0];

          // Increment distribution
          if (metrics.planDistribution[planName] !== undefined) {
            metrics.planDistribution[planName]++;
          } else {
            metrics.planDistribution.other++;
          }
        }
      } else if (status === "trialing" || planName === "trial") {
        metrics.trialingUsers++;
      } else if (status === "canceled" || status === "unpaid") {
        metrics.churnedUsers++;
      }
    });

    // Simple Trail Conversion Rate: Active / (Active + Churned from Trial) - hard to know exactly who churned from trial vs churned from active without more history.
    // Let's just return the raw counts for now.

    return metrics;
  } catch (error) {
    console.error("getSubscriptionMetrics unexpected error:", error);
    return null;
  }
};
