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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {processSteps.map((item, index) => (
            <div
              className="flex bg-white shadow-md rounded-lg p-6 mb-6 transition-transform transform hover:scale-105"
              key={index}
            >
              <div className="w-3/4">
                <span className="text-secondary uppercase font-bold text-sm">
                  Step 0{index + 1}
                </span>
                <h3 className="text-primary text-2xl font-bold">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
              <div className="w-1/4 flex items-center justify-center">
                {item.icon && (
                  <span>{<item.icon className="w-8 h-8 text-primary" />}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
