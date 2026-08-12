"use server";

import { getAccessToken } from "./getAccessToken";

export const getMe = async () => {
  const { accessToken, success, message } = await getAccessToken();
  if (!success) {
    return {
      success: false,
      message,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1 day
      tags: ["my-profile"],
    },
  });

  const result = await res.json();

  console.log(result);

  return result;
};
