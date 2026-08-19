import { Skeleton } from "@/components/ui/skeleton";

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
            <Skeleton className="h-10 w-40 bg-white/20 sm:h-12 sm:w-52" />
            <div className="mt-4 flex items-center gap-2">
              <Skeleton className="h-4 w-12 bg-white/20" />
              <Skeleton className="h-4 w-3 bg-white/20" />
              <Skeleton className="h-4 w-16 bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* AboutIntro skeleton */}
      <section className="bg-(--color-primary-light) py-20 lg:py-24">
        <div className="fixit-container">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Skeleton className="h-10 w-full max-w-xl sm:h-12" />
            <Skeleton className="mt-3 h-10 w-2/3 max-w-md sm:h-12" />
            <Skeleton className="mt-5 h-4 w-full max-w-2xl" />
            <Skeleton className="mt-2 h-4 w-4/5 max-w-xl" />
            <Skeleton className="mt-8 h-12 w-52 rounded-lg" />
          </div>
        </div>
      </section>

      {/* AboutSection skeleton */}
      <section className="py-20 lg:py-24">
        <div className="mb-2 flex justify-center">
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="fixit-container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left visual block */}
            <Skeleton className="h-96 w-full rounded-3xl" />

            {/* Right content block */}
            <div>
              <Skeleton className="h-9 w-full max-w-sm sm:h-10" />
              <Skeleton className="mt-3 h-9 w-2/3 max-w-xs sm:h-10" />
              <Skeleton className="mt-5 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />

              {/* Highlight rows */}
              <div className="mt-8 flex flex-col gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-11 w-11 flex-none rounded-xl" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="mt-1.5 h-3.5 w-full" />
                    </div>
                  </div>
                ))}
              </div>

              <Skeleton className="mt-9 h-11 w-52 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
