import React from "react";

export function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-md bg-brand-light text-brand">
        <Icon size={17} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted">{label}</p>
        <p className="truncate text-sm font-semibold text-navy">{value}</p>
      </div>
    </div>
  );
}