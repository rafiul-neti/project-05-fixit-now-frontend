import { getAccessToken } from "@/service/getAccessToken";

export async function getAllUsers() {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) throw new Error(message);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      tags: ["manage-get-users"],
      revalidate: 60 * 60 * 2, // 2 hours
    },
  });

  const result = await res.json();

  if (!result.success) throw new Error(result.message);

  return result.data;
}
