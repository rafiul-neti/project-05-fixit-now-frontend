import { Skeleton } from "@/components/ui/skeleton";

function ServiceCardSkeleton() {
  return (
    <div className="fixit-card flex flex-col p-5">
      <Skeleton className="h-10 w-10 rounded-md" />
      <Skeleton className="mt-3 h-4 w-2/3" />
      <Skeleton className="mt-2 h-3.5 w-full" />
      <Skeleton className="mt-1.5 h-3.5 w-4/5" />
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container">
        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          {/* Category sidebar */}
          <aside>
            <Skeleton className="mb-2 h-3 w-20" />
            <div className="flex gap-2 overflow-hidden lg:flex-col">
              <Skeleton className="h-9 w-24 flex-none rounded-md lg:w-full" />
              <Skeleton className="h-9 w-24 flex-none rounded-md lg:w-full" />
              <Skeleton className="h-9 w-24 flex-none rounded-md lg:w-full" />
              <Skeleton className="h-9 w-24 flex-none rounded-md lg:w-full" />
              <Skeleton className="h-9 w-24 flex-none rounded-md lg:w-full" />
            </div>
          </aside>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
