import { Star, Wallet, CalendarCheck, MessageSquare } from "lucide-react";
import type { TechnicianStats } from "@/selector/technician.selector";
import { DashboardStatCard } from "@/components/shared/DashboardStatCard";

function formatEarnings(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function StatsRow({ stats }: { stats: TechnicianStats }) {
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <DashboardStatCard
        icon={Wallet}
        label="Total earnings"
        value={formatEarnings(stats.totalEarnings)}
      />
      <DashboardStatCard
        icon={Star}
        label="Average rating"
        value={stats.averageRating.toFixed(1)}
      />
      <DashboardStatCard
        icon={CalendarCheck}
        label="Total bookings"
        value={stats.totalBookings}
      />
      <DashboardStatCard
        icon={MessageSquare}
        label="Total reviews"
        value={stats.totalReviews}
      />
    </section>
  );
}
