import { Skeleton } from "@/components/ui/skeleton";

function SectionCardSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <section className="fixit-card p-6">
      <Skeleton className="mb-5 h-4 w-32" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {Array.from({ length: rows * 2 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-9 w-9 flex-none rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="mt-2 h-4 w-28" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Skeleton className="h-3 w-40" />
            <Skeleton className="mt-2 h-7 w-56" />
            <Skeleton className="mt-2 h-4 w-44" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="flex flex-col gap-5">
          {/* Timeline */}
          <SectionCardSkeleton rows={2} />

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
            <div className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 flex-none rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="mt-2 h-4 w-40" />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="fixit-card p-6">
            <Skeleton className="mb-5 h-4 w-32" />
            <div className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 flex-none rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="mt-2 h-4 w-full max-w-md" />
              </div>
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
