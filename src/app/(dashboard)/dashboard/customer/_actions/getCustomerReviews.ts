"use server";

import { getAccessToken } from "@/service/getAccessToken";

export const getCustomerReviews = async () => {
  const { accessToken } = await getAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/customer`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24, // 1 day
        tags: ["customer-reviews"],
      },
    },
  );

  const result = await res.json();

  return result.data;
};
