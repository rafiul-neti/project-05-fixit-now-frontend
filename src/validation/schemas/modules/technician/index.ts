import { WeekendDays } from "@/lib/types/enum";
import { z } from "zod";
const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Enter a valid time (HH:mm).");

export const updateAvailabilitySchema = z
  .object({
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    weekendDays: z.enum(WeekendDays),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "Start time must be before end time.",
    path: ["endTime"],
  });

export type UpdateAvailabilityInput = z.infer<typeof updateAvailabilitySchema>;
