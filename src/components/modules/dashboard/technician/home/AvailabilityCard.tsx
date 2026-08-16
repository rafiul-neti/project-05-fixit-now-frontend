import { Clock, Calendar } from "lucide-react";
import type { TechnicianAvailability } from "@/lib/types/modules/technician/technician.types";

const WEEKEND_DAY_LABEL: Record<TechnicianAvailability["weekendDays"], string> =
  {
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
  };

function formatTime(time: string) {
  // "09:00" -> "9:00 AM"
  const [hourStr, minute] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${period}`;
}

export function AvailabilityCard({
  availability,
}: {
  availability: TechnicianAvailability;
}) {
  return (
    <section className="fixit-card p-6">
      <h2 className="mb-4 text-base font-bold text-navy">Availability</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-brand-light text-brand">
            <Clock size={17} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted">Working hours</p>
            <p className="text-sm font-semibold text-navy">
              {formatTime(availability.startTime)} –{" "}
              {formatTime(availability.endTime)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-brand-light text-brand">
            <Calendar size={17} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted">Day off</p>
            <p className="text-sm font-semibold text-navy">
              {WEEKEND_DAY_LABEL[availability.weekendDays]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
