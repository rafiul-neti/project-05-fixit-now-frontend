import { z } from "zod";

export const loginInputSchema = z.object({
  email: z.email({ error: "Please enter a valid email address!" }),
  password: z
    .string()
    .min(1, {
      error: "Please enter your password.",
    })
    .min(8, {
      error: "Password must be at least 8 characters.",
    }),
});

export type LoginPayload = z.infer<typeof loginInputSchema>;
