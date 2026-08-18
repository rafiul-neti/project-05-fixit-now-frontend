"use server";

import { AdminDashboardResponse } from "@/lib/types/modules/admin/admin.types";
import { getAccessToken } from "@/service/getAccessToken";

export async function getAdminDashboardStats() {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) throw new Error(message);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/dashboard`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        tags: ["technician-dashboard-stats"],
        revalidate: 60 * 60 * 2, // 2 hours
      },
    },
  );

  const result: AdminDashboardResponse = await res.json();

  if (!result.success) throw new Error(result.message);

  return result.data;
}
