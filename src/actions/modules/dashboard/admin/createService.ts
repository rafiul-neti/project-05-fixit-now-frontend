"use server";

import { ICreateServiceResponse } from "@/lib/types/modules/admin/admin.types";
import { getAccessToken } from "@/service/getAccessToken";
import { revalidateTag } from "next/cache";

export interface ICreateServiceInput {
  categoryId: string;
  name: string;
  description: string;
}

export async function createService(
  input: ICreateServiceInput,
): Promise<ICreateServiceResponse> {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) throw new Error(message);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories/${input.categoryId}/services`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: input.name,
        description: input.description,
      }),
    },
  );

  const result: ICreateServiceResponse = await res.json();

  if (!result.success) throw new Error(result.message);

  revalidateTag("manage-categories", "max");

  return result;
}
