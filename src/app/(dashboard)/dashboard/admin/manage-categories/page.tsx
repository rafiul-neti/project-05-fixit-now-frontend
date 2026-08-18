import { getAllCategories } from "@/actions/modules/dashboard/admin/getAllCategories";
import ManageCategoriesClient from "@/components/modules/dashboard/admin/manage-categories/ManageCategoriesClient";

export default async function ManageCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <section className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage categories</h1>
          <p className="text-muted-foreground mt-1">
            Create service categories and add services under them.
          </p>
        </div>

        <ManageCategoriesClient initialCategories={categories} />
      </div>
    </section>
  );
}
