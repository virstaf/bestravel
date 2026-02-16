import Link from "next/link";
import { Button } from "./ui/button";
import { AlertCircle, Calendar, Crown, Zap } from "lucide-react";

const SubscriptionPrompt = ({ profile }) => {
  if (!profile) return null;

  const {
    subscription_status,
    subscription_plan,
    trial_ends_at,
    is_subscribed,
  } = profile;

  // 1. Trialing state
  if (subscription_status === "trialing" || subscription_plan === "trial") {
    const endsAt = new Date(trial_ends_at);
    const now = new Date();
    const diffDays = Math.ceil((endsAt - now) / (1000 * 60 * 60 * 24));

    if (diffDays <= 3 && diffDays >= 0) {
      return (
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-6 shadow-lg text-white mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Zap className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Trial Ending Soon!</h3>
              <p className="opacity-90">
                Your free trial ends in{" "}
                <strong>
                  {diffDays} {diffDays === 1 ? "day" : "days"}
                </strong>
                . Upgrade now to keep your exclusive travel perks!
              </p>
            </div>
          </div>
          <Button
            asChild
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-6 rounded-xl shadow-md border-none whitespace-nowrap"
          >
            <Link href="/pricing">Select a Plan</Link>
          </Button>
        </div>
      );
    }

    // Default trial message
    return (
      <div className="bg-white border-2 border-primary/20 rounded-2xl p-6 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              You're on a Free Trial
            </h3>
            <p className="text-gray-600">
              Enjoying the VIP travel hacks? Your trial ends on{" "}
              {endsAt.toLocaleDateString()}.
            </p>
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          className="border-primary text-primary hover:bg-primary/5"
        >
          <Link href="/pricing">View All Plans</Link>
        </Button>
      </div>
    );
  }

  // 2. Expired state
  if (
    subscription_status === "expired" ||
    (is_subscribed === false && subscription_plan === null && trial_ends_at)
  ) {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-gray-600">
          <AlertCircle className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-bold">Your Membership has Paused</h3>
            <p>
              Re-activate your subscription to maintain access to exclusive
              hotel rates and eSim data.
            </p>
          </div>
        </div>
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-white font-bold px-8"
        >
          <Link href="/pricing">Renew Subscription</Link>
        </Button>
      </div>
    );
  }

  // 3. Not subscribed at all (and never was)
  if (!is_subscribed && !trial_ends_at) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Crown className="w-8 h-8 text-primary" />
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Travel Like a VIP
            </h3>
            <p className="text-gray-600 font-medium">
              Join Virstravel Club and save up to 50% on luxury stays worldwide.
            </p>
          </div>
        </div>
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-white font-bold"
        >
          <Link href="/pricing">Start Free Trial</Link>
        </Button>
      </div>
    );
  }

  return null;
};

export default SubscriptionPrompt;
