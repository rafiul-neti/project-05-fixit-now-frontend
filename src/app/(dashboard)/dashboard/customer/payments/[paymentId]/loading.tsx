import { Skeleton } from "@/components/ui/skeleton";

function InfoRowSkeleton() {
  return (
    <div className="flex items-start gap-3">
      <Skeleton className="h-9 w-9 flex-none rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-3 w-16" />
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

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Skeleton className="h-3 w-40" />
            <Skeleton className="mt-2 h-7 w-56" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <div className="flex flex-col gap-5">
          {/* Payment details */}
          <section className="fixit-card p-6">
            <Skeleton className="mb-5 h-4 w-32" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoRowSkeleton />
              <InfoRowSkeleton />
              <InfoRowSkeleton />
            </div>
          </section>

          {/* Service */}
          <section className="fixit-card p-6">
            <Skeleton className="mb-3 h-4 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-4/5" />
          </section>

          {/* Technician */}
          <section className="fixit-card p-6">
            <Skeleton className="mb-5 h-4 w-24" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 flex-none rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="mt-2 h-3 w-48" />
              </div>
            </div>
            <div className="fixit-divider my-5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </section>
        </div>

        {/* Bottom link */}
        <div className="mt-6">
          <Skeleton className="h-10 w-44" />
        </div>
      </div>
    </div>
  );
}
