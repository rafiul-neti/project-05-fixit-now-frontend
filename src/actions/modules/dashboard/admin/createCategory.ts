"use server";

import { ICreateCategoryResponse } from "@/lib/types/modules/admin/admin.types";
import { getAccessToken } from "@/service/getAccessToken";
import { revalidateTag } from "next/cache";

export async function createCategory(name: string) {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) throw new Error(message);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ name }),
    },
  );

  const result: ICreateCategoryResponse = await res.json();

  if (!result.success) throw new Error(result.message);

  revalidateTag("manage-categories", "max");

  return { category: result.data, message: result.message };
}
