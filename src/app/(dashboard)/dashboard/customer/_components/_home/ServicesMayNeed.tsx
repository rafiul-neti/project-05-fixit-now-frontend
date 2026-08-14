import React from "react";
import { getCategories } from "../../_actions/getCategories";
import { Category } from "@/lib/types/modules/category/category.types";
import {
  Bug,
  Hammer,
  Paintbrush,
  Settings2,
  SprayCan,
  Wrench,
  Wind,
  Zap,
  ChevronRight,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Painting: Paintbrush,
  Electrical: Zap,
  Cleaning: SprayCan,
  Plumbing: Wrench,
  Carpentry: Hammer,
  "Appliance Repair": Settings2,
  "Pest Control": Bug,
  HVAC: Wind,
};

const ServicesMayNeed = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div className="py-16">
      <h2 className="pb-4 text-2xl font-semibold tracking-tight">
        Services You May Need
      </h2>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category.name] ?? Hammer;
          return (
            <div
              key={category.id}
              className="group flex cursor-pointer flex-col items-center text-center"
            >
              {/* Icon */}
              <div
                className="
                    flex h-16 w-16 items-center justify-center
                    rounded-2xl
                    bg-(--color-primary-light)
                    text-slate-500
                    transition-all duration-300
                    group-hover:bg-(--color-primary)
                    group-hover:text-white
                    group-hover:-translate-y-1
                  "
              >
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>

              {/* Service name */}
              <h3
                className="
                    mt-4 text-sm font-semibold
                    text-slate-700
                    transition-colors duration-300
                    group-hover:text-(--color-primary)
                    dark:text-slate-300
                  "
              >
                {category.name}
              </h3>

              {/* Arrow */}
              <ChevronRight
                className="
                    mt-1 h-4 w-4
                    text-transparent
                    transition-all duration-300
                    group-hover:translate-x-1
                    group-hover:text-(--color-primary)
                  "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesMayNeed;
