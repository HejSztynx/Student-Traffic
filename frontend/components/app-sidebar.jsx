"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Pralnia / Suszarnia",
          url: "/laundry",
        },
        {
          title: "Eventy",
          url: "/events",
        },
        {
          title: "Oddaj Zywność",
          url: "/food",
        },
      ],
    },
  ],
};

function SidebarItem({ path, name, isActive }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-16" asChild isActive={isActive}>
        <Link className="text-xl" href={path}>
          {name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center justify-between px-4 py-2 border-b mb-[40%]">
        <div className="flex items-center gap-2">
          <Link href="/">
            <h1 className="text-2xl font-bold">Student Traffic</h1>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarItem
            path="/laundry"
            name="Pralnia / Suszarnia"
            isActive={pathname === "/laundry"}
          />
          <SidebarItem
            path="/events"
            name="Eventy"
            isActive={pathname === "/events"}
          />
          <SidebarItem
            path="/food"
            name="Oddaj Żywność"
            isActive={pathname === "/food"}
          />
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
