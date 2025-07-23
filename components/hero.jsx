import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="max-w-7xl px-4 mx-auto my-12 flex flex-col-reverse md:flex-row justify-between gap-6 h-full">
        <div className="w-full md:w-1/2 py-12 my-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Unlock Luxury Travel. Exclusive Travel Perks. Members-Only Prices.
          </h1>
          <p className="text-lg mb-6 mt-4 text-gray-600 max-w-3xl mx-auto">
            Tired of spending hours looking for travel deals and overpaying for
            comfort? Virstravel Club unlocks premium travel experiences without
            the premium price tag and stress.
          </p>
          <Button
            variant="outline"
            asChild
            className="bg-gradient-to-br from-primary to-secondary px-12 py-6 cursor-pointer !hover:bg-primary text-white transition duration-300 w-full md:w-auto"
          >
            <Link href="/auth/signup" className="hover:text-primary">
              Join Now & Save on Your Next Trip
            </Link>
          </Button>
        </div>
        <div className="w-full md:w-1/2 py-8 rounded overflow-hidden">
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
