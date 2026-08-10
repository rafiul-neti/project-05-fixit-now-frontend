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
      <main className="mx-auto w-[calc(100%-2rem)] max-w-7xl">{children}</main>
    </>
  );
};

export default PublicLayout;
