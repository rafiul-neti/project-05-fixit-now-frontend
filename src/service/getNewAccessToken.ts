"use server";

export const getNewAccessToken = async (token: string) => {
  if (!token) {
    return {
      success: false,
      message: "Refresh token not found!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${token}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();

  return result;
};
