import { z } from "zod";

export const idValidationSchema = z.object({
  id: z.uuid(),
});
