import React from "react";
import { getCustomerBookings } from "../../_actions/getCustomerBooking";
import { BookingStatus } from "@/lib/types/enum";
import { Booking } from "@/lib/types/modules/booking/booking.types";
import { CalendarClock, CircleCheck, Wrench } from "lucide-react";
import QuickOverviewCards from "./QuickOverviewCards";

const UpcomingCustomerBookings = async () => {
  const bookings: Booking[] = await getCustomerBookings();
  const upcomingBookings = bookings.filter(
    (booking: Booking) =>
      booking.status === BookingStatus.REQUESTED && !booking.startedAt,
  );

  const activeServices = bookings.filter(
    (booking: Booking) =>
      booking.status === BookingStatus.ACCEPTED ||
      booking.status === BookingStatus.IN_PROGRESS ||
      booking.status === BookingStatus.PAID,
  );

  const completedServices = bookings.filter(
    (booking: Booking) => booking.status === BookingStatus.COMPLETED,
  );

  return (
    <>
      <QuickOverviewCards
        title="Upcoming Bookings"
        count={upcomingBookings.length}
        icon={CalendarClock}
        subtitile="Scheduled services waiting for you"
      />

      <QuickOverviewCards
        title="Active Services"
        count={activeServices.length}
        icon={Wrench}
        subtitile="Services currently in progress"
      />

      <QuickOverviewCards
        title="Completed Services"
        count={completedServices.length}
        icon={CircleCheck}
        subtitile="Successfully completed services"
      />
    </>
  );
};

export default UpcomingCustomerBookings;
