"use client";

import React, { useEffect, useState } from "react";
import CurrentUserAvatar from "../current-user-avatar";
import LogoutButton from "./logout-button";
import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { useProfileContext } from "@/contexts/profile";
import useUserStore from "@/user.store";
import { Loader } from "lucide-react";

const UserProfile = ({ className }) => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  // const { profile, isLoading } = useProfileContext();
  const pathname = usePathname();

  const { fetchUser, isLoading, isAuthenticated, user } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader className="animate-spin h-6 w-6 text-gray-500" />;
  }

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
        {isAuthenticated && (
          <span className="text-muted-foreground">{user.email}</span>
        )}
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
