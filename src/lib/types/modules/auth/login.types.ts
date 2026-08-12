import { USER_ROLE } from "../../enum";

export type LoginPrevState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    role: USER_ROLE;
  };
  error?: unknown;
};
