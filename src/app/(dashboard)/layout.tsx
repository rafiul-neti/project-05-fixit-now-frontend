import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  return (
    <>
      <section className="">
        <SidebarProvider>
          <div className="">
            <DashboardSidebar role={user.data.role} />
          </div>
          <main className="flex-1 min-w-0">{children}</main>
        </SidebarProvider>
      </section>
    </>
  );
};

export default DashboardLayout;
