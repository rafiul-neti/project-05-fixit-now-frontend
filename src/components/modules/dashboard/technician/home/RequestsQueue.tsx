"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import type { TechnicianBooking } from "@/lib/types/modules/technician/technician.types";
import { BookingStatus } from "@/lib/types/enum";
import { formatDateTime } from "@/app/(dashboard)/dashboard/customer/_utils";

function getButtonState(status: BookingStatus) {
  switch (status) {
    case "REQUESTED":
      return { acceptDisabled: false, declineDisabled: false };
    case "ACCEPTED":
      return { acceptDisabled: true, declineDisabled: false };
    case "IN_PROGRESS":
      return { acceptDisabled: true, declineDisabled: true };
    default:
      return { acceptDisabled: true, declineDisabled: true };
  }
}

function BookingRequestCard({ booking }: { booking: TechnicianBooking }) {
  const { acceptDisabled, declineDisabled } = getButtonState(booking.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleAccept() {
    setIsSubmitting(true);
    // TODO: call accept-booking action once confirmed, then setIsSubmitting(false)
  }

  function handleDecline() {
    setIsSubmitting(true);
    // TODO: call decline-booking action once confirmed, then setIsSubmitting(false)
  }

  return (
    <div className="fixit-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-semibold text-navy">{booking.service.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-secondary">
          <Clock size={14} />
          Requested {formatDateTime(booking.createdAt)}
        </p>
      </div>

      <div className="flex flex-none gap-2">
        <button
          type="button"
          onClick={handleDecline}
          disabled={declineDisabled || isSubmitting}
          className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={handleAccept}
          disabled={acceptDisabled || isSubmitting}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export function RequestsQueue({
  requestedBookings,
}: {
  requestedBookings: TechnicianBooking[];
}) {
  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-navy">
        New requests
        <span className="ml-2 text-sm font-medium text-muted">
          ({requestedBookings.length})
        </span>
      </h2>
      {requestedBookings.length ? (
        <div className="flex flex-col gap-3">
          {requestedBookings.map((booking) => (
            <BookingRequestCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="fixit-card p-6 text-center text-sm text-secondary">
          No new request.
        </div>
      )}
    </section>
  );
}
