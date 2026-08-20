import { cookies } from "next/headers";
import { getNewAccessToken } from "./getNewAccessToken";
import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return {
      success: false,
      message: "You are not logged in! Please login.",
    };
  }

  let decodedAccessToken = accessToken
    ? (jwtUtils.verifyToken(
        accessToken as string,
        process.env.JWT_ACCESS_SECRET!,
      ) as JwtPayload)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        accessToken as string,
        process.env.JWT_REFRESH_SECRET!,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    // Access token expired but refresh token is still valid

    const result = await getNewAccessToken(refreshToken!);

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      accessToken = newAccessToken;

      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET!,
      ) as JwtPayload;
    } else {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");

      return { success: false, message: result.message + " Please login." };
    }
  }

  return { success: true, accessToken, role: decodedAccessToken?.data.role };
};
