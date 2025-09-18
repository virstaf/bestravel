"use client";

import React, { useEffect, useState } from "react";
import CurrentUserAvatar from "../current-user-avatar";
import LogoutButton from "./logout-button";
import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { getProfileAction } from "@/actions/profiles";

const UserProfile = ({ className }) => {
  const [loading, setLoading] = useState(true);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {profile} = await getProfileAction();
        setUser(profile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
