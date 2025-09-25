"use client";

// import * as React from "react";
import {
  IconSettings,
} from "@tabler/icons-react";

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
import { getProfileAction } from "@/actions/profiles";
import { useEffect, useState } from "react";
import { adminNavLinks } from "@/lib/admin/dummy-data";

const data = {
  user: {
    name: "Nyla Harper",
    email: "nyla@virstravelclub.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: adminNavLinks,
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: IconCamera,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: IconFileDescription,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: IconFileAi,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
  // documents: [
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  // ],
};

export function AppSidebar({ ...props }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { profile } = await getProfileAction();
      const initials = profile?.full_name
        .split(" ")
        .map((n) => n[0])
        .join("");
      // console.log("initials:::", initials);
      setUser(() => {
        return {
          name: profile?.full_name,
          email: profile?.email,
          avatar: profile?.avatar_url || "",
          initials: initials,
        };
      });
    };
    fetchUser();
  }, []);
  // console.log("user state:::", user);
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
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
