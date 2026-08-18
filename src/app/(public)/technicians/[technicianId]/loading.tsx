import { Skeleton } from "@/components/ui/skeleton";

function InfoRowSkeleton() {
  return (
    <div className="flex items-start gap-3">
      <Skeleton className="h-9 w-9 flex-none rounded-md" />
      <div className="flex-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-2 h-4 w-28" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-3xl">
        {/* Back link */}
        <Skeleton className="mb-4 h-4 w-32" />

        {/* Header card */}
        <div className="fixit-card p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <Skeleton className="h-20 w-20 flex-none rounded-full" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-32" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-1.5 h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Details card */}
        <div className="fixit-card mt-4 p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoRowSkeleton />
            <InfoRowSkeleton />
            <InfoRowSkeleton />
            <InfoRowSkeleton />
            <InfoRowSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
