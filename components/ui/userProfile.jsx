"use client";

import React, { useState } from "react";
import CurrentUserAvatar from "../current-user-avatar";
import LogoutButton from "./logout-button";
import { useCurrentUserEmail } from "@/hooks/use-current-user-email";
import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";

const UserProfile = ({ className }) => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const email = useCurrentUserEmail();
  const pathname = usePathname();

  return (
    <div
      onClick={() => setLogoutOpen((prev) => !prev)}
      className={`${className} flex user-group gap-2 items-center justify-center cursor-pointer relative`}
    >
      <span className="text-sm text-muted-foreground user-group-hover:text-green-500">
        {/* {email} */}
      </span>
      <CurrentUserAvatar />
      <div
        className={`${
          logoutOpen ? "flex" : "hidden"
        } flex-col items-center gap-2 backdrop-blur-xs bg-white p-6 rounded-2xl shadow absolute top-10 right-0`}
      >
        <span className="text-muted-foreground">{email}</span>
        {!pathname.includes("dashboard") && (
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        )}
        <LogoutButton className="cursor-pointer" />
      </div>
    </div>
  );
};

export default UserProfile;
