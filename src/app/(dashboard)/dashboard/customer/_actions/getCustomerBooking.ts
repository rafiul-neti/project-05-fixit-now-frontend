"use server";

import { getAccessToken } from "@/service/getAccessToken";
import { z } from "zod";

export const getCustomerBookings = async ({
  sortBy,
  sortOrder,
}: {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
} = {}) => {
  const { accessToken } = await getAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/bookings?sortBy=${sortBy}&sortOrder=${sortOrder}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24, // 1 day
        tags: ["customer-bookings"],
      },
    },
  );

  const result = await res.json();

  return result.data;
};

const bookingIdSchema = z.object({
  bookingId: z.uuid(),
});

export const getCustomerBookingById = async (id: { bookingId: string }) => {
  const { bookingId } = bookingIdSchema.parse(id);

  const { accessToken } = await getAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/bookings/${bookingId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();

  return result.data;
};
