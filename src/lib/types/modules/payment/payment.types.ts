import { PaymentStatus } from "../../enum";

export interface CustomerPayment {
  id: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId: string | null;
  amount: string; // Decimal serializes as a string over JSON
  method: string;
  provider: string;
  status: PaymentStatus;
  failureReason: string | null;
  bookingId: string;
  userId: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  booking: {
    service: { name: string };
    technician: { user: { name: string } };
  };
}
