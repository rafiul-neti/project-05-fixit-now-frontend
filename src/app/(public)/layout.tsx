import React from "react";
import Footer from "./_components/Footer";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section>{children}</section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default PublicLayout;
