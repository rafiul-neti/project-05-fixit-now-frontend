import React from "react";
import { getCustomerBookings } from "../../_actions/getCustomerBooking";
import { Booking } from "@/lib/types/modules/booking/booking.types";
import HeaderServiceButton from "./HeaderServiceButton";
import BookingTable from "../BookingTable";

const RecentBookings = async () => {
  const bookings: Booking[] = await getCustomerBookings({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <div className="">
      <h2 className="pb-4 text-2xl font-semibold tracking-tight">
        Recent Bookings
      </h2>

      {bookings.length ? (
        <BookingTable
          bookings={bookings.slice(0, 5)}
          caption="A list of your recent bookings."
        />
      ) : (
        <div className="flex flex-col gap-4 items-center rounded-xl border border-border bg-card p-5 shadow-xs transition-shadow hover:shadow-md">
          <h3 className="text-xl font-semibold tracking-tight">
            No Recent bookings
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Need something fixed? Find a technician and book a service.
          </p>

          <HeaderServiceButton />
        </div>
      )}
    </div>
  );
};

export default RecentBookings;
