import { useProfileContext } from "@/contexts/profile";
import { useState, useEffect } from "react";

export const useSubscription = () => {
  const [plan, setPlan] = useState({ plan: null, badge: null, icon: null });
  const { profile, isLoading } = useProfileContext();

  useEffect(() => {
    const fetchSubscriptionPlan = async () => {
      if (isLoading) {
        return { plan: "loading", badge: "Loading...", icon: "⏳" };
      }
      const subscriptionPlan = profile.subscription_plan || "inactive";
      const subscriptionExpiry = profile.subscription_end;

      switch (subscriptionPlan) {
        case "inactive":
          setPlan({
            plan: "inactive",
            badge: "‼️No Plan",
            icon: "🚫",
            expiry: subscriptionExpiry,
          });
          break;
        case "trial":
          setPlan({
            plan: "trial",
            badge: "Free Trial",
            icon: "🆓",
            expiry: subscriptionExpiry,
          });
          break;
        case "silver":
          setPlan({
            plan: "silver",
            badge: "Silver",
            icon: "🥈",
            expiry: subscriptionExpiry,
          });
          break;
        case "gold":
          setPlan({
            plan: "gold",
            badge: "Gold",
            icon: "🥇",
            expiry: subscriptionExpiry,
          });
          break;
        case "platinum":
          setPlan({
            plan: "platinum",
            badge: "Platinum",
            icon: "💎",
            expiry: subscriptionExpiry,
          });
          break;
        default:
          setPlan({
            plan: "inactive",
            badge: "‼️",
            icon: "🚫",
            expiry: subscriptionExpiry,
          });
      }
    };

    fetchSubscriptionPlan();
  }, []);

  return plan;
};
