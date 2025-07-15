"use client";

import { useCurrentUserImage } from "@/hooks/use-current-user-image";
import { useCurrentUserName } from "@/hooks/use-current-user-name";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSubscription } from "@/hooks/use-subscription";
import { LoaderIcon } from "lucide-react";
import { LoaderCircle } from "lucide-react";

const CurrentUserAvatar = () => {
  const { icon } = useSubscription();
  const profileImage = useCurrentUserImage();
  const name = useCurrentUserName();
  const initials = name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <div className="relative w-full h-full">
      <Avatar className="">
        {profileImage && <AvatarImage src={profileImage} alt={initials} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-1 -right-2 text-xs">
        {icon ? (
          icon
        ) : (
          <span className="animate-spin text-primary text-xs">
            <LoaderIcon className="animate-spin w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  );
};

export default CurrentUserAvatar;
