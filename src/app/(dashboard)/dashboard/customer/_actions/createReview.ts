"use server";

import { getAccessToken } from "@/service/getAccessToken";
import { ReviewFormValues } from "../my-bookings/[bookingId]/_validations";
import { idValidationSchema } from "@/validation";
import { revalidateTag } from "next/cache";

export const createReview = async (
  bookingId: string,
  payload: ReviewFormValues,
) => {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) {
    return {
      success: false,
      message: message ?? "You're not logged in! Please log in.",
    };
  }

  const parsed = idValidationSchema.safeParse({ id: bookingId });
  if (!parsed.success) {
    const parsedMessage =
      parsed.error.issues[0]?.message ?? "Invalid booking reference!";
    return {
      success: parsed.success,
      message: parsedMessage,
    };
  }

  const { id } = parsed.data;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  revalidateTag("customer-reviews", "max");

  return { success: true, data: result };
};
