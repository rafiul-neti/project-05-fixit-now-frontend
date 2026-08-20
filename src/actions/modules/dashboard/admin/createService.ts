"use server";

import { ICreateServiceResponse } from "@/lib/types/modules/admin/admin.types";
import { getAccessToken } from "@/service/getAccessToken";
import { revalidateTag } from "next/cache";

export interface ICreateServiceInput {
  categoryId: string;
  name: string;
  description: string;
}

export async function createService(initialPayload: ICreateServiceInput) {
  const { success, message, accessToken } = await getAccessToken();

  if (!success) {
    return {
      success,
      message,
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories/${initialPayload.categoryId}/services`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: initialPayload.name,
        description: initialPayload.description,
      }),
    },
  );

  const result: ICreateServiceResponse = await res.json();

  if (!result.success) {
    return {
      success: result.success,
      message: result.message,
    };
  }

  revalidateTag("manage-categories", "max");

  return result;
}
