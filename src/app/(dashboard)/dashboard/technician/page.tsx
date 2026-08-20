import { returnTechnicianDashboardHomepageData } from "@/actions/modules/dashboard/technician/getTechnicianDetailsForDashboardHome";
import {
  computeTechnicianStats,
  getRecentActivity,
} from "@/selector/technician.selector";
import { ProfileCard } from "@/components/modules/dashboard/technician/home/ProfileCard";
import { AvailabilityCard } from "@/components/modules/dashboard/technician/home/AvailabilityCard";
import { StatsRow } from "@/components/modules/dashboard/technician/home/StatsRow";
import { RecentActivityList } from "@/components/modules/dashboard/technician/home/RecentActivityList";
import TechnicianDashboardSections from "@/components/modules/dashboard/technician/home/TechnicianDashboardSections";

export default async function TechnicianDashboardHomePage() {
  const result = await returnTechnicianDashboardHomepageData();

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-(--background-secondary) py-10">
        <div className="fixit-container">
          <div className="fixit-card p-8 text-center text-sm text-secondary">
            {result.message ?? "Couldn't load the dashboard. Please try again."}
          </div>
        </div>
      </div>
    );
  }

  const { data } = result;

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

        {/* 4. Dashboard sections: In progress bookings, requested bookings, and upcoming bookings*/}
        <TechnicianDashboardSections initialBookings={data.bookings} />

        {/* 5. Recent activity */}
        <RecentActivityList recentActivity={recentActivity} />
      </div>
    </div>
  );
}
