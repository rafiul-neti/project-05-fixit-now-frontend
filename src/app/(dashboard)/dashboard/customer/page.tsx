import React from "react";
import HeaderServiceButton from "./_components/_home/HeaderServiceButton";
import { getMe } from "@/service/getMe";
import UpcomingCustomerBookings from "./_components/_home/BookingOverviews";
import ReviewsQuickOverview from "./_components/_home/ReviewsQuickOverview";
import UpcomingBookingSection from "./_components/_home/UpcomingBooking";

const CustomerDashboardPage = async () => {
  const user = await getMe();
  return (
    <section className="w-full p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">
            Good Morning, <span>{user.data.name}</span> 👋
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            What do you need help with today?
          </p>
        </div>
        <HeaderServiceButton />
      </div>

      {/* quick overview */}
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <UpcomingCustomerBookings />
        <ReviewsQuickOverview />
      </div>

      {/* Upcoming Booking */}
      <UpcomingBookingSection />
    </section>
  );
};

export default CustomerDashboardPage;
