"use server";

import { UserStatus } from "@/lib/types/enum";
import { IUpdateUserStatusResponse } from "@/lib/types/modules/admin/admin.types";
import { getAccessToken } from "@/service/getAccessToken";
import { idValidationSchema } from "@/validation";
import { revalidateTag } from "next/cache";

export async function updateUserStatus(
  userId: string,
  user_status: { status: UserStatus },
) {
  const { success, message, accessToken } = await getAccessToken();
  if (!success) throw new Error(message);

  const parsed = idValidationSchema.safeParse({ id: userId });
  if (!parsed.success) throw new Error(parsed.error.message);
  const { id } = parsed.data;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(user_status),
    },
  );

  const result: IUpdateUserStatusResponse = await res.json();

  if (!result.success) throw new Error(result.message);

  revalidateTag("manage-get-users", "max");

  return { data: result.data, message: result.message };
}
