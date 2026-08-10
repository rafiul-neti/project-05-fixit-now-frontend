import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import React from "react";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <>
      <section>
        <Navbar user={user} />
      </section>
      <main>{children}</main>
    </>
  );
};

export default PublicLayout;
