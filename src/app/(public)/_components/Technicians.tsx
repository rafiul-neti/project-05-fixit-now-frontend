"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { TechniciansSectionProps } from "../_types";
import Link from "next/link";

export default function Technicians({
  technicians,
  className,
}: TechniciansSectionProps) {
  return (
    <section className={`${className && className}`}>
      <div className="fixit-container">
        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="heading-secondary">Meet With Professionals</h2>

          <p className="text-muted mt-2">
            Trusted professionals, ready to help.
          </p>
        </div>

        {/* Technicians */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {technicians.map((technician, index) => {
            const averageRating =
              technician.reviews.length > 0
                ? technician.reviews.reduce(
                    (sum, review) => sum + review.givenStars,
                    0,
                  ) / technician.reviews.length
                : 0;

            const serviceName =
              technician.technicianServices?.[0]?.service?.name ??
              "Home Services";

            const imageSrc =
              technician.profilePhoto ||
              `/images/technician-${String(index + 1).padStart(2, "0")}.webp`;

            return (
              <div
                key={technician.id}
                className="
                  group overflow-hidden rounded-2xl border
                  bg-background
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                {/* Technician Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={imageSrc}
                    alt={technician.user.name}
                    fill
                    sizes="
                      (max-width: 767px) 50vw,
                      (max-width: 1023px) 33vw,
                      25vw
                    "
                    className="
                      object-cover
                      transition-transform duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="truncate text-base font-semibold text-navy">
                    {technician.user.name}
                  </h3>

                  <p className="text-muted mt-1 truncate text-sm">
                    {serviceName}
                  </p>

                  {/* Rating */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                      <span className="text-sm font-semibold">
                        {averageRating.toFixed(1)}
                      </span>

                      <span className="text-muted text-xs">
                        ({technician._count.reviews} reviews)
                      </span>
                    </div>

                    <Link
                      className={`flex items-center text-white px-2 py-1 rounded bg-(--success)`}
                      href={`/technicians/${technician.id}`}
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
