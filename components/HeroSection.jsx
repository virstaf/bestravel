import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Check } from "lucide-react";

// Fallback gradient if image fails or for this version
const HeroSection = () => {
  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col items-center justify-center p-4">
      {/* Background - Soft Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50" />

      {/* Content */}
      <div className="container mx-auto flex flex-col items-center text-center z-10 space-y-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Travel smarter. Save more. Explore freely.
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Unlock exclusive flight and hotel deals with your Virstravel
            membership.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2rem] shadow-xl p-6 md:p-8 w-full max-w-lg transition-all hover:shadow-2xl ring-1 ring-gray-100/50">
          <div className="space-y-6">
            {/* Field 1: Destination */}
            <div className="space-y-2 text-left">
              <Label
                htmlFor="destination"
                className="text-base font-semibold text-gray-700"
              >
                Where do you want to go?
              </Label>
              <div className="relative">
                <Input
                  id="destination"
                  placeholder="Accra → Dubai"
                  className="h-12 text-lg text-left"
                />
              </div>
            </div>

            {/* Field 2: Travel Type */}
            <div className="space-y-2 text-left">
              <Label className="text-base font-semibold text-gray-700">
                What are you looking for?
              </Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 h-12 rounded-full bg-primary text-primary-foreground font-medium text-base transition hover:opacity-90 ring-2 ring-primary ring-offset-2">
                  Flights
                </button>
                <button className="flex-1 h-12 rounded-full bg-gray-100 text-gray-600 font-medium text-base transition hover:bg-gray-200">
                  Hotels
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="w-full h-12 text-lg font-bold shadow-lg bg-primary hover:bg-primary/90 transition-all hover:-translate-y-0.5">
              Show me member deals →
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500/80 font-medium">
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4" /> <span>Members save up to 30%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4" /> <span>No booking fees</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4" /> <span>24/7 travel support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
