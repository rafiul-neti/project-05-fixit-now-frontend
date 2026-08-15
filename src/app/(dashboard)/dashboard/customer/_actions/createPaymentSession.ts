"use server";

import { getAccessToken } from "@/service/getAccessToken";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const bookingIdSchema = z.object({
  bookingId: z.uuid(),
});

export async function createPaymentSession(id: { bookingId: string }) {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) {
    throw new Error(message);
  }

  const parsed = bookingIdSchema.safeParse(id);
  if (!parsed.success) {
    throw new Error("Invalid booking reference.");
  }
  const { bookingId } = parsed.data;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create/${bookingId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  revalidateTag("customer-bookings", "max");

  return result.data.paymentURL;
}
