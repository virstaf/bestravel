"use client";

import { useCurrentUserName } from "@/hooks/use-current-user-name";
import Link from "next/link";
import { Button } from "./ui/button";
import { useProfileContext } from "@/contexts/profile";
import { useEffect, useState } from "react";

const WelcomeCard = () => {
  const [userName, setUserName] = useState(null);
  const { profile, isLoading } = useProfileContext();

  // if (isLoading) {
  //   setUserName("Loading...");
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <span className="text-sm text-muted-foreground">Loading...</span>
  //     </div>
  //   );
  // }

  useEffect(() => {
    if (isLoading) {
      setUserName("!");
      return;
    }
    if (profile) {
      setUserName(profile?.username || "No name found");
    }
  }, [profile]);

  return (
    <div className="flex flex-col relative items-start justify-center w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg p-6">
      <div className="absolute top-0 bottom-0 right-0 left-0 clipPath heroBg overflow-hidden"></div>
      <p className="text-3xl text-gray-600 italic text-left py-1 mb-2 backdrop-blur-3xl pr-2 rounded z-10">
        Howdy {userName}!
      </p>
      <p className="text-gray-600 py-2 mb-2 backdrop-blur-3xl pr-2 rounded z-10">
        Checkout the latest travel deals and offers
      </p>
      <Button
        asChild
        className="px-4 py-2 bg-secondary z-10 text-white rounded-lg hover:bg-secondary/80 transition duration-200"
      >
        <Link href="/dashboard/deals">Explore Deals</Link>
      </Button>
    </div>
  );
};

export default WelcomeCard;
