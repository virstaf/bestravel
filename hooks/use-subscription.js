import { getUserSubscription } from "@/actions/subscription";
import { getUser } from "@/lib/supabase/server";
import { useState, useEffect } from "react";

export const useSubscription = () => {
  const [plan, setPlan] = useState({ plan: null, badge: null, icon: null });

  useEffect(() => {
    const fetchSubscriptionPlan = async () => {
      const user = await getUser();
      const userId = user?.id; // Replace with actual user ID logic
      const subscriptionPlan = await getUserSubscription(userId);

      switch (subscriptionPlan) {
        case "inactive":
          setPlan({ plan: "inactive", badge: "‼️", icon: "🚫" });
          break;
        case "trial":
          setPlan({ plan: "trial", badge: "Free", icon: "🆓" });
          break;
        case "silver":
          setPlan({ plan: "silver", badge: "Silver", icon: "🥈" });
          break;
        case "gold":
          setPlan({ plan: "gold", badge: "Gold", icon: "🥇" });
          break;
        case "platinum":
          setPlan({ plan: "platinum", badge: "Platinum", icon: "💎" });
          break;
        default:
          setPlan({ plan: "inactive", badge: "‼️", icon: "🚫" });
      }
    };

    fetchSubscriptionPlan();
  }, []);

  return plan;
};
