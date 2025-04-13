"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

function SidebarItem({ path, name, isActive }) {
  return (
    <SidebarMenuItem>
      <Link href={path}>
        <SidebarMenuButton className="h-16 text-xl" isActive={isActive}>
          {name}
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center justify-between px-4 py-2 border-b mb-[40%]">
        <div className="flex items-center gap-2">
          <Link href="/app">
            <h1 className="text-2xl font-bold">Student Traffic</h1>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between h-full">
        <SidebarMenu>
          <SidebarItem
            path="/app/laundry"
            name="Pralnia / Suszarnia"
            isActive={pathname === "/app/laundry"}
          />
          <SidebarItem
            path="/app/events"
            name="Eventy"
            isActive={pathname === "/app/events"}
          />
          <SidebarItem
            path="/app/food"
            name="Oddaj Żywność"
            isActive={pathname === "/app/food"}
          />
          <SidebarItem
            path="/app/report"
            name="Zgłoś awarię"
            isActive={pathname === "/app/report"}
          />
        </SidebarMenu>
        <SidebarFooter>
          <Link href="/logout">
            <SidebarMenuButton className="h-16 text-xl" >
              Wyloguj się
            </SidebarMenuButton>
          </Link>
        </SidebarFooter>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
