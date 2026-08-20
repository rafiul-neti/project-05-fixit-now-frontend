"use server";

import { getAccessToken } from "@/service/getAccessToken";
import {
  idValidationSchema,
  UpdateBookingStatus,
  updateBookingStatusSchema,
} from "@/validation";
import { revalidateTag } from "next/cache";

export async function handleBookingStatus(
  status: UpdateBookingStatus,
  bookingId: string,
) {
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
      parsed.error.issues[0]?.message ?? "Invalid payment reference.";
    return {
      success: false,
      message: parsedMessage,
    };
  }

  const {
    success: isValidBooking,
    data,
    error,
  } = updateBookingStatusSchema.safeParse(status);
  if (!isValidBooking) {
    const parsedMessage =
      error.issues[0]?.message ?? "Booking status is invalid";
    return {
      success: false,
      message: parsedMessage,
    };
  }

  const { id } = parsed.data;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technicians/bookings/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
    },
  );

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }
  revalidateTag("technician-dashboard", "max");
}
