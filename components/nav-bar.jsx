"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { getUser } from "@/lib/supabase/server";
import UserProfile from "./ui/userProfile";
import { NavLinks } from "@/lib/data";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { AlignRight } from "lucide-react";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    setMenuOpen(false);

    // Close menu on resize to md+
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  return (
    <nav
      className={`bg-none backdrop-blur-sm transition-transform duration-300 ease-in-out fixed w-full top-0 z-50 h-16 ${menuOpen ? "bg-white shadow h-screen md:h-16 rounded-b-2xl" : ""}`}
    >
      <div
        className={`relative max-w-7xl mx-auto px-4 flex items-center justify-between h-full  ${menuOpen ? "flex-col justify-between gap-16 py-8" : ""}`}
      >
        <div className={`logo ${menuOpen ? "mt-16" : ""}`}>
          <Link
            href="/"
            className="max-h-14 hover:cursor-pointer hover:scale-105"
          >
            <Image
              src="/virstravel.png"
              alt="Virstravel Club Logo"
              width={805}
              height={310}
              className="h-12 w-31 object-contain"
              priority
            />
          </Link>
        </div>
        <div
          className={`flex items-center gap-4 ${menuOpen ? "flex-col" : "hidden md:flex"}`}
        >
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-gray-900 hover:text-gray-600 ${link.path.length < 2 && link.path === pathname ? "font-bold text-primary" : ""} ${
                link.path !== "/" && pathname.startsWith(link.path)
                  ? "font-bold text-primary"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div
          className={`flex items-center justify-center gap-4 ${menuOpen ? "w-full flex flex-col" : "hidden md:flex"}`}
        >
          {user ? (
            <>
              <Button
                asChild
                className={`text-white ${menuOpen ? "w-full" : ""}`}
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserProfile className="hidden md:block" />
            </>
          ) : (
            <div
              className={`flex gap-2` + (menuOpen ? " flex-col w-full" : "")}
            >
              <Button
                asChild
                variant="outline"
                className={menuOpen ? "w-full" : ""}
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild className={menuOpen ? "w-full" : ""}>
                <Link href="/auth/signup" className="text-white">
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>
        <div className="text-gray-600 absolute top-4 right-8 md:hidden">
          {!menuOpen ? (
            <AlignRight
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer"
            />
          ) : (
            <X onClick={() => setMenuOpen(false)} className="cursor-pointer" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
