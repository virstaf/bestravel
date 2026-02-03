"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, Plane, Crown } from "lucide-react";

// Sample deals based on wireframe
const SAMPLE_DEALS = [
  {
    id: 1,
    type: "hotel",
    title: "Cape Town • 5 Nights",
    subtitle: "5-star resort hotel",
    originalPrice: 620,
    discountedPrice: 440,
    savings: 180,
    destination: "Cape Town",
  },
  {
    id: 2,
    type: "hotel",
    title: "Dubai • 4 Nights",
    subtitle: "5-star waterfront hotel",
    originalPrice: 880,
    discountedPrice: 660,
    savings: 220,
    destination: "Dubai",
  },
  {
    id: 3,
    type: "flight",
    title: "Accra → London",
    subtitle: "Business class seats",
    originalPrice: 2400,
    discountedPrice: 1850,
    savings: 550,
    destination: "London",
  },
  {
    id: 4,
    type: "perk",
    title: "Airport Lounge Access",
    subtitle: "Premium lounge worldwide",
    isFree: true,
    description: "Exclusive member benefit • Unlimited visits",
    destination: "Global",
  },
];

export default function OnboardingDeals() {
  const router = useRouter();
  const [deals, setDeals] = useState([]);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    // Get preferences from sessionStorage
    const stored = sessionStorage.getItem("onboardingPreferences");
    if (stored) {
      const prefs = JSON.parse(stored);
      setPreferences(prefs);

      // Filter deals based on preferred destinations
      const filteredDeals = SAMPLE_DEALS.filter((deal) => {
        if (deal.type === "perk") return true; // Always show perks
        return prefs.preferredDestinations.some(
          (dest) =>
            deal.destination.toLowerCase().includes(dest.toLowerCase()) ||
            dest.toLowerCase().includes(deal.destination.toLowerCase()),
        );
      });

      // If no matches, show all deals
      setDeals(filteredDeals.length > 0 ? filteredDeals : SAMPLE_DEALS);
    } else {
      setDeals(SAMPLE_DEALS);
    }
  }, []);

  const handleUnlockDeals = () => {
    router.push("/onboarding/benefits");
  };

  const getIcon = (type) => {
    switch (type) {
      case "hotel":
        return <Hotel className="h-5 w-5" />;
      case "flight":
        return <Plane className="h-5 w-5" />;
      case "perk":
        return <Crown className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 py-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-muted"></div>
        <div className="h-2 w-2 rounded-full bg-muted"></div>
        <span className="ml-2 text-sm text-muted-foreground">60%</span>
      </div>

      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">
          Deals picked just for you ✨
        </h1>
        <p className="text-muted-foreground">
          Based on your preferences, here's what we found
        </p>
      </div>

      {/* Deal Cards */}
      <div className="space-y-4">
        {deals.map((deal) => (
          <Card
            key={deal.id}
            className={`overflow-hidden transition-all hover:shadow-md ${
              deal.type === "perk"
                ? "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950"
                : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div
                    className={`rounded-lg p-3 ${
                      deal.type === "perk"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {getIcon(deal.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{deal.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {deal.subtitle}
                    </p>
                    {deal.description && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {deal.description}
                      </p>
                    )}
                    {!deal.isFree && (
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold">
                          ${deal.discountedPrice}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${deal.originalPrice}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge
                  variant={deal.isFree ? "default" : "secondary"}
                  className={
                    deal.isFree
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  }
                >
                  {deal.isFree ? "FREE" : `Save $${deal.savings}`}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Button */}
      <Button onClick={handleUnlockDeals} className="w-full" size="lg">
        Unlock These Deals
      </Button>
    </div>
  );
}
