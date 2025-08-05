// "use client";

import UserProfile from "./ui/userProfile";
import Link from "next/link";
import Image from "next/image";
import Logo from "./ui/logo";

const dashSecNav = [
  // { name: "Subscription", path: "/dashboard/settings/#subscription-settings" },
  { name: "Account", path: "/dashboard/settings/#account-settings" },
];

const DashNav = async () => {
  return (
    <div className="dark:bg-black/50 backdrop-blur-sm fixed top-0 container z-50">
      <div className="h-16 px-4 flex justify-between items-center relative">
        <Logo href="/dashboard" />
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
