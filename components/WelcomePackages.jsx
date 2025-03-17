import React from "react";
import { Button } from "./ui/button";

const WelcomePackages = () => {
  return (
    <div className="w-full py-8 bg-gray-200 ">
      <div className="container mx-auto px-4">
        <h3 className="text-sm uppercase font-bold text-center mb-6">
          🎁 Sign Up & Get:
        </h3>
        <div className="flex flex-col w-full border lg:flex-row items-center justify-center lg:justify-evenly gap-4">
          <ul className="">
            <li>
              ✅ Up to 50% Discount on Membership Fees (Limited-Time Only!)
            </li>
            <li>✅ Up to £500 Travel Credits for Hotel Bookings</li>
          </ul>
          <div className="">
            <Button>Join Now & Start Saving!</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePackages;
