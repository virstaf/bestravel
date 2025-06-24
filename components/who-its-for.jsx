import { whoItsFor } from "@/lib/data";
import React from "react";

const WhoItsFor = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Who is This For?
          </h2>
        </div>
        <ul className="">
          {whoItsFor.map((text, index) => (
            <li>{text.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhoItsFor;
