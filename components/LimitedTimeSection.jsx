import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const LimitedTimeSection = () => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto grid md:grid-cols-2 items-center justify-center gap-2 px-4 md:px-8 lg:px-12">
        <div>
          <h2 className="font-bold text-2xl">Limited-Time Offer!</h2>
          <span>Sign up today & receive up to 50% OFF membership fees!</span>
        </div>
        <div className="flex flex-col gap-4">
          <ul>
            <li>
              ✅ Get exciting deals in travel credits for future hotel bookings!
            </li>
            <li>⏳ Hurry! These offers won’t last long!</li>
          </ul>
          <div className="">
            <Button asChild>
              <Link href="/auth/signup">Join Now & Claim Your Offer!</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedTimeSection;
