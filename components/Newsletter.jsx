import React from "react";
import SubscribeForm from "./ui/subscribe";

const Newsletter = () => {
  return (
    <div className="w-full py-12 border border-x-0">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-sm uppercase font-bold text-center mb-6">
          📬 Subscribe to Our Travel Newsletter!
        </h2>
        <div className="grid md:grid-cols-2 justify-evenly items-center">
          <p className="text-center md:text-left">
            💡 Get exclusive deals, travel tips, and insider discounts straight
            to your inbox!
          </p>
          <div className="relative my-6 max-w-[300px] mx-auto rounded-full overflow-hidden shadow">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
