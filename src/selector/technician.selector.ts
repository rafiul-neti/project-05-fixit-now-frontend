/*
Selectors — one place for every "which bookings go in which section" rule, so the page component just reads results instead of re-deriving anywhere.
*/

import {
  TechnicianBooking,
  TechnicianDashboardData,
} from "@/lib/types/modules/technician/technician.types";

export function getRequestedBookings(bookings: TechnicianBooking[]) {
  return bookings.filter((b) => b.status === "REQUESTED");
}

export function getInProgressBookings(bookings: TechnicianBooking[]) {
  return bookings.filter((b) => b.status === "IN_PROGRESS");
}

export function getUpcomingBookings(bookings: TechnicianBooking[]) {
  return bookings.filter((b) => b.status === "ACCEPTED");
}

export function getRecentActivity(bookings: TechnicianBooking[]) {
  return bookings
    .filter((b) => b.status === "COMPLETED")
    .sort((a, b) => {
      // Most recently completed first; fall back to updatedAt if completedAt
      // is somehow missing on a COMPLETED record.
      const aTime = a.completedAt ?? a.updatedAt;
      const bTime = b.completedAt ?? b.updatedAt;
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
}


// Stats row

export interface TechnicianStats {
  totalEarnings: number;
  averageRating: number;
  totalBookings: number;
  totalReviews: number;
}

export function computeTechnicianStats(
  data: TechnicianDashboardData,
): TechnicianStats {
  const totalEarnings = data.bookings
    .filter((b) => b.payment?.status === "PAID")
    .reduce((sum, b) => sum + Number(b.totalPrice ?? 0), 0);

  return {
    totalEarnings,
    averageRating: data.averagerating,
    // _count.bookings mirrors _count.reviews as the source of truth for
    // totals — assumed to represent the true lifetime count, independent of
    // how many booking records are actually included in `data.bookings`.
    totalBookings: data._count.bookings,
    totalReviews: data._count.reviews,
  };
}