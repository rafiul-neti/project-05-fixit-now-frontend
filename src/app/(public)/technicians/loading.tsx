import { Skeleton } from "@/components/ui/skeleton";

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
    <div>
      {/* PageBanner skeleton */}
      <section
        className="
          relative overflow-hidden
          bg-linear-to-br
          from-(--color-primary-hover)
          via-(--color-primary)
          to-[#062b52]
          py-16 sm:py-20
        "
      >
        <div className="fixit-container relative">
          <div className="flex flex-col items-center text-center">
            <Skeleton className="h-10 w-52 bg-white/20 sm:h-12 sm:w-64" />
            <div className="mt-4 flex items-center gap-2">
              <Skeleton className="h-4 w-12 bg-white/20" />
              <Skeleton className="h-4 w-3 bg-white/20" />
              <Skeleton className="h-4 w-24 bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Technicians grid skeleton */}
      <section className="py-20 lg:py-24">
        <div className="fixit-container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Skeleton className="mx-auto h-8 w-64" />
            <Skeleton className="mx-auto mt-2 h-4 w-48" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <TechnicianCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials skeleton */}
      <section className="overflow-hidden pb-20 lg:pb-24">
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
  );
}
