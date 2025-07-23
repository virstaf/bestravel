import { memberBenefits } from "@/lib/data";
import React from "react";

const BenefitSection = () => {
  return (
    <section className="bg-accent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Benefits Members Get
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            When You Join Virstravel Club, You Unlock Real Travel Perks and
            Discounts.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {memberBenefits.map((benefit, index) => (
            <div
              key={index}
              className="mb-8 bg-white p-6 rounded-lg shadow-md flex"
            >
              <div className="w-1/4 mx-auto flex justify-center items-center mb-4">
                <span>{<benefit.icon className="text-primary w-9 h-9" />}</span>
              </div>
              <div className="w-3/4 mx-auto">
                <h3 className="text-xl font-semibold text-primary">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
