"use client";

import Link from "next/link";
import React from "react";

const ViewBookingButton = ({ boookingId }: { boookingId: string }) => {
  return (
    <Link
      href={`/dashboard/customer/my-bookings/${boookingId}`}
      className="bg-(--color-primary) text-white px-2 py-1 rounded"
    >
      View Details
    </Link>
  );
};

export default ViewBookingButton;
