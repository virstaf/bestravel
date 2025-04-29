"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/lib/data";
import UserProfile from "./ui/userProfile";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import { JoinDialog } from "./JoinDialog";

const NavSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      setUserData(data.user);
    };
    fetchUserData();
  }, [userData]);

  useEffect(() => {
    setActiveTab(pathname.split("/")[1]);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="dark:bg-black/50 backdrop-blur-sm w-full fixed top-0 z-50">
      <div className="h-16 container mx-auto px-4 flex justify-between items-center relative">
        <Link
          href="/"
          className="max-h-14 hover:cursor-pointer hover:scale-105"
        >
          <div className="h-full relative">
            <Image
              src="/virstravel.png"
              alt="logo"
              width={805}
              height={310}
              // fill
              className="h-12 w-31 object-fit"
            />
          </div>
        </Link>
        <div className="hidden md:flex space-x-4 md:space-x-8 lg:space-x-12">
          {NavLinks.map((item, idx) => {
            return (
              <Link
                key={idx}
                href={item.path}
                className={`${
                  item.path === pathname ? "text-primary" : ""
                } hover:scale-105`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute top-20 right-8 bg-white dark:bg-black shadow rounded backdrop-blur-sm flex flex-col gap-2 p-6"
          >
            {NavLinks.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  href={item.path}
                  className={`${
                    item.path === pathname ? "text-primary" : ""
                  } hover:scale-105`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
        <JoinDialog ButtonText={"Join VIP Waiting"} />
        {/* {userData ? (
          <UserProfile />
        ) : (
          <div className="flex gap-2">
            <Button asChild>
              <Link href="auth/login">Login</Link>
            </Button>
            <Button
              className="hidden md:block hover:bg-gray-200"
              variant="outline"
              asChild
            >
              <Link href="auth/signup">Sign up</Link>
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default NavSection;
