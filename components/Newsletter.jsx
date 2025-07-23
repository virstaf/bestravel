import React from "react";
import SubscribeForm from "./ui/subscribe";
import { Lightbulb } from "lucide-react";

const Newsletter = () => {
  return (
    <div className="w-full py-12 border border-x-0 bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Be first to Catch the sweetest Travel deals!
        </h2>
        <div className="grid justify-evenly items-center">
          <div className="flex items-center gap-3 text-center text-lg text-white md:text-left">
            <span>
              <Lightbulb className="text-yellow-300" />
            </span>
            Get exclusive deals, travel tips, and insider discounts straight to
            your inbox!
          </div>
          <div className="relative my-6 max-w-[300px] mx-auto rounded-full overflow-hidden shadow">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
