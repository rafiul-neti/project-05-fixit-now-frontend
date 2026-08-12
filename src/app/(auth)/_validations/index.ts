import { USER_ROLE, WeekendDays } from "@/lib/types/enum";
import { z } from "zod";

// validation for user login
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

// validation for user registration
const baseRegisterSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(1, { error: "Please enter the password." })
    .min(8, { error: "Password must be at least 8 characters." }),
  phone: z
    .string()
    .min(11, { error: "Phone number must be at least 11 characters." }),
  profilePhoto: z.string().optional(),
});

const customerRegisterSchema = baseRegisterSchema.extend({
  registeringAs: z.literal(USER_ROLE.Customer),
});

const timeStringSchema = z
  .string()
  .regex(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "Invalid time — hours must be 00-23 and minutes must be 00-59",
  );

const technicianRegisterSchema = z.object({
  bio: z
    .string()
    .max(120, { error: "Bio must be within 120 characters." })
    .optional(),
  experienceYears: z.coerce
    .number()
    .min(0, { error: "Experience cannot be negative." })
    .optional(),
  hourlyRate: z.coerce
    .number()
    .positive({ error: "Hourly rate must be greater than 0." }),
  serviceAreas: z.string().min(1, {
    error: "Please enter your service areas.",
  }),
  weekendDays: z.enum([WeekendDays.FRI, WeekendDays.SAT, WeekendDays.SUN], {
    error: "Must be any of FRI, SAT, or SUN.",
  }),
  startTime: timeStringSchema,
  endTime: timeStringSchema,
});

export const registerInputSchema = z.discriminatedUnion("registeringAs", [
  customerRegisterSchema,

  baseRegisterSchema.extend({
    registeringAs: z.literal(USER_ROLE.Technician),
    technician: technicianRegisterSchema,
  }),
]);

export type LoginInput = z.infer<typeof loginInputSchema>;
export type RegisterInput = z.input<typeof registerInputSchema>;
export type RegisterOutput = z.output<typeof registerInputSchema>;
