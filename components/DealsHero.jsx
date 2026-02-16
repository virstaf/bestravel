"use client";

import { Button } from "@/components/ui/button";
import { Clock, Globe, Wallet } from "lucide-react";
import Link from "next/link"; // Changed to Link to avoid page reload on anchor click if possible, or use simple anchor for scroll id

const DealsHero = () => {
  const scrollToDeals = () => {
    const dealsGrid = document.getElementById("deals-grid");
    if (dealsGrid) {
      dealsGrid.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/maldives_beach.jpg')", // Using an existing image
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-8">
        {/* Headache & Subtext */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-md">
            Exclusive Travel Deals,
            <br />
            Handpicked for You
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-sm leading-relaxed">
            Save on flights, hotels, and curated experiences — limited-time
            offers you won’t find everywhere.
          </p>
        </div>

        {/* Quick Stats Row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 py-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Wallet className="w-5 h-5 text-secondary" />
            <span className="font-medium">Save up to 40%</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Globe className="w-5 h-5 text-secondary" />
            <span className="font-medium">30+ destinations</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Clock className="w-5 h-5 text-secondary" />
            <span className="font-medium">Updated weekly</span>
          </div>
        </div>

        {/* Primary CTA */}
        <div>
          <Button
            size="lg"
            onClick={scrollToDeals}
            className="md:text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            Browse Deals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DealsHero;
