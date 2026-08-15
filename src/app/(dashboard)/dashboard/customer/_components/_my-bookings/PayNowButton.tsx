"use client";

import { DollarSign } from "lucide-react";
import Link from "next/link";
import React from "react";

const PayNowButton = ({
  href,
  className,
}: {
  href: string;
  className: string;
}) => {
  return (
    <Link
      href={href}
      type="button"
      className={`${className}`}
      style={{ backgroundColor: "var(--success)" }}
    >
      <DollarSign size={16} />
      Pay now
    </Link>
  );
};

export default PayNowButton;
