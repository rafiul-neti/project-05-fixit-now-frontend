import { getAccessToken } from "@/service/getAccessToken";

export async function getAllCategories() {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) {
    return {
      success: false,
      message: message ?? "You're not logged in! Please log in.",
    };
  }

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
        tags: ["manage-categories"],
        revalidate: 60 * 60 * 2, // 2 hours
      },
    },
  );

  const result = await res.json();

  if (!result.success) {
    return {
      success: result.success,
      message: result.message,
    };
  }

  return { success: result.success, data: result.data };
}
