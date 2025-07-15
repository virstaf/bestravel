"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { trialAction } from "@/actions/stripe";
import { getUser } from "@/lib/supabase/server";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProfileContext } from "@/contexts/profile";

const TrialCTA = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { profile, isLoading } = useProfileContext();

  const handleStartTrialClick = async () => {
    if (isLoading) return;
    if (profile.is_subscribed) {
      toast.error("You are already subscribed.");
      return;
    }

    startTransition(async () => {
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
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center text-white my-12">
      <h2 className="text-3xl font-bold mb-4">Want to try it out?</h2>
      <div className="text-lg text-primary mb-4">
        <Button
          variant="outline"
          className="cursor-pointer mt-5 hover:scale-105 transition-transform"
          onClick={handleStartTrialClick}
          disabled={isPending}
        >
          {isPending ? "Starting Trial..." : "Start Free 7-Day Trial"}
        </Button>
      </div>
    </div>
  );
};

export default TrialCTA;
