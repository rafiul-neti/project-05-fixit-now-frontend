export function DashboardStatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="fixit-card flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-brand-light text-brand">
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted">{label}</p>
        <p className="truncate text-xl font-bold text-navy">{value}</p>
      </div>
    </div>
  );
}
