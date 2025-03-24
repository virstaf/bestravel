import React from "react";
import { Button } from "./ui/button";
import { JoinDialog } from "./JoinDialog";

const WelcomePackages = () => {
  return (
    <div className="w-full py-12 ">
      <div className="container mx-auto px-4">
        <h3 className="text-sm uppercase font-bold text-center mb-6">
          🎁 Sign Up & Get:
        </h3>
        <div className="flex flex-col w-full lg:flex-row items-center justify-center lg:justify-evenly gap-4">
          <ul className="">
            <li>
              ✅ Up to 50% Discount on Membership Fees (Limited-Time Only!)
            </li>
            <li>✅ Up to £500 Travel Credits for Hotel Bookings</li>
          </ul>
          <div className="">
            <JoinDialog ButtonText={"Join Now & Start Saving!"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePackages;
