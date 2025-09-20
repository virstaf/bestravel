import { useProfileContext } from "@/contexts/profile";
import determineSubscriptionPlan from "@/utils/determineSubscription";

const SubscriptionStatus = () => {
  const { profile, isLoading } = useProfileContext();
  const { plan, icon } = determineSubscriptionPlan(profile?.subscription_plan);
  const expiry = profile?.subscription_end;

  const formattedExpiry = expiry
    ? new Date(expiry).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <>
      <div className="">
        {!isLoading && profile ? (
          <>
            <p className="text-sm text-gray-500">
              You're on the{" "}
              <span className="text-primary font-bold">
                {icon}
                {plan}
              </span>{" "}
              plan
            </p>
            <p className="text-sm text-gray-500">
              Your subscription expires on{" "}
              <span className="text-primary font-bold">{formattedExpiry}</span>
            </p>
          </>
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}
      </div>
    </>
  );
};

export default SubscriptionStatus;
