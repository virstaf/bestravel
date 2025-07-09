"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";

const TrialCTA = () => {
  const [isPending, startTransition] = useTransition();
  const handleStartTrialClick = async () => {
    if (!user) {
      toast.error("You must be logged in to start a trial.");
      return;
    }
    startTransition(async () => {
      const { data, error } = await trialAction(user);
      if (error) {
        toast.error("Trial start failed. Please try again.");
        console.error("Trial start error:", error);
        return;
      }
      if (data) {
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
          Start Free 7-Day Trial
        </Button>
      </div>
    </div>
  );
};

export default TrialCTA;
