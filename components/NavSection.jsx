"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/lib/data";
import UserProfile from "./ui/userProfile";
import Image from "next/image";
import { getUser } from "@/lib/supabase/server";
import { AlignRight, X } from "lucide-react";

const NavSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await getUser();
      setUserData(data.user);
    };
    fetchUserData();
  }, [userData]);

  useEffect(() => {
    setActiveTab(pathname.split("/")[1]);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

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

  return (
    <div className="w-full h-16 fixed top-0 z-50 backdrop-blur-2xl bg-white/80 dark:bg-black/50">
      <div className="h-full container mx-auto px-4 flex justify-between items-center relative">
        <Link
          href="/"
          className="max-h-14 hover:cursor-pointer hover:scale-105"
          aria-label="Virstravel Home"
        >
          <div className="h-full relative">
            <Image
              src="/virstravel.png"
              alt="logo"
              width={805}
              height={310}
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
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-gray-600 hover:bg-transparent"
          >
            {menuOpen ? <X /> : <AlignRight />}
          </Button>
        </div>
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute top-20 right-4 bg-white dark:bg-black shadow-lg rounded-xl border border-gray-100 flex flex-col gap-2 p-6 min-w-[200px] z-50"
          >
            {NavLinks.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  href={item.path}
                  className={`${
                    item.path === pathname ? "text-primary font-semibold" : "text-gray-600"
                  } hover:text-primary transition-colors py-2`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
        {userData ? (
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
        )}
      </div>
    </div>
  );
};

export default NavSection;
