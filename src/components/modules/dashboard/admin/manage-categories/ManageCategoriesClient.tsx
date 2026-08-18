"use client";

import { useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import CreateServiceForm from "./CreateServiceForm";
import CategoryList from "./CategoryList";
import { ICategory, ICategoryService } from "@/lib/types/modules/admin/admin.types";

interface ManageCategoriesClientProps {
  initialCategories: ICategory[];
}

export default function ManageCategoriesClient({
  initialCategories,
}: ManageCategoriesClientProps) {
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);

  function handleCategoryCreated(category: ICategory) {
    setCategories((prev) => [category, ...prev]);
  }

  function handleServiceCreated(categoryId: string, service: ICategoryService) {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, services: [...category.services, service] }
          : category,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CreateCategoryForm onCreated={handleCategoryCreated} />
        <CreateServiceForm
          categories={categories}
          onCreated={handleServiceCreated}
        />
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}
