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
    throw new Error(message);
  }

  const { success: isValidBooking, data } =
    updateBookingStatusSchema.safeParse(status);
  if (!isValidBooking) {
    throw new Error("Invalid Booking reference!");
  }

  const parsed = idValidationSchema.safeParse({ id: bookingId });
  if (!parsed.success) {
    throw new Error("Invalid booking reference.");
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

  if (!result.success) throw new Error(result.message);
  revalidateTag("technician-dashboard", "max");
}
