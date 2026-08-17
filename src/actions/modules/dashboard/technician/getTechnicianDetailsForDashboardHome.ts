import { getAccessToken } from "@/service/getAccessToken";
import { getMe } from "@/service/getMe";
import { idValidationSchema } from "@/validation";

async function getTechnicianDetailsForDashboardHome(technicianId: string) {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) throw new Error(message);

  const parsed = idValidationSchema.safeParse({ id: technicianId });
  if (!parsed.success) {
    throw new Error("Invalid technician reference.");
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
    throw new Error(result.message);
  }

  return result.data;
}

export async function returnTechnicianDashboardHomepageData() {
  const technician = await getMe();

  const technicianDashboardHomeData =
    await getTechnicianDetailsForDashboardHome(technician.data.technician.id);

  return technicianDashboardHomeData;
}
