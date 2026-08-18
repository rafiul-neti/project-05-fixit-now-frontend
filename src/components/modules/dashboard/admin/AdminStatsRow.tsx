import { Users, CalendarCheck, Wallet, Star } from "lucide-react";
import type { AdminDashboardStats } from "@/lib/types/modules/admin/admin.types";
import { DashboardStatCard } from "@/components/shared/DashboardStatCard";
import { formatNaNCurrency } from "@/app/(dashboard)/dashboard/customer/_utils";

export function AdminStatsRow({ stats }: { stats: AdminDashboardStats }) {
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <DashboardStatCard
        icon={Users}
        label="Total users"
        value={stats.totalUsers}
      />
      <DashboardStatCard
        icon={CalendarCheck}
        label="Total bookings"
        value={stats.totalBookings}
      />
      <DashboardStatCard
        icon={Wallet}
        label="Total revenue"
        value={formatNaNCurrency(stats.totalRevenue)}
      />
      <DashboardStatCard
        icon={Star}
        label="Average rating"
        value={stats.averageRating.toFixed(1)}
      />
    </section>
  );
}
