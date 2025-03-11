import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative w-full h-full">
      <div className="content h-full px-4 md:px-8 lg:px-12 grid grid-cols-2 gap-8 justify-center items-center">
        {/* content... */}
        <div className="cta flex flex-col gap-6 items-center p-8 backdrop-blur rounded-4xl">
          <div className="flex flex-col text-center">
            <span className="uppercase text-xs font-bold">
              🌍 Travel More, Spend Less – with Exclusive Member Benefits!
            </span>
            <h2 className="font-bold text-4xl">
              Unlock VIP Travel Perks & Save Up to 50%!
            </h2>
          </div>
          <span>
            Join today and get up to £500 in travel credits, VIP lounge access,
            and more!
          </span>
          <Button>Join Now & Save 50%!</Button>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="heroImage h-[300px] rounded-2xl overflow-hidden">
            <Image
              className="object-contain"
              src="/images/woman-on-canoe.jpg"
              width="1280"
              height="853"
              alt="woman on canoe"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
