import { benefits } from "@/lib/data";
import React from "react";

const WhyJoin = () => {
  return (
    <div className="w-full py-8 border bg-gray-200">
      <div className="content px-4 md:px-8 lg:px-12">
        <h1 className="text-sm uppercase font-bold text-center">
          Why Join Bestravel Perks Club?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 items-center p-4 bg-white dark:bg-black rounded-2xl shadow"
            >
              {/* <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                {benefit.icon}
              </div> */}
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
