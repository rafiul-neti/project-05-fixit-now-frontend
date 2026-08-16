import { Star } from "lucide-react";
import type {
  TechnicianBooking,
} from "@/lib/types/modules/technician/technician.types";
import { PAYMENT_STATUS_CONFIG } from "@/app/(dashboard)/dashboard/customer/_utils";
import { PaymentStatus } from "@/lib/types/enum";

function PaymentStatusBadge({ status }: { status: PaymentStatus | null }) {
  if (!status) {
    return (
      <span className="fixit-badge status-warning" style={{ border: "none" }}>
        No payment yet
      </span>
    );
  }
  const config = PAYMENT_STATUS_CONFIG[status];
  return (
    <span
      className={`fixit-badge ${config.className}`}
      style={{ border: "none" }}
    >
      {config.label}
    </span>
  );
}

function ReviewStars({ givenStars }: { givenStars: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${givenStars} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < givenStars
              ? "fill-(--warning) text-(--warning)"
              : "text-border"
          }
        />
      ))}
    </div>
  );
}

function formatCompletedAt(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function RecentActivityRow({ booking }: { booking: TechnicianBooking }) {
  return (
    <div className="fixit-card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-semibold text-navy">{booking.service.name}</p>
        <p className="mt-1 text-sm text-secondary">
          {formatCompletedAt(booking.completedAt)}
        </p>
        {booking.review ? (
          <div className="mt-2 flex items-center gap-2">
            <ReviewStars givenStars={booking.review.givenStars} />
            {booking.review.content && (
              <p className="truncate text-sm text-secondary">
                &ldquo;{booking.review.content}&rdquo;
              </p>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted">No review yet</p>
        )}
      </div>

      <div className="flex flex-none items-center gap-3 sm:flex-col sm:items-end">
        <PaymentStatusBadge status={booking.payment?.status ?? null} />
        {booking.totalPrice && (
          <p className="text-sm font-semibold text-navy">
            ৳{Number(booking.totalPrice).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

export function RecentActivityList({
  recentActivity,
}: {
  recentActivity: TechnicianBooking[];
}) {
  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-navy">Recent activity</h2>

      {recentActivity.length === 0 ? (
        <div className="fixit-card p-6 text-center text-sm text-secondary">
          No completed jobs yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {recentActivity.map((booking) => (
            <RecentActivityRow key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </section>
  );
}
