import { z } from "zod";

export const reviewSchema = z.object({
  givenStars: z
    .number({ error: "Please select a rating" })
    .min(1, "Please select a rating")
    .max(5),
  content: z.string().max(1000, "Keep it under 1000 characters").optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
