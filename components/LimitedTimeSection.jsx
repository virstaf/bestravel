import React from "react";
import { Button } from "./ui/button";
import { JoinDialog } from "./JoinDialog";

const LimitedTimeSection = () => {
  return (
    <div className="w-full py-8 bg-gray-200 ">
      <div className="grid md:grid-cols-2 items-center justify-center gap-2 px-4 md:px-8 lg:px-12">
        <div>
          <h2 className="font-bold text-2xl">Limited-Time Offer!</h2>
          <span>Sign up today & receive up to 50% OFF membership fees!</span>
        </div>
        <div className="flex flex-col gap-4">
          <ul>
            <li>
              ✅ Get up to £500 in travel credits for future hotel bookings!
            </li>
            <li>⏳ Hurry! These offers won’t last long!</li>
          </ul>
          <div className="">
            {/* <Button>Join Now & Claim Your Offer!</Button> */}
            <JoinDialog ButtonText={"Join Now & Claim Your Offer!"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedTimeSection;
