import { howItWorks } from "@/lib/data";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="w-full py-8 bg-gray-200 ">
      <div className="content px-4 md:px-8 lg:px-12">
        <h1 className="text-sm uppercase font-bold text-center">
          How it Works
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {howItWorks.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 items-center p-4 bg-white dark:bg-black rounded-2xl shadow relative"
            >
              <div className="absolute top-3 left-4  text-xl font-bold backdrop-blur-2xl flex items-center justify-center">
                {idx + 1}
              </div>
              <span className="text-green-600">{step.icon}</span>
              <h2 className="font-bold text-lg">{step.title}</h2>
              <span className="text-center">{step.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
