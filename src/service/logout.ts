"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookiestore = await cookies();
  cookiestore.delete("accessToken");
  cookiestore.delete("refreshToken");

  revalidateTag("my-profile", "max");
};
