import jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);

    return { success: true, data: verifiedToken };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const jwtUtils = { verifyToken };
