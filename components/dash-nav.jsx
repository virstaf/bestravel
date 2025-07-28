// "use client";

import UserProfile from "./ui/userProfile";
import Link from "next/link";
import Image from "next/image";

const dashSecNav = [
  // { name: "Subscription", path: "/dashboard/settings/#subscription-settings" },
  { name: "Account", path: "/dashboard/settings/#account-settings" },
];

const DashNav = async () => {
  return (
    <div className="dark:bg-black/50 backdrop-blur-sm fixed top-0 container z-50">
      <div className="h-16 px-4 flex justify-between items-center relative">
        <Link
          href="/dashboard"
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
