import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <div className="container mx-auto flex justify-between gap-6 h-full">
        <div className="w-1/2 py-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Unlock Luxury Travel. Exclusive Perks. Members-Only Prices.
          </h1>
          <p className="text-lg mb-6">
            Tired of spending hours looking for deals and overpaying for
            comfort? Virstravel Club unlocks premium travel experiences without
            the premium price tag and stress.
          </p>
          <Button
            variant="outline"
            className="bg-gradient-to-br from-primary to-green-400 px-12 py-6 cursor-pointer hover:bg-primary text-white transition duration-300"
          >
            Join Now & Save on Your Next Trip
          </Button>
        </div>
        <div className="w-1/2 py-8 rounded overflow-hidden">
          <Image
            src="/images/happy-black-woman-laughing-on-street.jpg"
            alt="Travel Hero"
            width="1920"
            height="1280"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
