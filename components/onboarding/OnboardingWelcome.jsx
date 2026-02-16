"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OnboardingWelcome() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/onboarding/preferences");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Logo */}
      <div className="mb-12">
        <Link href="/">
          <Image
            src="/virstravel.png"
            alt="Virstravel"
            width={200}
            height={77}
            className="h-auto w-48 object-contain"
            priority
          />
        </Link>
      </div>

      {/* Welcome Message */}
      <div className="mb-12 space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          Welcome to Virstravel 👋
        </h1>
        <p className="text-lg text-muted-foreground">
          Let's personalize your experience
        </p>
      </div>

      {/* CTA Button */}
      <Button
        onClick={handleGetStarted}
        size="lg"
        className="mb-8 w-full py-6 text-white min-w-[200px] text-base"
      >
        Get Started
      </Button>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="text-lg">🔒</span>
          <span>Secure • Cancel Anytime</span>
        </p>
      </div>
    </div>
  );
}
