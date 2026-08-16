import React from "react";

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="fixit-card p-6">
      <h2 className="mb-5 text-base font-bold text-navy">{title}</h2>
      {children}
    </section>
  );
}
