import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_CARD_COUNT = 3;

function IncomingBookingCardSkeleton() {
  return (
    <div className="fixit-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="mt-2 h-3.5 w-full" />
          <Skeleton className="mt-1.5 h-3.5 w-3/4" />
          <Skeleton className="mt-3 h-3.5 w-36" />
        </div>
      </div>

      <div className="fixit-divider my-4" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-1.5 h-4 w-32" />
          <Skeleton className="mt-1.5 h-3.5 w-28" />
        </div>
        <div>
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-1.5 h-4 w-full" />
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container flex flex-col gap-6">
        <div>
          <Skeleton className="h-8 w-56" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>

        <div className="flex flex-col gap-4">
          {Array.from({ length: SKELETON_CARD_COUNT }).map((_, i) => (
            <IncomingBookingCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
