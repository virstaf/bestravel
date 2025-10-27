import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { pricingPlans } from "@/lib/constants";
import { getUser } from "@/lib/supabase/server";
import TrialButton from "./trial-button";

const StartTrialButton = async ({ className, variant }) => {
  const user = await getUser();
  if (!user) {
    return (
      <Button
        variant={variant}
        className={`text-white text-md px-12 py-6 my-4 hover:scale-105 transition-transform ${className}`}
      >
        <Link href="/auth/signup" className="flex items-center gap-2">
          <span>
            <ArrowRight />
          </span>
          Get Started
        </Link>
      </Button>
    );
  }

  return (
    <TrialButton
      user={user}
      priceId={pricingPlans[0].priceId[0]}
      text="Start 7-Day Trial"
    />
  );
};

export default StartTrialButton;
