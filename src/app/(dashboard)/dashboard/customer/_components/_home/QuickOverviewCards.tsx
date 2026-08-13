import { LucideIcon } from "lucide-react";

type QuickOverviewCardsProps = {
  title: string;
  count: number;
  icon: LucideIcon;
  subtitile: string;
};

const QuickOverviewCards = ({
  title,
  count,
  icon: Icon,
  subtitile,
}: QuickOverviewCardsProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-900">{title}</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-(--color-primary-hover)">
            {count}
          </h1>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--color-primary-light)/95">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{subtitile}</p>
    </div>
  );
};

export default QuickOverviewCards;
