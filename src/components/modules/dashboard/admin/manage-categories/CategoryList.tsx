import { ICategory } from "@/lib/types/modules/admin/admin.types";

interface CategoryListProps {
  categories: ICategory[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="fixit-card py-12 text-center text-muted-foreground">
        No categories yet. Create one above to get started.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {categories.map((category) => (
        <div key={category.id} className="fixit-card p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-medium">{category.name}</h3>
            <span className="fixit-badge bg-(--info-light) text-(--info)">
              {category.services.length}{" "}
              {category.services.length === 1 ? "service" : "services"}
            </span>
          </div>

          {category.services.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No services under this category yet.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {category.services.map((service) => (
                <li
                  key={service.id}
                  className="rounded-md border border-border p-3"
                >
                  <p className="font-medium text-sm">{service.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
