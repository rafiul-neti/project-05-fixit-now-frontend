"use client";

import { useState } from "react";
import { InProgressJobsList } from "./InProgressJobsList";
import { RequestsQueue } from "./RequestsQueue";
import { UpcomingBookingsList } from "./UpcomingBookingsList";
import {
  getInProgressBookings,
  getRequestedBookings,
  getUpcomingBookings,
} from "@/selector/technician.selector";
import { BookingStatus } from "@/lib/types/enum";
import { TechnicianBooking } from "@/lib/types/modules/technician/technician.types";

function TechnicianDashboardSections({
  initialBookings,
}: {
  initialBookings: TechnicianBooking[];
}) {
  const [bookings, setBookings] = useState(initialBookings);

  const requestedBookings = getRequestedBookings(bookings);
  const inProgressBookings = getInProgressBookings(bookings);
  const upcomingBookings = getUpcomingBookings(bookings);

  function updateBookingStatus(bookingId: string, newStatus: BookingStatus) {
    setBookings((current) =>
      current.map((b) =>
        b.id === bookingId ? { ...b, status: newStatus } : b,
      ),
    );
  }

  return (
    <>
      <RequestsQueue
        requestedBookings={requestedBookings}
        onStatusChange={updateBookingStatus}
      />

      <InProgressJobsList
        inProgressBookings={inProgressBookings}
        onStatusChange={updateBookingStatus}
      />
      
      <UpcomingBookingsList
        upcomingBookings={upcomingBookings}
        onStatusChange={updateBookingStatus}
      />
    </>
  );
}

export default TechnicianDashboardSections;
