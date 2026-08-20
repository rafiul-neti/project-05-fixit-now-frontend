"use server";

import { cookies } from "next/headers";
import { LoginInput, RegisterOutput } from "../_validations";
import { USER_ROLE } from "@/lib/types/enum";

export const loginAction = async ({ email, password }: LoginInput) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();

  if (!result.success) {
    return {
      success: result.success,
      message: result.message ?? "Something went wrong! Please try again.",
    };
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

  return { data: result, message: result.message };
};

export const registerAction = async (data: RegisterOutput) => {
  const payload = {
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
    registeringAs: data.registeringAs,
    profilePhoto: data.profilePhoto,

    ...(data.registeringAs === USER_ROLE.Technician && data.technician),
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

  return { success: result.success, data: result };
};
