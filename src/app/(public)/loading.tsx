import { Skeleton } from "@/components/ui/skeleton";

function ServiceIconSkeleton() {
  return (
    <div className="flex flex-col items-center text-center">
      <Skeleton className="h-16 w-16 rounded-2xl" />
      <Skeleton className="mt-4 h-3.5 w-16" />
    </div>
  );
}

function TechnicianCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-2 h-3.5 w-1/2" />
        <div className="mt-3 flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

function TestimonialCardSkeleton() {
  return (
    <div className="h-full rounded-2xl border border-border bg-background p-6">
      <div className="mb-5 flex items-center justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded-sm" />
          ))}
        </div>
      </div>
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="mt-2 h-3.5 w-full" />
      <Skeleton className="mt-2 h-3.5 w-3/4" />
      <div className="mt-6 flex items-center gap-3 border-t pt-5">
        <Skeleton className="h-11 w-11 flex-none rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="mt-1.5 h-3 w-28" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main>
      {/* Slider has no data dependency (hardcoded slides) — rendered as a
          plain hero-shaped placeholder here just to hold layout space and
          avoid a jarring blank gap above the sections that ARE loading. */}
      <section className="relative min-h-130 w-full overflow-hidden bg-slate-200 sm:min-h-145 lg:min-h-[85vh] dark:bg-slate-800" />

      <div>
        {/* Services skeleton */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Skeleton className="mx-auto h-8 w-64" />
            <Skeleton className="mx-auto mt-3 h-4 w-56" />
          </div>

          <div className="grid grid-cols-2 gap-6 pt-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <ServiceIconSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Technicians skeleton */}
        <section>
          <div className="fixit-container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <Skeleton className="mx-auto h-8 w-64" />
              <Skeleton className="mx-auto mt-2 h-4 w-48" />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <TechnicianCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* JoinTechnicianSection intentionally omitted — not shown, and
            per user, not part of the initial home page render anyway. */}

        {/* Testimonials skeleton */}
        <section className="overflow-hidden py-20 lg:py-24">
          <div className="fixit-container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <Skeleton className="mx-auto h-4 w-24" />
              <Skeleton className="mx-auto mt-2 h-8 w-56" />
              <Skeleton className="mx-auto mt-3 h-4 w-64" />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCardSkeleton />
              <TestimonialCardSkeleton />
              <TestimonialCardSkeleton />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
