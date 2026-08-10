import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import React from "react";
import Footer from "./_components/Footer";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <>
      <section>
        <Navbar user={user} />
      </section>
      <main>{children}</main>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default PublicLayout;
