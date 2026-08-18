"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Receipt } from "lucide-react";
import { PaymentStatus } from "@/lib/types/enum";
import { CustomerPayment } from "@/lib/types/modules/payment/payment.types";
import {
  formatNaNCurrency,
  PAYMENT_STATUS_CONFIG,
} from "@/app/(dashboard)/dashboard/customer/_utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SortKey = "date" | "amount" | "status";
type SortDirection = "asc" | "desc";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { dateStyle: "medium" });
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const config = PAYMENT_STATUS_CONFIG[status];
  return (
    <span
      className={`fixit-badge ${config.className}`}
      style={{ border: "none" }}
    >
      {config.label}
    </span>
  );
}

function SortButton({
  label,
  active,
  direction,
  onClick,
}: {
  label: string;
  active: boolean;
  direction: SortDirection;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted hover:text-navy transition-colors"
    >
      {label}
      {active ? (
        direction === "asc" ? (
          <ArrowUp size={13} />
        ) : (
          <ArrowDown size={13} />
        )
      ) : (
        <ArrowUpDown size={13} className="opacity-40" />
      )}
    </button>
  );
}

// Main component

export function PaymentsTable({ payments }: { payments: CustomerPayment[] }) {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  }

  const sortedPayments = useMemo(() => {
    const sorted = [...payments].sort((a, b) => {
      let diff = 0;
      if (sortKey === "date") {
        diff =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortKey === "amount") {
        diff = Number(a.amount) - Number(b.amount);
      } else if (sortKey === "status") {
        diff = a.status.localeCompare(b.status);
      }
      return sortDirection === "asc" ? diff : -diff;
    });
    return sorted;
  }, [payments, sortKey, sortDirection]);

  if (payments.length === 0) {
    return (
      <div className="fixit-card flex flex-col items-center gap-3 p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand">
          <Receipt size={22} />
        </div>
        <div>
          <p className="font-semibold text-navy">No payments yet</p>
          <p className="mt-1 text-sm text-secondary">
            Payments for your completed bookings will show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop / tablet: table */}
      <div className="fixit-card hidden overflow-hidden p-0 sm:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-(--background-secondary)">
              <th className="px-4 py-3 text-left font-semibold text-navy">
                Service
              </th>
              <th className="px-4 py-3 text-left font-semibold text-navy">
                Technician
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton
                  label="Amount"
                  active={sortKey === "amount"}
                  direction={sortDirection}
                  onClick={() => handleSort("amount")}
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-navy">
                Method
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton
                  label="Status"
                  active={sortKey === "status"}
                  direction={sortDirection}
                  onClick={() => handleSort("status")}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton
                  label="Date"
                  active={sortKey === "date"}
                  direction={sortDirection}
                  onClick={() => handleSort("date")}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((payment) => (
              <tr
                key={payment.id}
                onClick={() =>
                  router.push(`/dashboard/customer/payments/${payment.id}`)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/dashboard/customer/payments/${payment.id}`);
                  }
                }}
                tabIndex={0}
                role="button"
                className="cursor-pointer border-b border--border last:border-0 hover:bg-(--background-secondary) focus-visible:bg-(--background-secondary) focus-visible:outline-none"
              >
                <td className="px-4 py-3 font-medium text-navy">
                  {payment.booking.service.name}
                </td>
                <td className="px-4 py-3 text-secondary">
                  {payment.booking.technician.user.name}
                </td>
                <td className="px-4 py-3 font-semibold text-navy">
                  {formatNaNCurrency(payment.amount, 2)}
                </td>
                <td className="px-4 py-3 capitalize text-secondary">
                  {payment.method}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={payment.status} />
                </td>
                <td className="px-4 py-3 text-secondary">
                  {formatDate(payment.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {sortedPayments.map((payment) => (
          <Link
            key={payment.id}
            href={`/dashboard/customer/payments/${payment.id}`}
            className="fixit-card block p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-navy">
                  {payment.booking.service.name}
                </p>
                <p className="mt-0.5 text-sm text-secondary">
                  {payment.booking.technician.user.name}
                </p>
              </div>
              <StatusBadge status={payment.status} />
            </div>
            <div className="fixit-divider my-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary capitalize">
                {payment.method} &middot; {formatDate(payment.createdAt)}
              </span>
              <span className="font-semibold text-navy">
                {formatNaNCurrency(payment.amount, 2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
