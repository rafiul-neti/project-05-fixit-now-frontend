"use server"

import { getAccessToken } from "@/service/getAccessToken";
import { UpdateAvailabilityInput } from "@/validation/schemas/modules/technician";

export async function updateAvailabilitySlots(
  availability: UpdateAvailabilityInput,
) {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) throw new Error(message);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technicians/availability`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(availability),
    },
  );

  const result = await res.json();

  if (!result.success) throw new Error(result.message);
   return result.data
}
