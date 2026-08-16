import React from "react";
import { getCustomerPayments } from "@/actions/modules/dashboard/customer";
import { CustomerPayment } from "@/lib/types/modules/payment/payment.types";
import { PaymentsTable } from "@/components/modules/dashboard/customer/PaymentsTable";

export default async function PaymentsPage() {
  const payments: CustomerPayment[] = await getCustomerPayments();

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-4xl">
        <div className="mb-6">
          <h1 className="heading-secondary">Payments</h1>
          <p className="mt-1 text-sm text-secondary">
            A record of payments made for your bookings.
          </p>
        </div>

        <PaymentsTable payments={payments} />
      </div>
    </div>
  );
}
