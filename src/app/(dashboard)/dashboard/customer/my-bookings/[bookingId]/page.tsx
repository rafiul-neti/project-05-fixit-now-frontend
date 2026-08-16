import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  Wrench,
  DollarSign,
  Home,
} from "lucide-react";
import { BookingStatus, PaymentStatus } from "@/lib/types/enum";
import { getCustomerBookingById } from "../../_actions/getCustomerBooking";
import { IBookingDetails } from "@/lib/types/modules/booking/booking.types";
import PayNowButton from "../../_components/_my-bookings/PayNowButton";
import { formatCurrency, formatDateTime, formatMinutes, initials, PAYMENT_STATUS_CONFIG } from "../../_utils";
import { PostReviewDialog } from "../../_components/_my-bookings/PostReviewDialog";
import { SectionCard } from "../../_components/SectionCard";
import { InfoRow } from "../../_components/InfoRow";

// Status config
const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  REQUESTED: { label: "Requested", className: "status-warning" },
  ACCEPTED: { label: "Accepted", className: "status-info" },
  DECLINED: { label: "Declined", className: "status-error" },
  IN_PROGRESS: { label: "In progress", className: "status-info" },
  COMPLETED: { label: "Completed", className: "status-success" },
};

// Helper methods

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
}

// Main component

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const booking: IBookingDetails = await getCustomerBookingById({ bookingId });

  const status = STATUS_CONFIG[booking.status];
  const started = formatDateTime(booking.startedAt);
  const completed = formatDateTime(booking.completedAt);
  const worked = formatMinutes(booking.workedMinutes);
  const price = formatCurrency(booking.totalPrice);

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Booking &middot; {booking.id.slice(0, 8)}
            </p>
            <h1 className="heading-secondary mt-1">{booking.service.name}</h1>
            <p className="mt-1 text-sm text-secondary">
              {booking.service.category.name} &middot; Booked{" "}
              {formatDate(booking.createdAt)}
            </p>
          </div>
          <span
            className={`fixit-badge ${status.className}`}
            style={{ border: "none" }}
          >
            {status.label}
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {/* Timeline / cost summary */}
          <SectionCard title="Service timeline">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoRow
                icon={Calendar}
                label="Started"
                value={started ?? "Not started yet"}
              />
              <InfoRow
                icon={Calendar}
                label="Completed"
                value={completed ?? "Not completed yet"}
              />
              <InfoRow icon={Clock} label="Time worked" value={worked ?? "—"} />
              <InfoRow
                icon={DollarSign}
                label="Total price"
                value={price ?? "Pending calculation"}
              />
            </div>
          </SectionCard>

          {/* Payment */}
          <SectionCard title="Payment">
            {booking.payment ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-md bg-brand-light text-brand">
                    <DollarSign size={17} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted">Status</p>
                    <span
                      className={`fixit-badge mt-1 ${
                        PAYMENT_STATUS_CONFIG[booking.payment.status].className
                      }`}
                      style={{ border: "none" }}
                    >
                      {PAYMENT_STATUS_CONFIG[booking.payment.status].label}
                    </span>
                  </div>
                </div>
                <InfoRow
                  icon={Wrench}
                  label="Method"
                  value={`${booking.payment.provider} · ${booking.payment.method}`}
                />
                {booking.payment.paidAt && (
                  <InfoRow
                    icon={Calendar}
                    label="Paid on"
                    value={formatDateTime(booking.payment.paidAt)}
                  />
                )}
              </div>
            ) : (
              <p className="text-sm text-secondary">
                No payment has been initiated for this booking yet.
              </p>
            )}
          </SectionCard>

          {/* Technician */}
          <SectionCard title="Technician">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
                {initials(booking.technician.user.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-navy">
                  {booking.technician.user.name}
                </p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-secondary">
                  <span className="inline-flex items-center gap-1">
                    <Star size={14} className="text-brand" />
                    {booking.technician.experienceYears} yrs experience
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Wrench size={14} className="text-brand" />
                    {formatCurrency(booking.technician.hourlyRate)}/hr
                  </span>
                </div>
              </div>
            </div>

            <div className="fixit-divider my-5" />

            <InfoRow
              icon={Clock}
              label="General availability"
              value={`${booking.technician.availability.startTime} – ${booking.technician.availability.endTime}, off ${booking.technician.availability.weekendDays}`}
            />
          </SectionCard>

          {/* Address */}
          <SectionCard title="Service address">
            <InfoRow
              icon={booking.address.whereAbout === "HOME" ? Home : MapPin}
              label={
                booking.address.whereAbout === "HOME"
                  ? "Home"
                  : booking.address.whereAbout
              }
              value={
                <span className="font-normal text-secondary">
                  {booking.address.address_line_1}
                  {booking.address.address_line_2
                    ? `, ${booking.address.address_line_2}`
                    : ""}
                  , {booking.address.city}, {booking.address.region}{" "}
                  {booking.address.postCode}
                </span>
              }
            />
          </SectionCard>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn-secondary">
            <Phone size={16} />
            Contact technician
          </button>
          {booking.status === "COMPLETED" &&
            (!booking.payment || booking.payment.status !== "PAID") && (
              <PayNowButton
                href={`/dashboard/customer/my-bookings/${bookingId}/pay`}
                className="btn-primary"
              />
            )}
          {booking.payment && booking.payment.status === PaymentStatus.PAID && (
            <PostReviewDialog
              bookingId={booking.id}
              serviceName={booking.service.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
