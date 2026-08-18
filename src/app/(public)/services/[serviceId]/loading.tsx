import { Skeleton } from "@/components/ui/skeleton";

function TechnicianRowSkeleton() {
  return (
    <div className="fixit-card flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
      <Skeleton className="h-12 w-12 flex-none rounded-full" />

      <div className="min-w-0 flex-1">
        <Skeleton className="h-4 w-32" />
        <div className="mt-2 flex items-center gap-4">
          <Skeleton className="h-3.5 w-10" />
          <Skeleton className="h-3.5 w-14" />
        </div>
        <Skeleton className="mt-3 h-3.5 w-full" />
        <Skeleton className="mt-1.5 h-3.5 w-4/5" />
      </div>

      <div className="flex flex-none gap-2 sm:flex-col">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-9 w-36" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-3xl">
        {/* Back link */}
        <Skeleton className="mb-4 h-4 w-28" />

        {/* Header */}
        <div className="mb-8">
          <Skeleton className="mb-2 h-5 w-20 rounded-full" />
          <Skeleton className="h-7 w-56" />
          <Skeleton className="mt-2 h-4 w-full max-w-md" />
        </div>

        {/* Section heading */}
        <Skeleton className="mb-3 h-4 w-40" />

        {/* Technician rows */}
        <div className="flex flex-col gap-3">
          <TechnicianRowSkeleton />
          <TechnicianRowSkeleton />
          <TechnicianRowSkeleton />
        </div>
      </div>
    </div>
  );
}
