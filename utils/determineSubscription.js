export const determineSubscriptionPlan = (
  plan,
  // subscriptionExpiry
) => {
  switch (plan) {
    case "inactive":
      return {
        plan: "inactive",
        badge: "‼️No Plan",
        icon: "🚫",
        // expiry: subscriptionExpiry,
      };
    case "trial":
      return {
        plan: "trial",
        badge: "Free Trial",
        icon: "🆓",
        // expiry: subscriptionExpiry,
      };
    case "silver":
      return {
        plan: "silver",
        badge: "Silver",
        icon: "🥈",
        // expiry: subscriptionExpiry,
      };
    case "gold":
      return {
        plan: "gold",
        badge: "Gold",
        icon: "🥇",
        // expiry: subscriptionExpiry,
      };
    case "platinum":
      return {
        plan: "platinum",
        badge: "Platinum",
        icon: "💎",
        // expiry: subscriptionExpiry,
      };
    default:
      return {
        plan: "inactive",
        badge: "‼️",
        icon: "🚫",
        // expiry: subscriptionExpiry,
      };
  }
};

export default determineSubscriptionPlan;
