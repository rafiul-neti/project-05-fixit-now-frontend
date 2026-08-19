import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SKELETON_TAB_COUNT = 4;
const SKELETON_CARD_COUNT = 6;

export default function Loading() {
  return (
    <section className="w-full p-5">
      <div className="flex gap-6 border-b border-border pb-2">
        {Array.from({ length: SKELETON_TAB_COUNT }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-20" />
        ))}
      </div>

      {/* Card grid, matching ServicesUnderCategory's real breakpoints */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: SKELETON_CARD_COUNT }).map((_, i) => (
          <Card key={i} className="p-3">
            <CardHeader>
              <Skeleton className="h-5 w-2/3" />
            </CardHeader>
            <div className="px-6">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="mt-1.5 h-3.5 w-4/5" />
            </div>
            <CardContent className="w-1/2">
              <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
