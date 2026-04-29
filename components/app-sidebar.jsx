"use client";

import { useMemo } from "react";
import { IconSettings } from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./ui/logo";
import { useProfileContext } from "@/contexts/profile";
import { adminNavLinks } from "@/lib/admin/dummy-data";

const data = {
  navMain: adminNavLinks,
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { profile } = useProfileContext();

  const user = useMemo(() => {
    if (!profile) return null;

    const initials = profile.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    return {
      name: profile.full_name,
      email: profile.email,
      avatar: profile.avatar_url || "",
      initials: initials || "?",
    };
  }, [profile]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Logo href="/admin" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
