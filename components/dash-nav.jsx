import React from "react";
import UserProfile from "./ui/userProfile";
import Link from "next/link";

const dashSecNav = [
  { name: "Support", path: "/about" },
  { name: "Account", path: "/contact" },
];

const DashNav = () => {
  return (
    <div className="dark:bg-black/50 backdrop-blur-sm w-full sticky top-0 z-50">
      <div className="h-16 container mx-auto px-4 flex justify-between items-center relative">
        <Link href="/" className="text-blue-700 text-2xl italic">
          Bestravel
        </Link>
        <div className="flex gap-4 items-center justify-center">
          <ul className="text-sm gap-3 items-center justify-center hidden sm:flex">
            {dashSecNav.map((item, idx) => (
              <li
                key={idx}
                className="text-muted-foreground hover:text-blue-500 transition-colors duration-200"
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default DashNav;
