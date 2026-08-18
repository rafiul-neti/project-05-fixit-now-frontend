import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import { getTechnicianDetailsByID } from "@/actions/modules/public/technician/getTechnicianDetailsByID";
import type { ITechnicianDetail } from "@/lib/types/modules/public/public.type";
import Image from "next/image";
import { initials } from "@/app/(dashboard)/dashboard/customer/_utils";
import { formatTechnicianAvailabilityTime } from "@/utils/formattedDate";
import { InfoRow } from "@/app/(dashboard)/dashboard/customer/_components/InfoRow";

const WEEKEND_DAY_LABEL: Record<
  ITechnicianDetail["availability"]["weekendDays"],
  string
> = {
  FRI: "Friday",
  SAT: "Saturday",
  SUN: "Sunday",
};

export default async function TechnicianDetailPage({
  params,
}: {
  params: Promise<{ technicianId: string }>;
}) {
  const { technicianId } = await params;
  const technician: ITechnicianDetail = await getTechnicianDetailsByID(technicianId);

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-3xl">
        <Link
          href="/services"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-navy transition-colors"
        >
          <ArrowLeft size={15} />
          Back to services
        </Link>

        {/* Header */}
        <div className="fixit-card p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            {technician.profilePhoto ? (
              <Image
                src={technician.profilePhoto}
                alt=""
                className="h-20 w-20 flex-none rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-navy text-2xl font-bold text-white">
                {initials(technician.user.name)}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="heading-secondary">{technician.user.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-secondary">
                <span className="inline-flex items-center gap-1">
                  <Star
                    size={14}
                    className="fill-(--warning) text-(--warning)"
                  />
                  {technician.averageRating.toFixed(1)}
                  <span className="text-muted">
                    ({technician._count.reviews} reviews)
                  </span>
                </span>
              </div>
              <p className="mt-3 text-sm text-secondary">{technician.bio}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="fixit-card mt-4 p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoRow
              icon={Briefcase}
              label="Experience"
              value={`${technician.experienceYears} yrs`}
            />
            <InfoRow
              icon={() => (
                <span
                  className="flex h-full w-full items-center justify-center text-base font-extrabold leading-none"
                  aria-hidden="true"
                >
                  ৳
                </span>
              )}
              label="Hourly rate"
              value={`${technician.hourlyRate}/hr`}
            />
            <InfoRow
              icon={Clock}
              label="Working hours"
              value={`${formatTechnicianAvailabilityTime(technician.availability.startTime)} – ${formatTechnicianAvailabilityTime(
                technician.availability.endTime,
              )}`}
            />
            <InfoRow
              icon={Calendar}
              label="Day off"
              value={WEEKEND_DAY_LABEL[technician.availability.weekendDays]}
            />
            <InfoRow
              icon={MapPin}
              label="Service areas"
              value={technician.serviceAreas.join(", ")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
