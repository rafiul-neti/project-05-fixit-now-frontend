import { Calendar } from "lucide-react";
import type { TechnicianBooking } from "@/lib/types/modules/technician/technician.types";

function formatScheduled(booking: TechnicianBooking) {
  const iso = booking.startedAt ?? booking.createdAt;
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function UpcomingBookingRow({ booking }: { booking: TechnicianBooking }) {
  return (
    <div className="fixit-card flex items-center justify-between gap-4 p-5">
      <div className="min-w-0">
        <p className="font-semibold text-navy">{booking.service.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-secondary">
          <Calendar size={14} />
          {formatScheduled(booking)}
        </p>
      </div>
      <span className="fixit-badge status-info" style={{ border: "none" }}>
        Accepted
      </span>
    </div>
  );
}

export function UpcomingBookingsList({
  upcomingBookings,
}: {
  upcomingBookings: TechnicianBooking[];
}) {
  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-navy">
        Upcoming bookings
        {upcomingBookings.length > 0 && (
          <span className="ml-2 text-sm font-medium text-muted">
            ({upcomingBookings.length})
          </span>
        )}
      </h2>

      {upcomingBookings.length === 0 ? (
        <div className="fixit-card p-6 text-center text-sm text-secondary">
          No upcoming bookings right now.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {upcomingBookings.map((booking) => (
            <UpcomingBookingRow key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </section>
  );
}
