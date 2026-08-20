import { getAccessToken } from "@/service/getAccessToken";
import { idValidationSchema } from "@/validation";
import { callApiThroughTechnicianId } from "./callApiThroughTechnicianId";

async function getTechnicianDetailsForDashboardHome(technicianId: string) {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) {
    return {
      success: false,
      message: message ?? "You're not logged in! Please log in.",
    };
  }

  const parsed = idValidationSchema.safeParse({ id: technicianId });
  if (!parsed.success) {
    const parsedMessage =
      parsed.error.issues[0]?.message ?? "Invalid technician reference.";
    return {
      success: false,
      message: parsedMessage,
    };
  }

  const { id } = parsed.data;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technicians/${id}/dashboard`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        tags: ["technician-dashboard"],
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

export async function returnTechnicianDashboardHomepageData() {
  const technicianDashboardHomeData = await callApiThroughTechnicianId(
    getTechnicianDetailsForDashboardHome,
  );

  return technicianDashboardHomeData;
}
