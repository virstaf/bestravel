import { destinations } from "@/lib/data";
import React from "react";
import Destinations from "./ui/Destinations";

const FeaturedDestinations = () => {
  return (
    <div className="w-full py-8 border bg-gray-200">
      <div className="content px-4 md:px-8 lg:px-12">
        <h2 className="text-sm uppercase font-bold text-center">
          ✨ Featured Destinations ✨
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
          {/* {destinations.filter((item)=>{item.isFeatured}).} */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedDestinations;
