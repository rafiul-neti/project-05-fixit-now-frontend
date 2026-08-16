import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Receipt,
  Star,
  Wrench,
} from "lucide-react";
import { formatDateTime, formatNaNCurrency, initials, PAYMENT_STATUS_CONFIG } from "../../_utils";
import { SectionCard } from "../../_components/SectionCard";
import { InfoRow } from "../../_components/InfoRow";
import { getCustomerPaymentDetails } from "@/actions/modules/dashboard/customer";
import { PaymentDetails } from "@/lib/types/modules/payment/payment.types";

// Main component
export default async function CustomerPaymentDetailsPage({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = await params;
  const payment: PaymentDetails = await getCustomerPaymentDetails(paymentId);

  const status = PAYMENT_STATUS_CONFIG[payment.status];
  const { bookingDetails } = payment;

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-3xl">
        <Link
          href="/dashboard/customer/payments"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-navy transition-colors"
        >
          <ArrowLeft size={15} />
          Back to payments
        </Link>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Payment &middot; {payment.id.slice(0, 8)}
            </p>
            <h1 className="heading-secondary mt-1">
              {bookingDetails.serviceName}
            </h1>
            <p className="mt-1 text-sm text-secondary">
              {bookingDetails.serviceCategory}
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
          {/* Payment details */}
          <SectionCard title="Payment details">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoRow
                icon={Receipt}
                label="Amount"
                value={formatNaNCurrency(payment.amount)}
              />
              <InfoRow
                icon={CreditCard}
                label="Method"
                value={`${payment.provider} · ${payment.method}`}
              />
              <InfoRow
                icon={Calendar}
                label="Paid on"
                value={formatDateTime(payment.paidAt) ?? "Not yet paid"}
              />
              {payment.failureReason && (
                <InfoRow
                  icon={Receipt}
                  label="Failure reason"
                  value={payment.failureReason}
                />
              )}
            </div>
          </SectionCard>

          {/* Service */}
          <SectionCard title="Service">
            <h3 className="font-bold text-navy">
              {bookingDetails.serviceName}
            </h3>
            <p className="mt-1 text-sm text-secondary">
              {bookingDetails.serviceDescription}
            </p>
          </SectionCard>

          {/* Technician */}
          <SectionCard title="Technician">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
                {initials(bookingDetails.technicianName)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-navy">
                  {bookingDetails.technicianName}
                </p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-secondary">
                  <span className="inline-flex items-center gap-1">
                    <Star size={14} className="text-brand" />
                    {bookingDetails.technicianRating.toFixed(1)} rating
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Wrench size={14} className="text-brand" />
                    {bookingDetails.technicianExperienceYears} yrs experience
                  </span>
                </div>
              </div>
            </div>
            {bookingDetails.technicianBio && (
              <>
                <div className="fixit-divider my-5" />
                <p className="text-sm text-secondary">
                  {bookingDetails.technicianBio}
                </p>
              </>
            )}
          </SectionCard>
        </div>

        <div className="mt-6">
          <Link
            href={`/dashboard/customer/my-bookings/${payment.bookingId}`}
            className="btn-secondary outline outline-(--info)"
          >
            View booking details
          </Link>
        </div>
      </div>
    </div>
  );
}
