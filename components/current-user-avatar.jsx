"use client";

import { useCurrentUserImage } from "@/hooks/use-current-user-image";
import { useCurrentUserName } from "@/hooks/use-current-user-name";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSubscription } from "@/hooks/use-subscription";

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
      <span className="absolute -bottom-1 -right-2 text-xs">{icon}</span>
    </div>
  );
};

export default CurrentUserAvatar;
