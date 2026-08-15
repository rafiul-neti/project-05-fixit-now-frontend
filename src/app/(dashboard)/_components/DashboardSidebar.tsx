"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItems, sidebarMenuItems } from "../_config/sidebarMenuItems";
import { USER_ROLE } from "@/lib/types/enum";

export default function DashboardSidebar({ role }: { role: USER_ROLE }) {
  const pathname = usePathname();

  let navItems: SidebarItems[] = [];

  if (role === USER_ROLE.Customer) {
    navItems = sidebarMenuItems.CUSTOMER;
  } else if (role === USER_ROLE.Technician) {
    navItems = sidebarMenuItems.TECHNICIAN;
  } else if (role === USER_ROLE.Admin) {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <Sidebar
      collapsible="icon"
      className="top-16 h-[calc(100svh-4rem)] border-r border-sidebar-border"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
