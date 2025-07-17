"use client";

import { useEffect, useState, useTransition } from "react";
import { getUser } from "@/lib/supabase/server";
import { pricingPlans } from "@/lib/constants";
import { subscribeAction, trialAction } from "@/actions/stripe";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getUserSubscription } from "@/actions/subscription";
import { Button } from "./ui/button";
import { useProfileContext } from "@/contexts/profile";

const UpgradeSubscription = () => {
  const [duration, setDuration] = useState("monthly");
  const [user, setUser] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [plan, setPlan] = useState(null);
  const { profile, isLoading } = useProfileContext();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserSubscription();
      setPlan(data.plan);
      const user = await getUser();
      if (user) {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  const handleSubscribeClick = async (priceId) => {
    if (!user) {
      toast.error("You must be logged in to subscribe.");
      return;
    }
    startTransition(async () => {
      const url = await subscribeAction(user, priceId);
      if (url) {
        router.push(url);
      } else {
        toast.error("Subscription failed. Please try again.");
        console.error("Subscription failed");
      }
    });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 rounded-lg">
        <div className="w-[200px] mx-auto my-8">
          <div className="plan">{plan}</div>
          <div className="duration-toggle bg-gray-200 border border-gray-300 rounded-md p-0.5 ">
            <Button
              className="font-medium w-1/2"
              variant={duration === "monthly" ? "" : "primary"}
              onClick={() => setDuration("monthly")}
            >
              Monthly
            </Button>
            <Button
              className="font-medium w-1/2"
              variant={duration === "yearly" ? "" : "primary"}
              onClick={() => setDuration("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-3 items-start justify-center py-8 p-4">
          {pricingPlans.map((plan, index) => (
            <div key={index} className=" p-6 w-full max-w-sm">
              <h2 className="text-xl font-semibold mb-6">{plan.name}</h2>
              <div className="flex gap-1 items-center h-full mb-6">
                <p className="text-3xl font-bold">
                  <span className="font-bold">£</span>
                  {duration === "monthly" ? plan.price[0] : plan.price[1]}
                </p>
                <span className="text-gray-500 font-light leading-4">
                  per <br />
                  {duration === "monthly" ? "month" : "year"}
                </span>
              </div>
              <Button
                className={`my-4 py-5 w-full text-white text-[16px] ${
                  isPending ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
                onClick={() =>
                  handleSubscribeClick(
                    duration === "monthly" ? plan.priceId[0] : plan.priceId[1]
                  )
                }
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Upgrade"}
              </Button>
              <ul className="pl-5 text-[14px] text-gray-600">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="py-1.5 flex items-center gap-0.5"
                  >
                    <span className="text-white text-[10px] mr-2 bg-gray-400 rounded-full w-1.5 h-1.5 p-2 flex items-center justify-center">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpgradeSubscription;
