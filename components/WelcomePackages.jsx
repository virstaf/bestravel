import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const WelcomePackages = () => {
  return (
    <div className="w-full py-12 bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-white text-center mb-6">
          Sign Up & Get
        </h3>
        <div className="flex flex-col w-full lg:flex-row items-center justify-center lg:justify-evenly gap-4">
          <ul className="text-white">
            <li>
              ✅ Up to 50% Discount on Membership Fees (Limited-Time Only!)
            </li>
            <li>✅ Up to exciting Travel Credits for Hotel Bookings</li>
          </ul>
          <div className="">
            <Button asChild>
              <Link href="/auth/signup">Join Now & Start Saving!</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePackages;
