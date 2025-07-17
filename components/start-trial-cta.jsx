"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { useProfileContext } from "@/contexts/profile";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { trialAction } from "@/actions/stripe";
import { useRouter } from "next/navigation";

const StartTrialCta = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { profile, isLoading } = useProfileContext();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  const handleStartTrial = async () => {
    if (isPending) return; // Prevent multiple clicks
    startTransition(async () => {
      if (profile.is_subscribed) {
        toast.error("You are already subscribed.");
        return;
      }
      const { data, error } = await trialAction(profile);
      if (error) {
        toast.error("Trial start failed. Please try again.");
        console.error("Trial start error:", error);
        return;
      }
      if (data) {
        console.log("Trial started successfully:", data);
        router.push("dashboard");
      } else {
        toast.error("Trial start failed. Please try again.");
        console.error("Trial start failed");
      }
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 text-center bg-gradient-to-r from-green-400 to-blue-300 text-white py-16 px-8 shadow-lg">
        <h2 className="text-primary font-semibold text-3xl">
          Ready to upgrade the way you Travel?
        </h2>
        <Button
          onClick={handleStartTrial}
          disabled={isPending}
          className="text-white text-md px-12 py-6 my-4 hover:scale-105 transition-transform"
        >
          Start 7-Day Trial
        </Button>
        <p className="text-gray-600 text-sm">
          Start with a 7-Day Free Trial. No commitments. Cancel anytime. Travel
          better from your very first trip.
        </p>
      </div>
    </>
  );
};

export default StartTrialCta;
