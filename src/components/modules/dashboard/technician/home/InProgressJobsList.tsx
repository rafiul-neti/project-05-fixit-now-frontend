"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";
import type { TechnicianBooking } from "@/lib/types/modules/technician/technician.types";
import { BookingStatus } from "@/lib/types/enum";
import { handleBookingStatus } from "@/actions/modules/dashboard/technician/handleBookingStatus";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";

function formatStartedAt(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatElapsed(startedAt: string) {
  const ms = Date.now() - new Date(startedAt).getTime();
  const totalMinutes = Math.max(0, Math.floor(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function InProgressJobRow({
  booking,
  onStatusChange,
}: {
  booking: TechnicianBooking;
  onStatusChange: (bookingId: string, newStatus: BookingStatus) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMarkComplete(
    statusCompleted: { status: "COMPLETED" },
    id: string,
  ) {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await handleBookingStatus(statusCompleted, id);

      if (!result?.success) {
        toast.add({
          type: "error",
          description:
            result?.message ?? "Couldn't change the status! Please try again.",
        });

        setIsSubmitting(false);
        return;
      }

      toast.add({
        type: "success",
        description: `Booking '${statusCompleted.status}`,
      });

      setIsSubmitting(false);

      onStatusChange(id, statusCompleted.status);
    } catch (error) {
      console.error(error, "Error from In Progress Job Row Component!");
      setIsSubmitting(false);
      toast.add({
        type: "error",
        description: "Couldn't change the status! Please try again.",
      });
    }
  }

  return (
    <div className="fixit-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-2 w-2 flex-none rounded-full bg-(--success)" />
        <p className="text-sm font-semibold text-navy">In progress</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-semibold text-navy">{booking.service.name}</p>
          {booking.startedAt && (
            <>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-secondary">
                <PlayCircle size={14} />
                Started {formatStartedAt(booking.startedAt)}
              </p>
              <p className="mt-1 text-sm font-medium text-brand">
                {formatElapsed(booking.startedAt)} elapsed
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            handleMarkComplete({ status: BookingStatus.COMPLETED }, booking.id)
          }
          disabled={isSubmitting}
          className="btn-primary flex-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? <Spinner /> : "Mark as complete"}
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

export function InProgressJobsList({
  inProgressBookings,
  onStatusChange,
}: {
  inProgressBookings: TechnicianBooking[];
  onStatusChange: (bookingId: string, newStatus: BookingStatus) => void;
}) {
  if (inProgressBookings.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-navy">
        Jobs in progress
        <span className="ml-2 text-sm font-medium text-muted">
          ({inProgressBookings.length})
        </span>
      </h2>
      {inProgressBookings.length ? (
        <div className="flex flex-col gap-3">
          {inProgressBookings.map((booking) => (
            <InProgressJobRow
              key={booking.id}
              booking={booking}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="fixit-card p-6 text-center text-sm text-secondary">
          Currently no job is in progress.
        </div>
      )}
    </section>
  );
}
