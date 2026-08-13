"use client";

import Link from "next/link";
import React from "react";

const CancelBookingButton = ({ boookingId }: { boookingId: string }) => {
  return (
    <Link
      href={`dashboard/customer/bookings/${boookingId}`}
      className="text-(--error) px-2 py-0.5 rounded outline outline-(--error)"
    >
      Cancel Booking
    </Link>
  );
};

export default CancelBookingButton;
