import React from "react";
import { Button } from "./ui/button";

const WelcomePackages = () => {
  return (
    <div className="w-full py-8 bg-gray-200 ">
      <div className="flex flex-col items-center justify-center gap-4 px-4 md:px-8 lg:px-12">
        <h3 className="text-sm uppercase font-bold text-center">
          🎁 Sign Up & Get:
        </h3>
        <ul className="">
          <li>✅ Up to 50% Discount on Membership Fees (Limited-Time Only!)</li>
          <li>✅ Up to £500 Travel Credits for Hotel Bookings</li>
        </ul>
        <div className="">
          <Button>Join Now & Start Saving!</Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePackages;
