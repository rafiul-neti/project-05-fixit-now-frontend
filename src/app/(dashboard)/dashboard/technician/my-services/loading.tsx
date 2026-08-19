import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_CARD_COUNT = 3;

function ServiceRowSkeleton() {
  return (
    <div className="fixit-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-3.5 w-full" />
          <Skeleton className="mt-1.5 h-3.5 w-3/4" />
          <Skeleton className="mt-2 h-3 w-20" />
        </div>

        {/* Active/Inactive label + toggle */}
        <div className="flex flex-none items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-6 w-11 rounded-full" />
        </div>
      </div>

      <div className="fixit-divider my-4" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container flex flex-col gap-6">
        <div>
          <Skeleton className="h-8 w-36" />
          <Skeleton className="mt-2 h-4 w-80" />
        </div>

        <div className="flex flex-col gap-3">
          {Array.from({ length: SKELETON_CARD_COUNT }).map((_, i) => (
            <ServiceRowSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
