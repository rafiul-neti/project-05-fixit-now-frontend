import React from "react";
import ViewBookingButton from "../ViewBookingButton";
import CancelBookingButton from "../CancelBookingButton";
import { Booking } from "@/lib/types/modules/booking/booking.types";
import { BookingStatus } from "@/lib/types/enum";
import { getCustomerBookings } from "../../_actions/getCustomerBooking";
import HeaderServiceButton from "./HeaderServiceButton";
import { CalendarDays, MapPin, UserRound } from "lucide-react";

const UpcomingBookingSection = async () => {
  const bookings: Booking[] = await getCustomerBookings();
  const upcomingBookings = bookings.filter(
    (booking: Booking) =>
      booking.status === BookingStatus.REQUESTED && !booking.startedAt,
  );

  return (
    <>
      {upcomingBookings.length ? (
        <div className="">
          <h2 className="pb-4 text-2xl font-semibold tracking-tight">
            Upcoming Booking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {upcomingBookings.map((b: Booking) => (
              <div
                key={b.id}
                className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md space-y-3.5"
              >
                <h4 className="text-lg font-semibold">{b.service.name}</h4>
                <div className="space-y-1.5">
                  <p className="flex items-center gap-1.5">
                    <UserRound /> Technician: {b.technician.user.name}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CalendarDays />
                    Date:{" "}
                    {b.startedAt
                      ? new Date(b.startedAt).toLocaleDateString()
                      : new Date(b.createdAt).toLocaleDateString()}
                  </p>

                  <p className="flex items-center gap-1.5">
                    <MapPin />
                    Location: {b.address.city}, {b.address.region}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <ViewBookingButton boookingId="{ boookingId }: { boookingId: string }" />
                  <CancelBookingButton boookingId="{ boookingId }: { boookingId: string }" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center rounded-xl border border-border bg-card p-5 shadow-xs transition-shadow hover:shadow-md">
          <h3 className="text-2xl font-semibold tracking-tight">
            No upcoming bookings
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Need something fixed? Find a technician and book a service.
          </p>

          <HeaderServiceButton />
        </div>
      )}
    </>
  );
};

export default UpcomingBookingSection;
