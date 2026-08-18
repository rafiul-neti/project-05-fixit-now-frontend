"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICategory } from "@/lib/types/modules/admin/admin.types";
import { CreateCategoryFormValues, createCategorySchema } from "@/validation/schemas/modules/admin/manage-categories";
import { createCategory } from "@/actions/modules/dashboard/admin/createCategory";

interface CreateCategoryFormProps {
  onCreated: (category: ICategory) => void;
}

export default function CreateCategoryForm({
  onCreated,
}: CreateCategoryFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: "" },
  });

  async function onSubmit(values: CreateCategoryFormValues) {
    setSubmitError(null);
    try {
      const category = await createCategory(values.name);
      onCreated(category);
      reset();
    } catch {
      setSubmitError("Couldn't create the category. Try again.");
    }
  }

  return (
    <div className="fixit-card p-4 sm:p-6">
      <h2 className="font-medium">New category</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start"
        noValidate
      >
        <div className="flex-1">
          <label
            htmlFor="category-name"
            className="block text-sm text-muted-foreground mb-1"
          >
            Category name
          </label>
          <input
            id="category-name"
            type="text"
            placeholder="e.g. Electrical"
            className="fixit-input w-full"
            disabled={isSubmitting}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-(--error)">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary sm:w-auto sm:mt-6"
        >
          {isSubmitting ? "Creating…" : "Create category"}
        </button>
      </form>

      {submitError && (
        <p className="mt-2 text-sm text-(--error)">{submitError}</p>
      )}
    </div>
  );
}
