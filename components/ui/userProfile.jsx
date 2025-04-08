"use client";

import React, { useState } from "react";
import CurrentUserAvatar from "../current-user-avatar";
import LogoutButton from "./logout-button";
import { useCurrentUserEmail } from "@/hooks/use-current-user-email";

const UserProfile = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const email = useCurrentUserEmail();

  return (
    <div
      onClick={() => setLogoutOpen((prev) => !prev)}
      className="flex user-group gap-2 items-center justify-center cursor-pointer relative"
    >
      <span className="text-sm text-muted-foreground user-group-hover:text-green-500">
        {/* {email} */}
      </span>
      <CurrentUserAvatar />
      <div
        className={`${logoutOpen ? "block" : "hidden"} absolute top-10 right-0`}
      >
        <LogoutButton className="cursor-pointer" />
      </div>
    </div>
  );
};

export default UserProfile;
