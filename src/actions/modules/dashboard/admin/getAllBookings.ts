import { getAccessToken } from "@/service/getAccessToken";

export async function getAllBookings() {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) throw new Error(message);

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

  console.dir(result, { depth: null });

  if (!result.success) throw new Error(result.message);

  return result.data;
}
