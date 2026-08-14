"use server"

import { getAccessToken } from "@/service/getAccessToken";

export const getCustomerBookings = async () => {
  const { accessToken } = await getAccessToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
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
  });

  const result = await res.json();

  return result.data;
};
