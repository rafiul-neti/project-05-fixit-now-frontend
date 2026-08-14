import {
  House,
  CalendarPlus,
  ClipboardList,
  CreditCard,
  BriefcaseBusiness,
  Clock3,
  CalendarCheck,
  Users,
  Tags,
  LucideProps,
} from "lucide-react";
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
    href: "/dashboard/customer/services",
    icon: CalendarPlus,
  },
  {
    label: "My Bookings",
    href: "/dashboard/customer/my-bookings",
    icon: ClipboardList,
  },
  {
    label: "Payments",
    href: "/dashboard/customer/payments",
    icon: CreditCard,
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
    icon: BriefcaseBusiness,
  },
  {
    label: "Availability",
    href: "/dashboard/technician/set-availability",
    icon: Clock3,
  },
  {
    label: "Bookings",
    href: "/dashboard/technician/view-incoming-bookings",
    icon: CalendarCheck,
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
    icon: Users,
  },
  {
    label: "Bookings",
    href: "/dashboard/admin/all-bookings",
    icon: ClipboardList,
  },
  {
    label: "Categories",
    href: "/dashboard/admin/all-categories",
    icon: Tags,
  },
];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  TECHNICIAN: TECHNICIAN_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
