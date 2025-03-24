"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/lib/data";
import { JoinDialog } from "./JoinDialog";

const NavSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const pathname = usePathname();
  const menuRef = useRef(null);

  useEffect(() => {
    setActiveTab(pathname.split("/")[1]);
    console.log(activeTab);
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
          <span className="font-bold text-2xl text-green-600">Bestravel</span>
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
        {/* <div onClick={toggleMenu} className="md:hidden text-primary">
          {menuOpen ? <X /> : <AlignJustify />}
        </div> */}
        {/* Reveal after dashboard is complete */}
        {/* <Button variant="secondary" className="hover:scale-105  md:block">
        <div className="hidden md:flex gap-3">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button className="hover:scale-105  md:block">
            <Link href="/auth/signup">Register</Link>
          </Button> */}
        {/* Remove after dashboard is complete */}
        <div>
          <JoinDialog ButtonText={"Join VIP Waiting Now!"} />
        </div>
      </div>
    </div>
  );
};

export default NavSection;
