"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";
import { USER_ROLE } from "@/lib/types/enum";

function getCurrentPageLabel(pathname: string, role: USER_ROLE): string | null {
  let navItems;
  if (role === USER_ROLE.Customer) navItems = sidebarMenuItems.CUSTOMER;
  else if (role === USER_ROLE.Technician)
    navItems = sidebarMenuItems.TECHNICIAN;
  else if (role === USER_ROLE.Admin) navItems = sidebarMenuItems.ADMIN;
  else return null;

  // Match the longest href that prefixes the current path, so nested/
  // dynamic routes (e.g. .../my-bookings/[bookingId]) still resolve to
  // their parent section's label.
  const match = navItems
    .filter((item) => pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return match?.label ?? null;
}

export function DashboardTopBar({ role }: { role: USER_ROLE }) {
  const pathname = usePathname();
  const pageLabel = getCurrentPageLabel(pathname, role);

  return (
    <div className="sticky top-16 z-10 flex items-center gap-3 border-b border-sidebar-border bg-background p-2">
      <SidebarTrigger />
      <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
        Menu
      </span>
      {pageLabel && (
        <>
          <span className="hidden text-border sm:inline">/</span>
          <span className="text-sm font-semibold text-foreground">
            {pageLabel}
          </span>
        </>
      )}
    </div>
  );
}
