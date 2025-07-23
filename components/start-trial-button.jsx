"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { useProfileContext } from "@/contexts/profile";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { trialAction } from "@/actions/stripe";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const StartTrialButton = ({ className, variant }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { profile } = useProfileContext();

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
    <div>
      {!profile.email ? (
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
      ) : (
        <Button
          onClick={handleStartTrial}
          disabled={isPending}
          className="text-white text-md px-12 py-6 my-4 hover:scale-105 transition-transform"
        >
          Start 7-Day Trial
        </Button>
      )}
    </div>
  );
};

export default StartTrialButton;
