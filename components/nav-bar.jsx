"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getUser } from "@/lib/supabase/server";
import UserProfile from "./ui/userProfile";
import { NavLinks } from "@/lib/data";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { AlignRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./ui/logo";

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
      className={cn(
        "fixed top-0 z-50 w-full h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300",
        menuOpen && "h-screen bg-white md:h-16",
      )}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo left */}
        <div className="flex-shrink-0">
          <Logo href="/" />
        </div>

        {/* Links center */}
        <div
          className={cn(
            "hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2",
            menuOpen && "flex flex-col static translate-x-0 mt-16",
          )}
        >
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                "text-small font-medium text-gray-500 hover:text-primary-700 transition-colors",
                pathname === link.path && "text-primary-700 font-bold",
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA right */}
        <div
          className={cn(
            "hidden md:flex items-center gap-4",
            menuOpen && "flex flex-col w-full mt-8",
          )}
        >
          {user ? (
            <>
              <Button asChild size="sm" className={cn(menuOpen && "w-full")}>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserProfile className="hidden md:block" />
            </>
          ) : (
            <div
              className={cn(
                "flex items-center gap-3",
                menuOpen && "flex-col w-full",
              )}
            >
              <Button
                asChild
                variant="ghost"
                size="sm"
                className={cn(menuOpen && "w-full")}
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                asChild
                variant="accent"
                size="sm"
                className={cn(menuOpen && "w-full")}
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <AlignRight />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay (content already handled in above structure with cn) */}
    </nav>
  );
};

export default NavBar;
