"use client";

import { useMemo, useState } from "react";
// import { updateBookingStatus } from "../_actions/updateBookingStatus";
import BookingsFilterBar from "./BookingsFilterBar";
import {
  BookingStatusType,
  IBooking,
} from "@/lib/types/modules/admin/admin.types";
import {
  ADMIN_ALLOWED_TRANSITIONS,
  STATUS_BADGE_CLASSES,
  STATUS_LABEL,
} from "@/lib/types/modules";
import { Spinner } from "@/components/ui/spinner";

interface AllBookingsTableProps {
  initialBookings: IBooking[];
}

function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatPrice(price: string) {
  const n = Number(price);
  return Number.isFinite(n) ? `৳${n.toLocaleString("en-US")}` : price;
}

function StatusBadge({ status }: { status: BookingStatusType }) {
  return (
    <span className={`fixit-badge ${STATUS_BADGE_CLASSES[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function matchesSearch(booking: IBooking, query: string) {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    booking.user.name.toLowerCase().includes(q) ||
    booking.user.email.toLowerCase().includes(q) ||
    booking.technician.user.name.toLowerCase().includes(q) ||
    booking.service.name.toLowerCase().includes(q) ||
    booking.service.category.name.toLowerCase().includes(q)
  );
}

function BookingDetails({ booking }: { booking: IBooking }) {
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-3">
      <div>
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Customer
        </p>
        <p className="mt-1 font-medium">{booking.user.name}</p>
        <p className="text-sm text-muted-foreground">{booking.user.email}</p>
        <p className="text-sm text-muted-foreground">{booking.user.phone}</p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Service
        </p>
        <p className="mt-1 font-medium">{booking.service.name}</p>
        <p className="text-sm text-muted-foreground">
          {booking.service.category.name}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {booking.service.description}
        </p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Address
        </p>
        <p className="mt-1 text-sm">
          {booking.address.address_line_1}
          {booking.address.address_line_2
            ? `, ${booking.address.address_line_2}`
            : ""}
        </p>
        <p className="text-sm text-muted-foreground">
          {booking.address.city}, {booking.address.region} —{" "}
          {booking.address.postCode}
        </p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Timing
        </p>
        <p className="mt-1 text-sm">
          Started: {formatDateTime(booking.startedAt)}
        </p>
        <p className="text-sm">
          Completed: {formatDateTime(booking.completedAt)}
        </p>
        <p className="text-sm text-muted-foreground">
          Worked:{" "}
          {booking.workedMinutes != null ? `${booking.workedMinutes} min` : "—"}
        </p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Technician
        </p>
        <p className="mt-1 text-sm">{booking.technician.user.name}</p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Payment
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {booking.payment ? "Payment recorded" : "No payment recorded yet"}
        </p>
      </div>
    </div>
  );
}

function StatusActions({
  booking,
  pending,
  onChangeStatus,
}: {
  booking: IBooking;
  pending: boolean;
  onChangeStatus: (next: BookingStatusType) => void;
}) {
  const options = ADMIN_ALLOWED_TRANSITIONS[booking.status];

  if (options.length === 0) {
    return (
      <span className="text-sm text-muted-foreground">
        No further action available
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((next, ind: number) => (
        <button
          key={ind}
          type="button"
          disabled={pending}
          onClick={() => onChangeStatus(next)}
          className={
            next === "DECLINED"
              ? "btn-secondary border-(--error) text-(--error) hover:bg-(--error-light)"
              : "btn-primary border-(--success) text-(--success) hover:bg-(--success-light)"
          }
        >
          {pending
            ? <Spinner />
            : next === "DECLINED"
              ? "Force decline"
              : `Mark ${STATUS_LABEL[next]}`}
        </button>
      ))}
    </div>
  );
}

export default function AllBookingsTable({
  initialBookings,
}: AllBookingsTableProps) {
  const [bookings, setBookings] = useState<IBooking[]>(initialBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatusType | "ALL">(
    "ALL",
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [errorByBookingId, setErrorByBookingId] = useState<
    Record<string, string>
  >({});

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const statusOk = statusFilter === "ALL" || b.status === statusFilter;
      return statusOk && matchesSearch(b, search);
    });
  }, [bookings, search, statusFilter]);

  async function handleChangeStatus(
    booking: IBooking,
    nextStatus: BookingStatusType,
  ) {
    setPendingId(booking.id);
    setErrorByBookingId((prev) => {
      const { [booking.id]: _drop, ...rest } = prev;
      return rest;
    });

    try {
      //   const result = await updateBookingStatus(booking.id, nextStatus);
      //   setBookings((prev) =>
      //     prev.map((b) =>
      //     //   b.id === booking.id ? { ...b, status: result.status } : b,
      //     ),
      //   );
    } catch {
      setErrorByBookingId((prev) => ({
        ...prev,
        [booking.id]: "Couldn't update this booking. Try again.",
      }));
    } finally {
      setPendingId(null);
    }
  }

  return (
    <>
      <div>
        <h1 className="heading-secondary">All bookings ({filtered.length})</h1>
        <p className="mt-1 text-sm text-secondary">
          Review every booking on the platform and step in on status when
          needed.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <BookingsFilterBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {filtered.length === 0 ? (
          <div className="fixit-card py-12 text-center text-muted-foreground">
            No bookings match your filters.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((booking) => {
              const isExpanded = expandedId === booking.id;
              const isPending = pendingId === booking.id;

              return (
                <div key={booking.id} className="fixit-card p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : booking.id)
                    }
                    className="flex w-full flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">
                          {booking.service.name}
                        </span>
                        <StatusBadge status={booking.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {booking.user.name} → {booking.technician.user.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground sm:text-right">
                      <span>{formatDateTime(booking.createdAt)}</span>
                      <span className="font-medium text-foreground">
                        {formatPrice(booking.totalPrice)}
                      </span>
                      <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 flex flex-col gap-4">
                      <BookingDetails booking={booking} />
                      <div className="flex flex-col gap-1 border-t border-border pt-4">
                        <StatusActions
                          booking={booking}
                          pending={isPending}
                          onChangeStatus={(next) =>
                            handleChangeStatus(booking, next)
                          }
                        />
                        {errorByBookingId[booking.id] && (
                          <span className="text-xs text-(--error)">
                            {errorByBookingId[booking.id]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
