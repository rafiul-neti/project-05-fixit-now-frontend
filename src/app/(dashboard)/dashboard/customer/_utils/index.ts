import { PaymentStatus } from "@/lib/types/enum";

export function formatMinutes(mins: number | null) {
  if (mins === null) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export function formatCurrency(amount: number | null) {
  if (amount === null) return null;
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  PENDING: { label: "Payment pending", className: "status-warning" },
  PAID: { label: "Paid", className: "status-success" },
  FAILED: { label: "Payment failed", className: "status-error" },
  REQUESTED_REFUND: { label: "Refund requested", className: "status-warning" },
  REFUNDED: { label: "Refunded", className: "status-info" },
  CANCELLED: { label: "Cancelled", className: "status-error" },
};

export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatDateTime(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formatNaNCurrency(amount: string) {
  const value = Number(amount);
  if (Number.isNaN(value)) return amount;
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(value);
}