"use client";

import { useState } from "react";
import { MapPin, Phone, Tag, Clock } from "lucide-react";
import { formatDateTime } from "@/app/(dashboard)/dashboard/customer/_utils";
import { useBookingStatusAction } from "@/hooks/useBookingStatusAction";
import type { IncomingBooking } from "@/lib/types/modules/technician/technician.types";
import { DeclineBookingButton } from "../DeclineBookingButton";
import { AcceptBookingButton } from "../AcceptBookingButton";

function formatAddress(address: IncomingBooking["address"]) {
  const parts = [
    address.address_line_1,
    address.address_line_2,
    address.city,
    address.region,
    address.postCode,
  ].filter(Boolean);
  return parts.join(", ");
}

function IncomingBookingCard({
  booking,
  onStatusChange,
}: {
  booking: IncomingBooking;
  onStatusChange: (bookingId: string) => void;
}) {
  const { accept, decline, isAccepting, isDeclining, isBusy, error } =
    useBookingStatusAction(booking.id, (bookingId) =>
      onStatusChange(bookingId),
    );

  return (
    <div className="fixit-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-navy">{booking.service.name}</p>
            <span
              className="fixit-badge status-info"
              style={{ border: "none" }}
            >
              <Tag size={11} className="mr-1 inline" />
              {booking.service.category.name}
            </span>
          </div>
          <p className="mt-1 text-sm text-secondary">
            {booking.service.description}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
            <Clock size={14} />
            Requested {formatDateTime(booking.createdAt)}
          </p>
        </div>
      </div>

      <div className="fixit-divider my-4" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-muted">Customer</p>
          <p className="text-sm font-semibold text-navy">{booking.user.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-secondary">
            <Phone size={13} />
            {booking.user.phone}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted">Location</p>
          <p className="mt-0.5 flex items-start gap-1.5 text-sm text-secondary">
            <MapPin size={13} className="mt-0.5 flex-none" />
            {formatAddress(booking.address)}
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-md bg-(--error-light) px-3 py-2 text-sm text-(--error)">
          {error}
        </p>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <DeclineBookingButton
          onClick={decline}
          disabled={isBusy}
          isLoading={isDeclining}
        />
        <AcceptBookingButton
          onClick={accept}
          disabled={isBusy}
          isLoading={isAccepting}
        />
      </div>
    </div>
  );
}

export function IncomingBookingsList({
  initialBookings,
}: {
  initialBookings: IncomingBooking[];
}) {
  const [bookings, setBookings] = useState(initialBookings);

  function handleStatusChange(bookingId: string) {
    setBookings((current) => current.filter((b) => b.id !== bookingId));
  }

  if (bookings.length === 0) {
    return (
      <div className="fixit-card p-6 text-center text-sm text-secondary">
        No incoming booking requests right now.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking) => (
        <IncomingBookingCard
          key={booking.id}
          booking={booking}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}
