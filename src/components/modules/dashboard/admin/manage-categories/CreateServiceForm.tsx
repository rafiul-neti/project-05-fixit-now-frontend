"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICategory, ICategoryService } from "@/lib/types/modules/admin/admin.types";
import { CreateServiceFormValues, createServiceSchema } from "@/validation/schemas/modules/admin/manage-categories";
import { createService } from "@/actions/modules/dashboard/admin/createService";

interface CreateServiceFormProps {
  categories: ICategory[];
  onCreated: (categoryId: string, service: ICategoryService) => void;
}

export default function CreateServiceForm({
  categories,
  onCreated,
}: CreateServiceFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const hasCategories = categories.length > 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      categoryId: categories[0]?.id ?? "",
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (categories.length > 0) {
      reset((current) => ({
        ...current,
        categoryId: current.categoryId || categories[0].id,
      }));
    }
  }, [categories, reset]);

  async function onSubmit(values: CreateServiceFormValues) {
    setSubmitError(null);
    try {
      const service = await createService(values);
      onCreated(values.categoryId, {
        id: service.id,
        name: service.name,
        description: service.description,
      });
      reset({
        categoryId: values.categoryId,
        name: "",
        description: "",
      });
    } catch {
      setSubmitError("Couldn't create the service. Try again.");
    }
  }

  return (
    <div className="fixit-card p-4 sm:p-6">
      <h2 className="font-medium">New service</h2>

      {!hasCategories ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Create a category first before adding a service.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-3 flex flex-col gap-3"
          noValidate
        >
          <div>
            <label
              htmlFor="service-category"
              className="block text-sm text-muted-foreground mb-1"
            >
              Category
            </label>
            <select
              id="service-category"
              className="fixit-input w-full sm:w-64"
              disabled={isSubmitting}
              {...register("categoryId")}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-(--error)">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="service-name"
                className="block text-sm text-muted-foreground mb-1"
              >
                Service name
              </label>
              <input
                id="service-name"
                type="text"
                placeholder="e.g. Pipe Leak Repair"
                className="fixit-input w-full"
                disabled={isSubmitting}
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-(--error)">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="service-description"
                className="block text-sm text-muted-foreground mb-1"
              >
                Description
              </label>
              <input
                id="service-description"
                type="text"
                placeholder="Short description of the service"
                className="fixit-input w-full"
                disabled={isSubmitting}
                {...register("description")}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-(--error)">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full sm:w-auto"
            >
              {isSubmitting ? "Creating…" : "Create service"}
            </button>
          </div>
        </form>
      )}

      {submitError && (
        <p className="mt-2 text-sm text-(--error)">{submitError}</p>
      )}
    </div>
  );
}
