"use server";

import { getAccessToken } from "@/service/getAccessToken";
import { idValidationSchema } from "@/validation";

export async function getCustomerPayments() {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) {
    return {
      success: false,
      message: message ?? "You're not logged in! Please log in.",
    };
  }

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
    return {
      success: result.success,
      message: result.message,
    };
  }

  return { success: result.success, data: result.data };
}

export async function getCustomerPaymentDetails(paymentId: string) {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) {
    return {
      success: false,
      message: message ?? "You're not logged in! Please log in.",
    };
  }

  const parsed = idValidationSchema.safeParse({ id: paymentId });
  if (!parsed.success) {
    const parsedMessage =
      parsed.error.issues[0]?.message ?? "Invalid payment reference.";
    return {
      success: false,
      message: parsedMessage,
    };
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
    return {
      success: result.success,
      message: result.message,
    };
  }

  return { success: result.success, data: result.data };
}
