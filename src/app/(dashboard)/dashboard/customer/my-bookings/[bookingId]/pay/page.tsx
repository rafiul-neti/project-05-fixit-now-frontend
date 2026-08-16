import React from "react";
import { Clock, Wrench } from "lucide-react";
import { getCustomerBookingById } from "../../../_actions/getCustomerBooking";
import { IBookingDetails } from "@/lib/types/modules/booking/booking.types";
import { formatCurrency, formatMinutes } from "../../../_utils";
import { ConfirmPaymentButton } from "./_components/ConfirmPaymentButton";

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-brand-light text-brand">
          <Icon size={17} strokeWidth={2} />
        </div>
        <p className="text-sm text-secondary">{label}</p>
      </div>
      <p className="text-sm font-semibold text-navy">{value}</p>
    </div>
  );
}

// Main component

export default async function PayBookingPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const booking: IBookingDetails = await getCustomerBookingById({ bookingId });

  const worked = formatMinutes(booking.workedMinutes);
  const price = formatCurrency(booking.totalPrice);

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-lg">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Payment &middot; Booking {booking.id.slice(0, 8)}
          </p>
          <h1 className="heading-secondary mt-1">Confirm &amp; pay</h1>
          <p className="mt-1 text-sm text-secondary">
            Review the details below before proceeding to payment.
          </p>
        </div>

        <section className="fixit-card p-6">
          <h2 className="mb-2 text-base font-bold text-navy">
            {booking.service.name}
          </h2>
          <p className="mb-4 text-sm text-secondary">
            {booking.service.category.name} &middot;{" "}
            {booking.technician.user.name}
          </p>

          <div className="fixit-divider" />

          <div className="divide-y divide-border">
            <InfoRow icon={Clock} label="Time worked" value={worked ?? "—"} />
            <InfoRow
              icon={Wrench}
              label="Hourly rate"
              value={`${formatCurrency(booking.technician.hourlyRate)}/hr`}
            />
          </div>

          <div className="fixit-divider" />

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm font-medium text-secondary">Total due</p>
            <p className="text-xl font-bold text-navy">
              {price ?? "Pending calculation"}
            </p>
          </div>
        </section>

        <div className="mt-6">
          <ConfirmPaymentButton bookingId={booking.id} />
        </div>
      </div>
    </div>
  );
}
