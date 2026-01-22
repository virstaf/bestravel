"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updateOnboardingProfile } from "@/actions/onboarding";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function OnboardingBenefits() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);

    try {
      // Get preferences from sessionStorage
      const stored = sessionStorage.getItem("onboardingPreferences");
      if (!stored) {
        toast.error("Error", {
          description: "Preferences not found. Please start over.",
        });
        router.push("/onboarding/welcome");
        return;
      }

      const preferences = JSON.parse(stored);

      // Update user profile with onboarding data
      const result = await updateOnboardingProfile(preferences);

      if (result.success) {
        // Clear sessionStorage
        sessionStorage.removeItem("onboardingPreferences");

        toast.success("Welcome aboard!", {
          description: "Your profile has been set up successfully.",
        });

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        toast.error("Error", {
          description: result.error || "Failed to save preferences.",
        });
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-muted"></div>
        <span className="ml-2 text-sm text-muted-foreground">80%</span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center space-y-8 rounded-lg bg-white p-12 text-center shadow-sm dark:bg-gray-800">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-5xl dark:bg-yellow-900">
          💡
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Did you know?</h1>
          <p className="text-xl">
            Virstravel members save an average of{" "}
            <span className="font-bold text-primary">$300+</span> on every trip
          </p>
        </div>

        {/* Subtext */}
        <p className="max-w-md text-muted-foreground">
          This includes hotels, flights, lounges & concierge perks
        </p>

        {/* Benefits List */}
        <div className="w-full max-w-md space-y-3 text-left">
          <div className="flex items-start gap-3">
            <span className="text-xl">✨</span>
            <p className="text-sm">
              Exclusive discounts on hotels, flights, and experiences
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🛡️</span>
            <p className="text-sm">Premium airport lounge access worldwide</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🎯</span>
            <p className="text-sm">
              24/7 concierge support for all your travel needs
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleContinue}
          disabled={isLoading}
          className="w-full max-w-md"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up your profile...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
}
