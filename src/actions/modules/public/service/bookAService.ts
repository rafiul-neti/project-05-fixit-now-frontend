"use server";

import { getAccessToken } from "@/service/getAccessToken";
import { getMe } from "@/service/getMe";
import { BookingFormInput } from "@/validation/schemas/modules/public/booking-form.validation";

export async function bookService(
  technicianId: string,
  serviceId: string,
  data?: BookingFormInput,
) {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) {
    return {
      success: false,
      message,
    };
  }

  let addressId: string | null = null;
  if (data?.useExistingAddress) {
    const customer = await getMe();
    if (customer.data?.addresses?.length) {
      addressId = customer.data.addresses[0].id;
    }
  }

  const payload = {
    technicianId,
    serviceId,
    ...data,
    addressId,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!result.success) {
    return {
      success: result.success,
      message: result.message,
    };
  }

  return result;
}
