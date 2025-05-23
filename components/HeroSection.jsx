import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { JoinDialog } from "./JoinDialog";

const HeroSection = () => {
  return (
    <div className="relative w-full h-full">
      <div className="container mx-auto py-12 h-full min-h-[550px] grid lg:grid-cols-2 gap-8 justify-center items-center">
        {/* content... */}
        <div></div>
        <div className="cta flex flex-col gap-6 items-center p-8 backdrop-blur bg-white/10 rounded-[2rem]">
          <div className="flex flex-col text-center">
            <p className="uppercase text-xs tracking-wider pb-2 font-bold text-secondary">
              🌍 Travel More, Spend Less, Enjoy Member Benefits!
            </p>
            <h2 className="font-bold text-4xl">
              Unlock VIP Travel Perks & Save Up to 50%!
            </h2>
          </div>
          <p className="text-center">
            Join today and get exciting deals in travel credits, VIP lounge
            access, and more!
          </p>
          <JoinDialog ButtonText={"Request Custom Trip"} />
          {/* <Button asChild>
            <Link href="/auth/signup">Claim Benefits Today!</Link>
          </Button> */}
        </div>
        <div className="w-full h-full  items-center justify-center hidden">
          {/* <MyCarousel /> */}
          <div className="heroImage object-cover mx-4 h-full rounded-2xl overflow-hidden ">
            <Image
              className="object-cover"
              src="/images/maldives_beach.jpg"
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
