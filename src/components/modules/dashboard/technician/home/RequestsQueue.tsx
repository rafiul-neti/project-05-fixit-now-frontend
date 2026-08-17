"use client";

import { Clock } from "lucide-react";
import type { TechnicianBooking } from "@/lib/types/modules/technician/technician.types";
import { BookingStatus } from "@/lib/types/enum";
import { formatDateTime } from "@/app/(dashboard)/dashboard/customer/_utils";
import { useBookingStatusAction } from "@/hooks/useBookingStatusAction";
import { DeclineBookingButton } from "../DeclineBookingButton";
import { AcceptBookingButton } from "../AcceptBookingButton";

export function getButtonState(status: BookingStatus) {
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

function BookingRequestCard({
  booking,
  onStatusChange,
}: {
  booking: TechnicianBooking;
  onStatusChange: (bookingId: string, newStatus: BookingStatus) => void;
}) {
  const { acceptDisabled, declineDisabled } = getButtonState(booking.status);
  const { accept, decline, isAccepting, isDeclining, isBusy, error } =
    useBookingStatusAction(booking.id, onStatusChange);

  return (
    <div className="fixit-card">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-semibold text-navy">{booking.service.name}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-secondary">
            <Clock size={14} />
            Requested {formatDateTime(booking.createdAt)}
          </p>
        </div>

        <div className="flex flex-none gap-2">
          <DeclineBookingButton
            onClick={decline}
            disabled={declineDisabled || isBusy}
            isLoading={isDeclining}
          />
          <AcceptBookingButton
            onClick={accept}
            disabled={acceptDisabled || isBusy}
            isLoading={isAccepting}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between px-5 pb-5 text-center">
          <p className="rounded-md bg-(--error-light) px-3 py-2 text-sm text-(--error)">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export function RequestsQueue({
  requestedBookings,
  onStatusChange,
}: {
  requestedBookings: TechnicianBooking[];
  onStatusChange: (bookingId: string, newStatus: BookingStatus) => void;
}) {
  if (requestedBookings.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-navy">
        New requests
        <span className="ml-2 text-sm font-medium text-muted">
          ({requestedBookings.length})
        </span>
      </h2>
      <div className="flex flex-col gap-3">
        {requestedBookings.map((booking) => (
          <BookingRequestCard
            key={booking.id}
            booking={booking}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </section>
  );
}
