"use server";

import { getAccessToken } from "@/service/getAccessToken";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const bookingIdSchema = z.object({
  bookingId: z.uuid(),
});

export async function createPaymentSession(id: { bookingId: string }) {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) {
    return {
      success: false,
      message: message ?? "You're not logged in! Please log in.",
    };
  }

  const parsed = bookingIdSchema.safeParse({ id });
  if (!parsed.success) {
    const parsedMessage =
      parsed.error.issues[0]?.message ?? "Invalid booking reference!";
    return {
      success: parsed.success,
      message: parsedMessage,
    };
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
    return {
      success: result.success,
      message: result.message,
    };
  }

  revalidateTag("customer-bookings", "max");

  return { success: true, paymentURL: result.data.paymentURL };
}
