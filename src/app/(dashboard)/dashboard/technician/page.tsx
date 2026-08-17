import { returnTechnicianDashboardHomepageData } from "@/actions/modules/dashboard/technician/getTechnicianDetailsForDashboardHome";
import {
  computeTechnicianStats,
  getInProgressBookings,
  getRecentActivity,
  getRequestedBookings,
  getUpcomingBookings,
} from "@/selector/technician.selector";
import { ProfileCard } from "@/components/modules/dashboard/technician/home/ProfileCard";
import { AvailabilityCard } from "@/components/modules/dashboard/technician/home/AvailabilityCard";
import { StatsRow } from "@/components/modules/dashboard/technician/home/StatsRow";
import { RequestsQueue } from "@/components/modules/dashboard/technician/home/RequestsQueue";
import { InProgressJobsList} from "@/components/modules/dashboard/technician/home/InProgressJobsList";
import { UpcomingBookingsList } from "@/components/modules/dashboard/technician/home/UpcomingBookingsList";
import { RecentActivityList } from "@/components/modules/dashboard/technician/home/RecentActivityList";

export default async function TechnicianDashboardHomePage() {
  const data = await returnTechnicianDashboardHomepageData();

  const requestedBookings = getRequestedBookings(data.bookings);
  const inProgressBookings = getInProgressBookings(data.bookings);
  const upcomingBookings = getUpcomingBookings(data.bookings);
  const recentActivity = getRecentActivity(data.bookings);
  const stats = computeTechnicianStats(data);

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container flex flex-col gap-6">
        {/* 1. Profile card */}
        <section className="fixit-card p-6">
          <ProfileCard data={data} />
        </section>

        {/* 2. Availability card */}
        <section className="fixit-card p-6">
          <AvailabilityCard availability={data.availability} />
        </section>

        {/* 3. Stats row */}
        <section>
          <StatsRow stats={stats} />
        </section>

        {/* 4. Requests queue*/}
        <RequestsQueue requestedBookings={requestedBookings} />

        {/* 5. In-progress job card */}
        <InProgressJobsList inProgressBookings={inProgressBookings} />

        {/* 6. Upcoming bookings*/}
        <UpcomingBookingsList upcomingBookings={upcomingBookings} />

        {/* 7. Recent activity */}
        <RecentActivityList recentActivity={recentActivity} />
      </div>
    </div>
  );
}
