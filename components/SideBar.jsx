"use client";

import { sidebarNav } from "@/lib/data";
import { AlignLeftIcon, AlignRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

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
              className={`flex flex-col items-center  sm:flex-row gap-3 hover:text-gray-300 p-2 rounded-md ${item.path.length < 11 && item.path === pathname ? "bg-black/40" : ""} ${
                item.path !== "/dashboard" && pathname.startsWith(item.path)
                  ? "bg-black/40"
                  : ""
              }`}
            >
              <Tooltip>
                <TooltipTrigger>{<item.icon />}</TooltipTrigger>
                <TooltipContent>
                  <span className="text-white">{item.name}</span>
                </TooltipContent>
                {sidebarOpen && <span>{item.name}</span>}
              </Tooltip>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
