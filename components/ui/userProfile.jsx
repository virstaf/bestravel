"use client";

import { useState } from "react";
import CurrentUserAvatar from "../current-user-avatar";
import LogoutButton from "./logout-button";
import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { useProfileContext } from "@/contexts/profile";

const UserProfile = ({ className }) => {
  const { profile: user, isLoading: loading } = useProfileContext();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      onClick={() => setLogoutOpen((prev) => !prev)}
      className={`${className} flex user-group gap-2 items-center justify-center cursor-pointer relative`}
    >
      <CurrentUserAvatar user={user} />
      <div
        className={`${
          logoutOpen ? "flex" : "hidden"
        } flex-col items-center gap-2 backdrop-blur-xs bg-white p-6 rounded-2xl shadow absolute top-10 right-0`}
      >
        <span className="text-muted-foreground">{user?.email}</span>
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
