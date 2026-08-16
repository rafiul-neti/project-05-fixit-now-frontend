import { TechnicianDashboardData } from "@/lib/types/modules/technician/technician.types";
import { Briefcase, MapPin } from "lucide-react";
import Image from "next/image";

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function ProfileCard({ data }: { data: TechnicianDashboardData }) {
  return (
    <section className="fixit-card p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Avatar */}
        {data.profilePhoto ? (
          <Image
            src={data.profilePhoto}
            alt=""
            width={80}
            height={80}
            className="h-20 w-20 flex-none rounded-full object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-navy text-2xl font-bold text-white">
            {initials(data.user.name)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm text-secondary">{data.bio}</p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase size={16} className="text-brand" />
              <span className="font-semibold text-navy">
                {data.experienceYears}
              </span>
              <span className="text-secondary">yrs experience</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span
                className="flex h-4 w-4 items-center justify-center text-base font-extrabold leading-none text-brand"
                aria-hidden="true"
              >
                ৳
              </span>
              <span className="font-semibold text-navy">{data.hourlyRate}</span>
              <span className="text-secondary">/ hr</span>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <MapPin size={16} className="mt-0.5 flex-none text-brand" />
              <span className="text-secondary">
                {data.serviceAreas.join(", ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
