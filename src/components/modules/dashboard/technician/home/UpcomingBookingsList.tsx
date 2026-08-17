"use client";

import { Calendar } from "lucide-react";
import type { TechnicianBooking } from "@/lib/types/modules/technician/technician.types";
import { handleBookingStatus } from "@/actions/modules/dashboard/technician/handleBookingStatus";
import { toast } from "@/components/ui/toast";
import { BookingStatus } from "@/lib/types/enum";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

function formatScheduled(booking: TechnicianBooking) {
  const iso = booking.startedAt ?? booking.createdAt;
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function UpcomingBookingRow({
  booking,
  onStatusChange,
}: {
  booking: TechnicianBooking;
  onStatusChange: (bookingId: string) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleInProgress(
    inProgressStatus: { status: "IN_PROGRESS" },
    bookingId: string,
  ) {
    setIsSubmitting(true);
    setError(null);

    try {
      await handleBookingStatus(inProgressStatus, bookingId);
      toast.add({
        type: "success",
        description: `Booking '${inProgressStatus.status}`,
      });

      setIsSubmitting(false);

      onStatusChange(bookingId);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again!",
      );
    }
  }

  return (
    <div className="fixit-card">
      <div className="flex items-center justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="font-semibold text-navy">{booking.service.name}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-secondary">
            <Calendar size={14} />
            {formatScheduled(booking)}
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            handleInProgress({ status: BookingStatus.IN_PROGRESS }, booking.id)
          }
          disabled={isSubmitting}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? <Spinner /> : "Start Job"}
        </button>
      </div>

      {error && (
        <div className="flex items-center justify-between text-center">
          <p className="rounded-md bg-(--error-light) px-3 py-2 text-sm text-(--error)">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export function UpcomingBookingsList({
  upcomingBookings,
}: {
  upcomingBookings: TechnicianBooking[];
}) {
  const [bookings, setBookings] = useState(upcomingBookings);

  function handleStatusChange(bookingId: string) {
    setBookings((current) => current.filter((b) => b.id !== bookingId));
  }

  if (bookings.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-navy">
        Upcoming bookings
        {bookings.length > 0 && (
          <span className="ml-2 text-sm font-medium text-muted">
            ({upcomingBookings.length})
          </span>
        )}
      </h2>

      {bookings.length === 0 ? (
        <div className="fixit-card p-6 text-center text-sm text-secondary">
          No upcoming bookings right now.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((booking) => (
            <UpcomingBookingRow
              key={booking.id}
              booking={booking}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}
