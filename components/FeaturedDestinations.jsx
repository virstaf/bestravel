import { destinations } from "@/lib/data";
import React from "react";
import Destinations from "./ui/Destinations";
import { Button } from "./ui/button";

const FeaturedDestinations = () => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-sm uppercase font-bold text-center">
          ✨ Featured Destinations ✨
        </h2>
        <div className="grid grid-cols-1 sm:max-w-[500px] mx-auto lg:max-w-full lg:grid-cols-3 gap-6 mt-8">
          {destinations
            .filter((item) => item.isFeatured)
            .map((destination, idx) => (
              <Destinations
                key={idx}
                title={destination.title}
                imgSrc={destination.imgSrc}
                description={destination.description}
                isFeatured={destination.isFeatured}
              />
            ))}
        </div>
        <div className="w-full my-6 flex justify-center">
          <Button>View More</Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDestinations;
