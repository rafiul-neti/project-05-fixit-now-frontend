import React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { getCustomerBookingById } from "../../../_actions/getCustomerBooking";
import { IBookingDetails } from "@/lib/types/modules/booking/booking.types";
import { PaymentStatus } from "@/lib/types/enum";

export default async function CheckoutResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ bookingId: string }>;
  searchParams: Promise<{ success?: string }>;
}) {
  const { bookingId } = await params;
  const booking: IBookingDetails = await getCustomerBookingById({ bookingId });
  const { success } = await searchParams;

  const isSuccess = success === "true";
  const bookingDetailsHref = `/dashboard/customer/my-bookings/${bookingId}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--background-secondary) px-4 py-10">
      <div className="fixit-card w-full max-w-md p-8 text-center">
        {booking.payment?.status === PaymentStatus.PAID && isSuccess ? (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-(--success-light)">
              <CheckCircle2
                size={32}
                strokeWidth={2}
                className="text-(--success)"
              />
            </div>
            <h1 className="heading-secondary">Payment successful</h1>
            <p className="mt-2 text-sm text-secondary">
              Your payment has been received. A receipt and updated booking
              status will be reflected shortly.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-(--error-light)">
              <XCircle size={32} strokeWidth={2} className="text-(--error)" />
            </div>
            <h1 className="heading-secondary">Payment not completed</h1>
            <p className="mt-2 text-sm text-secondary">
              Your payment was cancelled or didn&apos;t go through. No charge
              was made. You can try again from the booking page.
            </p>
          </>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={bookingDetailsHref}
            className={isSuccess ? "btn-primary" : "btn-secondary"}
          >
            View booking details
            <ArrowRight size={16} />
          </Link>
          {!isSuccess && (
            <Link
              href={`${bookingDetailsHref}/pay`}
              className="btn-primary"
              style={{ backgroundColor: "var(--success)" }}
            >
              Try payment again
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
