import { House, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type SidebarItems = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const CUSTOMER_SIDEBAR_ITEMS: SidebarItems[] = [
  {
    label: "Dashboard",
    href: "/dashboard/customer",
    icon: House,
  },
  {
    label: "Book a Service",
    href: "/dashboard/services",
    icon: House,
  },
  {
    label: "My Bookings",
    href: "/dashboard/customer/my-bookings",
    icon: House,
  },
  {
    label: "Payments",
    href: "/dashboard/customer/payments",
    icon: House,
  },
];

const TECHNICIAN_SIDEBAR_ITEMS: SidebarItems[] = [
  {
    label: "Dashboard",
    href: "/dashboard/technician",
    icon: House,
  },
  {
    label: "My Services",
    href: "/dashboard/technician/my-services",
    icon: House,
  },
  {
    label: "Availability",
    href: "/dashboard/technician/set-availability",
    icon: House,
  },
  {
    label: "Bookings",
    href: "/dashboard/technician/view-incoming-bookings",
    icon: House,
  },
];

const ADMIN_SIDEBAR_ITEMS: SidebarItems[] = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: House,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/manage-users",
    icon: House,
  },
  {
    label: "Bookings",
    href: "/dashboard/admin/all-bookings",
    icon: House,
  },
  {
    label: "Categories",
    href: "/dashboard/admin/all-categories",
    icon: House,
  },
];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  TECHNICIAN: TECHNICIAN_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
