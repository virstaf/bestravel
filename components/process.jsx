import { processSteps } from "@/lib/data";
import React from "react";

const Process = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            How Does it Work?
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            It’s Easy to Start:
          </p>
        </div>
        <div>
          {processSteps.map((item, index) => (
            <div className="flex">
              <span>Step {index + 1}</span>
              <div className="">
                <span>{item.title}</span>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
