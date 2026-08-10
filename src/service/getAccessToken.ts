import { cookies } from "next/headers";
import { getNewAccessToken } from "./getNewAccessToken";

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  if (!accessToken && refreshToken) {
    // Access token expired but refresh token is still valid

    const result = await getNewAccessToken(refreshToken);

    if (!result.success) return { success: false, message: result.message };

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      accessToken = newAccessToken;
    }
  }

  return { success: true, accessToken };
};
