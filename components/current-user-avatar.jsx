// "use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import determineSubscriptionPlan from "@/utils/determineSubscription";

const CurrentUserAvatar = ({ user }) => {
  const profileImage = user?.avatar_url;
  const name = user?.full_name;
  const initials = name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  const { plan, icon, badge } = determineSubscriptionPlan(
    user?.subscription_plan
  );

  return (
    <div className="relative w-full h-full">
      <Avatar className="">
        {profileImage && <AvatarImage src={profileImage} alt={initials} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-1 -right-2 text-xs">
        {icon ? (
          <Tooltip>
            <TooltipTrigger>
              <span className="text-primary">{icon}</span>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-white">{badge}</span>
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
