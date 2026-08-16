import { Star, Wallet, CalendarCheck, MessageSquare } from "lucide-react";
import type { TechnicianStats } from "@/selector/technician.selector";

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="fixit-card flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-brand-light text-brand">
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted">{label}</p>
        <p className="truncate text-xl font-bold text-navy">{value}</p>
      </div>
    </div>
  );
}

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
      <StatCard
        icon={Wallet}
        label="Total earnings"
        value={formatEarnings(stats.totalEarnings)}
      />
      <StatCard
        icon={Star}
        label="Average rating"
        value={stats.averageRating.toFixed(1)}
      />
      <StatCard
        icon={CalendarCheck}
        label="Total bookings"
        value={stats.totalBookings}
      />
      <StatCard
        icon={MessageSquare}
        label="Total reviews"
        value={stats.totalReviews}
      />
    </section>
  );
}
