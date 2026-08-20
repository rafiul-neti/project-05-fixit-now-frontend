import { z } from "zod";

const newAddressSchema = z.object({
  addressLine1: z.string().min(1, "Address line 1 is required."),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  region: z.string().min(1, "Region is required."),
  postCode: z.string().min(1, "Postcode is required."),
});

export const bookingFormSchema = z
  .object({
    useExistingAddress: z.boolean(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    region: z.string().optional(),
    postCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.useExistingAddress) return;

    const result = newAddressSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({ ...issue, path: issue.path });
      }
    }
  });

export type BookingFormInput = z.infer<typeof bookingFormSchema>;
