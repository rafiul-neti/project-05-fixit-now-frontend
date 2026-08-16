import { z } from "zod";

export const idValidationSchema = z.object({
  id: z.uuid(),
});

export type T_Id = z.infer<typeof idValidationSchema>;
