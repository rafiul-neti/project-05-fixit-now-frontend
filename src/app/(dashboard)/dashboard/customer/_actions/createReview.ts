"use server";

import { getAccessToken } from "@/service/getAccessToken";
import { ReviewFormValues } from "../my-bookings/[bookingId]/_validations";
import { idValidationSchema } from "@/validation";
import { revalidateTag } from "next/cache";

export const createReview = async (
  bookingId: string,
  payload: ReviewFormValues,
) => {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) {
    throw new Error(message);
  }

  const parsed = idValidationSchema.safeParse({ id: bookingId });
  if (!parsed.success) {
    throw new Error("Invalid booking reference.");
  }

  const { id } = parsed.data;

  console.log("booking ID", id);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  console.log(result);

  if (!result.success) {
    throw new Error(result.message);
  }

  revalidateTag("customer-reviews", "max");

  return result;
};
