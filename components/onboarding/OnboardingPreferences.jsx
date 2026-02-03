"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

// Popular destinations
const POPULAR_DESTINATIONS = [
  "Paris",
  "Dubai",
  "Cape Town",
  "London",
  "New York",
  "Tokyo",
  "Barcelona",
  "Bali",
  "Maldives",
  "Santorini",
];

// Countries list (abbreviated for brevity)
const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Ghana",
  "Nigeria",
  "South Africa",
  "Kenya",
  "France",
  "Germany",
  "Spain",
  "Italy",
  "Australia",
  "New Zealand",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "Argentina",
  "UAE",
];

export default function OnboardingPreferences() {
  const router = useRouter();
  const [homeCountry, setHomeCountry] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [customDestination, setCustomDestination] = useState("");
  const [travelFrequency, setTravelFrequency] = useState("3-5 trips/year");

  const handleAddDestination = (destination) => {
    if (selectedDestinations.length >= 5) {
      return; // Max 5 destinations
    }
    if (!selectedDestinations.includes(destination)) {
      setSelectedDestinations([...selectedDestinations, destination]);
    }
  };

  const handleRemoveDestination = (destination) => {
    setSelectedDestinations(
      selectedDestinations.filter((d) => d !== destination),
    );
  };

  const handleAddCustomDestination = () => {
    if (customDestination.trim() && selectedDestinations.length < 5) {
      handleAddDestination(customDestination.trim());
      setCustomDestination("");
    }
  };

  const handleContinue = () => {
    // Store preferences in sessionStorage to pass to next step
    sessionStorage.setItem(
      "onboardingPreferences",
      JSON.stringify({
        homeCountry,
        preferredDestinations: selectedDestinations,
        travelFrequency,
      }),
    );
    router.push("/onboarding/deals");
  };

  return (
    <div className="space-y-8 py-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-muted"></div>
        <div className="h-2 w-2 rounded-full bg-muted"></div>
        <div className="h-2 w-2 rounded-full bg-muted"></div>
        <span className="ml-2 text-sm text-muted-foreground">33%</span>
      </div>

      {/* Form Content */}
      <div className="space-y-8 rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
        {/* Question 1: Home Country */}
        <div className="space-y-3">
          <Label htmlFor="home-country" className="text-base font-medium">
            Where are you based?
          </Label>
          <Select value={homeCountry} onValueChange={setHomeCountry}>
            <SelectTrigger id="home-country" className="w-full">
              <SelectValue placeholder="Select Home Country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Question 2: Preferred Destinations */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            Preferred destinations
          </Label>
          <div className="flex flex-wrap gap-2">
            {selectedDestinations.map((dest) => (
              <Badge
                key={dest}
                variant="secondary"
                className="cursor-pointer px-3 py-1.5 text-sm"
              >
                {dest}
                <X
                  className="ml-1.5 h-3 w-3"
                  onClick={() => handleRemoveDestination(dest)}
                />
              </Badge>
            ))}
          </div>

          {/* Popular destinations quick select */}
          <div className="flex flex-wrap gap-2">
            {POPULAR_DESTINATIONS.filter(
              (dest) => !selectedDestinations.includes(dest),
            )
              .slice(0, 5)
              .map((dest) => (
                <Badge
                  key={dest}
                  variant="outline"
                  className="cursor-pointer px-3 py-1.5 text-sm hover:bg-secondary"
                  onClick={() => handleAddDestination(dest)}
                >
                  {dest}
                </Badge>
              ))}
          </div>

          {/* Custom destination input */}
          {selectedDestinations.length < 5 && (
            <div className="flex gap-2">
              <Input
                placeholder="Add custom destination..."
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddCustomDestination();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddCustomDestination}
                disabled={!customDestination.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {selectedDestinations.length}/5 destinations selected
          </p>
        </div>

        {/* Question 3: Travel Frequency */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            How often do you travel?
          </Label>
          <RadioGroup
            value={travelFrequency}
            onValueChange={setTravelFrequency}
          >
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-secondary/50">
              <RadioGroupItem value="1-2 trips/year" id="freq-1" />
              <Label htmlFor="freq-1" className="flex-1 cursor-pointer">
                1–2 trips / year
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-secondary/50">
              <RadioGroupItem value="3-5 trips/year" id="freq-2" />
              <Label htmlFor="freq-2" className="flex-1 cursor-pointer">
                3–5 trips / year
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-secondary/50">
              <RadioGroupItem value="Frequent traveler" id="freq-3" />
              <Label htmlFor="freq-3" className="flex-1 cursor-pointer">
                Frequent traveler
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!homeCountry}
          className="w-full"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
