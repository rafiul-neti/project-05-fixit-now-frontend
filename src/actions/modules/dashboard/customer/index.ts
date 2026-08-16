"use server";

import { getAccessToken } from "@/service/getAccessToken";
import { idValidationSchema } from "@/validation";

export async function getCustomerPayments() {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) throw new Error(message);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1 day
      tags: ["customer-payments"],
    },
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function getCustomerPaymentDetails(paymentId: string) {
  const { success, accessToken, message } = await getAccessToken();
  if (!success) throw new Error(message);

  const parsed = idValidationSchema.safeParse({ id: paymentId });
  if (!parsed.success) {
    throw new Error("Invalid payment reference.");
  }

  const { id } = parsed.data;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1 day
      tags: ["customer-payments"],
    },
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  console.dir(result.data, { depth: null });

  return result.data;
}
