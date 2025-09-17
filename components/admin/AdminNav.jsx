"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";

const getPageTitle = (page) => {
  switch (page) {
    case "dashboard":
      return "Dashboard";
    case "reservation":
      return "All Reservations";
    case "users":
      return "User Management";
    case "deals":
      return "Manage Deals";
    case "partners":
      return "Our Partners";
    case "settings":
      return "Settings";
    default:
      return "Overview";
  }
};

const AdminNav = () => {
  const pathname = usePathname();
  const page = pathname.split("/admin/").pop();
  const title = getPageTitle(page);

  return (
    <div className="admin-navbar min-w-full h-16 backdrop-blur-md text-primary border-b flex items-center justify-between px-4">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />

        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="pr-8 text-small text-gray-600 font-mono uppercase">Admin</div>
    </div>
  );
};

export default AdminNav;
