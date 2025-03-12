import React from "react";
import SubscribeForm from "./ui/subscribe";

const Newsletter = () => {
  return (
    <div className="w-full py-8 border bg-gray-200">
      <div className="content px-4 md:px-8 lg:px-12">
        <h2 className="text-sm uppercase font-bold text-center">
          📬 Subscribe to Our Travel Newsletter!
        </h2>
        <p>
          💡 Get exclusive deals, travel tips, and insider discounts straight to
          your inbox!
        </p>
        <div className="relative my-8 max-w-[300px] mx-auto rounded-full overflow-hidden shadow">
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
