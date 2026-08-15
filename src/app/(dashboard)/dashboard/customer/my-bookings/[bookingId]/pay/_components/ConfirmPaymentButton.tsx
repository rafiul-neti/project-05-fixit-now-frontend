"use client";

import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { createPaymentSession } from "../../../../_actions/createPaymentSession";

interface ConfirmPaymentButtonProps {
  bookingId: string;
}

export function ConfirmPaymentButton({ bookingId }: ConfirmPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirmPayment() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await createPaymentSession({ bookingId });
      window.location.href = res;
    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Something went wrong while starting your payment. Please try again.",
        );
      }
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleConfirmPayment}
        disabled={isLoading}
        className="btn-primary w-full"
        style={{ backgroundColor: "var(--success)" }}
      >
        {isLoading ? (
          <>
            <Spinner />
            Redirecting to payment...
          </>
        ) : (
          <>
            <DollarSign size={16} />
            Confirm &amp; pay
          </>
        )}
      </button>
      {error && (
        <p className="mt-3 text-center text-sm text-(--error)">{error}</p>
      )}
    </div>
  );
}
