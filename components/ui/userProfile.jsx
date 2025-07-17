"use client";

import React, { useEffect, useState } from "react";
import CurrentUserAvatar from "../current-user-avatar";
import LogoutButton from "./logout-button";
import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { useProfileContext } from "@/contexts/profile";

const UserProfile = ({ className }) => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const { profile, isLoading } = useProfileContext();
  const pathname = usePathname();

  useEffect(() => {
    const fetchEmail = async () => {
      if (isLoading) {
        setEmail("Loading...");
        return;
      }
      if (profile) {
        setEmail(profile.email || "No email found");
      }
    };
    fetchEmail();
  }, [profile]);

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
