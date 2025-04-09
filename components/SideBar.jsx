"use client";

import { sidebarNav } from "@/lib/data";
import { AlignLeftIcon, AlignRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // setActiveTab(pathname.split("/")[1]);
    console.log("pathname::", pathname);
  }, [pathname]);

  return (
    <div
      className={`${
        sidebarOpen ? "sm:w-[250px]" : "sm:w-[80px]"
      } m-2 p-5 sm:py-10 rounded-2xl overflow-x-auto bg-blue-900 text-white relative`}
    >
      <div
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="hidden sm:block sm:absolute right-3 top-3 hover:text-gray-300"
      >
        <span>{sidebarOpen ? <AlignLeftIcon /> : <AlignRightIcon />}</span>
      </div>
      <ul className="flex sm:flex-col  justify-between gap-3">
        {sidebarNav.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.path}
              className={`flex flex-col items-center  sm:flex-row gap-3 hover:text-gray-300 p-2 rounded-md ${
                item.path === pathname ? "bg-black/40" : ""
              }`}
            >
              <span>{<item.icon />}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
