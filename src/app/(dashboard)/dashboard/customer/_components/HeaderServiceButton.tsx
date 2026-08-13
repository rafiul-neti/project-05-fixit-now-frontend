"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HeaderServiceButton = () => {
  return (
    <Button className={`bg-(--color-primary)`}>
      <Link href={`/services`}>Book Service</Link>
    </Button>
  );
};

export default HeaderServiceButton;
