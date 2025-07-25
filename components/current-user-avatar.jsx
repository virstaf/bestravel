"use client";

import { useCurrentUserImage } from "@/hooks/use-current-user-image";
import { useCurrentUserName } from "@/hooks/use-current-user-name";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSubscription } from "@/hooks/use-subscription";
import { LoaderIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

const CurrentUserAvatar = () => {
  const profileImage = useCurrentUserImage();
  const name = useCurrentUserName();
  const initials = name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  const [planIcon, setPlanIcon] = useState(null);
  const [planBadge, setPlanBadge] = useState(null);
  const { icon, badge } = useSubscription();

  useEffect(() => {
    if (icon) {
      setPlanIcon(icon);
    }
    if (badge) {
      setPlanBadge(badge);
    }
  }, [icon, badge]);

  return (
    <div className="relative w-full h-full">
      <Avatar className="">
        {profileImage && <AvatarImage src={profileImage} alt={initials} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-1 -right-2 text-xs">
        {planIcon ? (
          <Tooltip>
            <TooltipTrigger>
              <span className="text-primary">{planIcon}</span>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-white">{planBadge}</span>
            </TooltipContent>
          </Tooltip>
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
