import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookNowDialog } from "./BookNowDialog";
import { ServiceTechnician } from "@/lib/types/modules/service/service.types";
import { initials } from "@/app/(dashboard)/dashboard/customer/_utils";

function TechnicianRow({
  technician,
  rank,
}: {
  technician: ServiceTechnician;
  rank: number;
}) {
  return (
    <div className="fixit-card flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-navy text-base font-bold text-white">
        {initials(technician.name)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="font-semibold text-navy">{technician.name}</p>
          {rank === 1 && (
            <span
              className="fixit-badge status-success"
              style={{ border: "none" }}
            >
              Top rated
            </span>
          )}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-secondary">
          <span className="flex items-center gap-1">
            <Star size={14} className="fill-(--warning) text-(--warning)" />
            {technician.averageRating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <span
              className="flex h-4 w-4 items-center justify-center text-sm font-extrabold leading-none text-brand"
              aria-hidden="true"
            >
              ৳
            </span>
            {technician.hourlyRate}/hr
          </span>
        </div>
        <p className="mt-2 text-sm text-secondary">{technician.bio}</p>
      </div>

      <div className="flex flex-none gap-2 sm:flex-col">
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          className={`btn-secondary`}
          render={<Link href={`/technicians/${technician.id}`} />}
        >
          Technician details
        </Button>
        <BookNowDialog
          technicianId={technician.id}
          technicianName={technician.name}
          serviceName={technician.serviceName}
          serviceId={technician.serviceId}
          serviceCategory={technician.serviceCategory}
        />
      </div>
    </div>
  );
}

export function TechnicianList({
  technicians,
}: {
  technicians: ServiceTechnician[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {technicians.map((technician, index) => (
        <TechnicianRow
          key={technician.id}
          technician={technician}
          rank={index + 1}
        />
      ))}
    </div>
  );
}
