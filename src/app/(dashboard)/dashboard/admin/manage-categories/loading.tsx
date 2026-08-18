import { Skeleton } from "@/components/ui/skeleton";

export default function ManageCategoriesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80 mt-2" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="fixit-card p-4 sm:p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full mt-3" />
        </div>
        <div className="fixit-card p-4 sm:p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full mt-3" />
          <Skeleton className="h-10 w-full mt-3" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="fixit-card p-4 sm:p-6">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full mt-3" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
