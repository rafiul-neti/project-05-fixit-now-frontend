import React from "react";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="mx-auto w-[calc(100%-2rem)] max-w-7xl">
        {children}
      </section>
    </>
  );
};

export default PublicLayout;
