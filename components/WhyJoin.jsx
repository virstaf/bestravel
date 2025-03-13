import { benefits } from "@/lib/data";
import React from "react";

const WhyJoin = () => {
  return (
    <div className="w-full py-8 border bg-gray-200">
      <div className="content px-4 md:px-8 lg:px-12">
        <h2 className="text-sm uppercase font-bold text-center">
          Why Join Bestravel Perks Club?
        </h2>
        <div className="grid grid-cols-1 sm:max-w-[500px] lg:max-w-full mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 items-center p-4 bg-white dark:bg-black rounded-2xl shadow"
            >
              <span className="text-green-600">{benefit.icon}</span>
              <h2 className="font-bold text-lg">{benefit.title}</h2>
              <span className="text-center">{benefit.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyJoin;
