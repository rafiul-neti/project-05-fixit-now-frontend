import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name must be under 100 characters"),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;

export const createServiceSchema = z.object({
  categoryId: z.string().min(1, "Choose a category"),
  name: z
    .string()
    .trim()
    .min(1, "Service name is required")
    .max(100, "Service name must be under 100 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description must be under 500 characters"),
});

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>;
