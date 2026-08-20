import { BookingStatus } from "@/lib/types/enum";
import { z } from "zod";

export const idValidationSchema = z.object({
  id: z.uuid(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(BookingStatus, { error: "Invalid booking status." }),
});

export type T_Id = z.infer<typeof idValidationSchema>;
export type UpdateBookingStatus = z.infer<typeof updateBookingStatusSchema>;
