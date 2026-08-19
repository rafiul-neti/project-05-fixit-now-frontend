import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROW_COUNT = 6;

export default function Loading() {
  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>

        {/* Desktop / tablet: table skeleton */}
        <div className="fixit-card hidden overflow-hidden p-0 sm:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-(--background-secondary)">
                <th className="px-4 py-3 text-left font-semibold text-navy">
                  Service
                </th>
                <th className="px-4 py-3 text-left font-semibold text-navy">
                  Technician
                </th>
                <th className="px-4 py-3 text-left font-semibold text-navy">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-semibold text-navy">
                  Method
                </th>
                <th className="px-4 py-3 text-left font-semibold text-navy">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-navy">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-28" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked card skeletons */}
        <div className="flex flex-col gap-3 sm:hidden">
          {Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
            <div key={i} className="fixit-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="mt-1.5 h-3.5 w-1/2" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="fixit-divider my-3" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-4 w-14" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
