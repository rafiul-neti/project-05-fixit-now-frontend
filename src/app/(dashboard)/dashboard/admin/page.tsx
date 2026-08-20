import { getAdminDashboardStats } from "@/actions/modules/dashboard/admin/getAdminDasboardStats";
import { AdminStatsRow } from "@/components/modules/dashboard/admin/AdminStatsRow";
import { RecentBookingsList } from "@/components/modules/dashboard/admin/RecentBookingsList";

export default async function AdminDashboardPage() {
  const result = await getAdminDashboardStats();

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

  const { stats, recentBookings } = result.data;

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container flex flex-col gap-6">
        <div>
          <h1 className="heading-secondary">Admin overview</h1>
          <p className="mt-1 text-sm text-secondary">
            Platform activity at a glance.
          </p>
        </div>

        <AdminStatsRow stats={stats} />
        <RecentBookingsList bookings={recentBookings} />
      </div>
    </div>
  );
}
