"use client";

import { BookingStatus } from "@/lib/types/enum";
import { STATUS_LABEL } from "@/lib/types/modules";
import { BookingStatusType } from "@/lib/types/modules/admin/admin.types";


interface BookingsFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: BookingStatusType | "ALL";
  onStatusFilterChange: (value: BookingStatusType | "ALL") => void;
}

const STATUS_OPTIONS: Array<BookingStatusType | "ALL"> = [
  "ALL",
  ...Object.values(BookingStatus),
];

export default function BookingsFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: BookingsFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by customer, technician, or service"
          className="fixit-input w-full sm:w-1/2"
          aria-label="Search bookings"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value as BookingStatusType | "ALL")
          }
          className="fixit-input w-full sm:w-1/2"
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status === "ALL" ? "All statuses" : STATUS_LABEL[status]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
