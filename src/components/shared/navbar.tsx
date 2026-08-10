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
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import { logout } from "@/service/logout";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    role: string;
    createdAt: Date;
    updatedAt: Date;
    profile: {
      id: string;
      profilePhoto?: string;
      bio?: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

export type NavbarProps = { user: TUser };

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

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
          router.push("/dashboard");
      }
    }
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl">
        <div className="flex items-center justify-between h-16">
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
              <h3>FixitNow</h3>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
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
