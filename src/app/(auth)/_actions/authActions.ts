"use server";

// import { LoginPrevState } from "@/lib/types/modules/auth/login.types";
import { cookies } from "next/headers";
import { LoginPayload } from "../_validations";

export const loginAction = async ({ email, password }: LoginPayload) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  if (result.success && result.data) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
  }

  console.log(result);

  return result;
};
