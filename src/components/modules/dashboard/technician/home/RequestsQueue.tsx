"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import type { TechnicianBooking } from "@/lib/types/modules/technician/technician.types";
import { BookingStatus } from "@/lib/types/enum";
import { formatDateTime } from "@/app/(dashboard)/dashboard/customer/_utils";
import { handleBookingStatus } from "@/actions/modules/dashboard/technician/handleBookingStatus";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";

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

function BookingRequestCard({
  booking,
  onStatusChange,
}: {
  booking: TechnicianBooking;
  onStatusChange: (bookingId: string) => void;
}) {
  const { acceptDisabled, declineDisabled } = getButtonState(booking.status);
  const [isAcceptSubmitting, setIsAcceptSubmitting] = useState(false);
  const [isDeclineSubmitting, setIsDeclineSubmitting] = useState(false);
  const [bookingStatusError, setBookingStatusError] = useState<string | null>(
    null,
  );

  async function handleAccept(acceptStatus: { status: "ACCEPTED" }) {
    setIsAcceptSubmitting(true);
    setBookingStatusError(null);
    try {
      await handleBookingStatus(acceptStatus, booking.id);

      toast.add({
        type: "success",
        description: `Booking '${acceptStatus.status}'.`,
      });
      setIsAcceptSubmitting(false);
      onStatusChange(booking.id);
    } catch (error) {
      setIsAcceptSubmitting(false);
      setBookingStatusError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  async function handleDecline(declineStatus: { status: "DECLINED" }) {
    setIsDeclineSubmitting(true);
    setBookingStatusError(null);
    try {
      await handleBookingStatus(declineStatus, booking.id);

      toast.add({
        type: "success",
        description: `Booking '${declineStatus.status}'.`,
      });
      setIsDeclineSubmitting(false);
      onStatusChange(booking.id);
    } catch (error) {
      setIsDeclineSubmitting(false);
      setBookingStatusError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className={`fixit-card`}>
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
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
            onClick={() => handleDecline({ status: BookingStatus.DECLINED })}
            disabled={declineDisabled || isDeclineSubmitting}
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeclineSubmitting ? <Spinner /> : "Decline"}
          </button>
          <button
            type="button"
            onClick={() => handleAccept({ status: BookingStatus.ACCEPTED })}
            disabled={acceptDisabled || isAcceptSubmitting}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAcceptSubmitting ? <Spinner /> : "Accept"}
          </button>
        </div>
      </div>

      {bookingStatusError && (
        <div className="flex items-center justify-between text-center">
          <p className="rounded-md bg-(--error-light) px-3 py-2 text-sm text-(--error)">
            {bookingStatusError}
          </p>
        </div>
      )}
    </div>
  );
}

export function RequestsQueue({
  requestedBookings,
}: {
  requestedBookings: TechnicianBooking[];
}) {
  const [bookings, setBookings] = useState(requestedBookings);

  function handleStatusChange(bookingId: string) {
    setBookings((current) => current.filter((b) => b.id !== bookingId));
  }

  if (bookings.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-navy">
        New requests
        <span className="ml-2 text-sm font-medium text-muted">
          ({bookings.length})
        </span>
      </h2>
      {requestedBookings.length ? (
        <div className="flex flex-col gap-3">
          {bookings.map((booking) => (
            <BookingRequestCard
              key={booking.id}
              booking={booking}
              onStatusChange={handleStatusChange}
            />
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
