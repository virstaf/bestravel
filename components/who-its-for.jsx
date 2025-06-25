import { whoItsFor } from "@/lib/data";
import Image from "next/image";
import React from "react";

const WhoItsFor = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Made for Smart Travelers Like You
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you’re jetting off for business or leisure, Virstravel Club
            helps you unlock exclusive discounts, seamless experiences, and real
            savings — every trip, every time
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whoItsFor.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md mb-4 flex flex-col items-center justify-between"
            >
              <Image
                src={item.imgSrc}
                alt={item.title}
                width={item.imgWidth || 1920}
                height={item.imgHeight || 1280}
                className="w-full h-[250px] mb-4 object-cover"
              />
              <p className="py-4 px-8 text-gray-600 text-lg">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
