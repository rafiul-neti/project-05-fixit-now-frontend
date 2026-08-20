import { getAccessToken } from "@/service/getAccessToken";

export async function getAllBookings() {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) {
    return {
      success: false,
      message: message ?? "You are not logged in! Please log in.",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      tags: ["manage-bookings"],
      revalidate: 60 * 60 * 2, // 2 hours
    },
  });

  const result = await res.json();

  if (!result.success) {
    return {
      success: result.success,
      message: result.message,
    };
  }

  return {
    success: result.success,
    data: result.data,
  };
}
