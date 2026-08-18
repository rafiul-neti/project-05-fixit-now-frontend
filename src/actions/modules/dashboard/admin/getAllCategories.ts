import { getAccessToken } from "@/service/getAccessToken";

export async function getAllCategories() {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) throw new Error(message);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories`,
    {
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
    },
  );

  const result = await res.json();

  if (!result.success) throw new Error(result.message);

  return result.data;
}
