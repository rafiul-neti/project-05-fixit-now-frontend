import React from "react";
import HeaderServiceButton from "../_components/_home/HeaderServiceButton";
import BookingTable from "../_components/BookingTable";
import { getCustomerBookings } from "../_actions/getCustomerBooking";

const CustomerMyBookingsPage = async () => {
  const bookings = await getCustomerBookings();

  return (
    <section className="p-5">
      <h3 className="text-2xl font-semibold tracking-tight">My Bookings</h3>

      {bookings.length ? (
        <BookingTable
          bookings={bookings}
          caption="A list of your bookings."
        />
      ) : (
        <div className="flex flex-col gap-4 items-center rounded-xl border border-border bg-card p-5 shadow-xs transition-shadow hover:shadow-md">
          <h3 className="text-xl font-semibold tracking-tight">
            You have no bookings!
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Need something fixed? Find a technician and book a service.
          </p>

          <HeaderServiceButton />
        </div>
      )}
    </section>
  );
};

export default CustomerMyBookingsPage;
