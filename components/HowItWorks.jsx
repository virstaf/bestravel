import { howItWorks } from "@/lib/data";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="w-full py-12 bg-primary-foreground">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="text-sm uppercase font-bold text-center">
          How it Works
        </h1>
        <div className="grid grid-cols-1 mx-auto sm:max-w-[450px] lg:max-w-full lg:grid-cols-3 gap-6 mt-8">
          {howItWorks.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 items-center p-4 bg-white dark:bg-black rounded-2xl shadow relative"
            >
              <div className="absolute top-3 left-4  text-xl font-bold backdrop-blur-2xl flex items-center justify-center">
                <span className="">0{idx + 1}</span>
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
