import { formatDateTime } from "@/app/(dashboard)/dashboard/customer/_utils";
import type { AdminRecentBooking } from "@/lib/types/modules/admin/admin.types";

const STATUS_BADGE_CLASS: Record<AdminRecentBooking["status"], string> = {
  REQUESTED: "status-warning",
  ACCEPTED: "status-info",
  IN_PROGRESS: "status-info",
  COMPLETED: "status-success",
  DECLINED: "status-error",
};

function RecentBookingRow({ booking }: { booking: AdminRecentBooking }) {
  return (
    <div className="fixit-card flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-semibold text-navy">{booking.service.name}</p>
        <p className="mt-1 text-sm text-secondary">
          {booking.user.name} &middot; {booking.technician.user.name}
        </p>
        <p className="mt-1 text-xs text-muted">
          {formatDateTime(booking.createdAt)}
        </p>
      </div>
      <span
        className={`fixit-badge ${STATUS_BADGE_CLASS[booking.status]}`}
        style={{ border: "none" }}
      >
        {booking.status}
      </span>
    </div>
  );
}

export function RecentBookingsList({
  bookings,
}: {
  bookings: AdminRecentBooking[];
}) {
  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-navy">Recent bookings</h2>

      {bookings.length === 0 ? (
        <div className="fixit-card p-6 text-center text-sm text-secondary">
          No bookings yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((booking) => (
            <RecentBookingRow key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </section>
  );
}
