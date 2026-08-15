"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LayoutDashboard, LogOut, Menu, Settings, User } from "lucide-react";
import { logout } from "@/service/logout";
import { toast } from "@/components/ui/toast";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { USER_ROLE } from "@/lib/types/enum";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface UserDropdownItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isDangerous?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "Contact", href: "/contact" },
];

const userMenuItems: UserDropdownItem[] = [
  { label: "Profile", icon: <User className="w-4 h-4" /> },
  { label: "Settings", icon: <Settings className="w-4 h-4" /> },
  { label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  {
    label: "Logout",
    icon: <LogOut className="w-4 h-4" />,
    isDangerous: true,
    onClick: async () => {
      await logout();
      // set();
    },
  },
];

type TUser = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    activeStatus: string;
    role: USER_ROLE;
    createdAt: Date;
    updatedAt: Date;
    technician?: {
      id: string;
      profilePhoto?: string;
      bio?: string;
      experienceYears: 10;
      hourlyRate: 900;
      serviceAreas: string[];
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type NavbarProps = { user: TUser };

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleMenuItemClick = (item: UserDropdownItem) => {
    if (item.label === "Logout" && item.onClick) {
      item.onClick();
      toast.add({
        type: "success",
        description: "User logged out successfully.",
      });
      router.push("/login");
    } else {
      switch (item.label) {
        case "Dashboard":
          router.push(`/dashboard/${user.data.role.toLowerCase()}`);
          break;
      }
    }
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-background/95">
      <div className="mx-auto lg:w-[calc(100%-2rem)] max-w-7xl">
        <div className="flex items-center justify-between h-16 p-1.5 lg:p-0">
          <div className="flex items-center">
            {/* Mobile Nav Trigger */}
            <div className="md:hidden">
              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger
                  render={<Button variant="ghost" size="icon-lg" />}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetHeader className="border-b border-border">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                    <SheetDescription className="sr-only">
                      Site navigation
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col gap-1 p-4">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileNavOpen(false)}
                          className={cn(
                            "px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                            isActive && "bg-muted text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <div className="">
              <Link
                href="/"
                className="text-xl font-bold text-foreground flex items-center"
              >
                <Image
                  src={`/fixit_now_logo.webp`}
                  width={50}
                  height={50}
                  alt="FixItNow - Home Services at Your Doorstep"
                />
                <h3 className="hidden lg:block">FixitNow</h3>
              </Link>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                    isActive && "bg-muted text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Dropdown */}
          {user.success ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-semibold text-foreground">
                      {user.data?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.data?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />

                  {userMenuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      onClick={() => handleMenuItemClick(item)}
                      className={item.isDangerous ? "text-destructive" : ""}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="">
              <Link href={"/register"} className="m-1">
                <Button className={`rounded-sm bg-[#062b52]`} size={`lg`}>
                  Sign Up
                </Button>
              </Link>

              <Link href={"/login"}>
                <Button
                  className="rounded-sm bg-(--color-primary-hover)"
                  size={`lg`}
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
