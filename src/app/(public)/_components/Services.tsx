"use client";

import React from "react";
import {
  AirVent,
  Bug,
  ChevronRight,
  Fan,
  Hammer,
  Microwave,
  Paintbrush,
  Refrigerator,
  Sofa,
  WashingMachine,
} from "lucide-react";
import { ServicesSectionProps } from "../_types";


const serviceIcons: Record<string, React.ElementType> = {
  "AC Installation": AirVent,
  "AC Servicing": Fan,
  "Termite Inspection": Bug,
  "General Pest Treatment": Bug,
  "Microwave Oven Repair": Microwave,
  "Washing Machine Repair": WashingMachine,
  "Refrigerator Repair": Refrigerator,
  "Custom Shelving": Hammer,
  "Furniture Repair": Sofa,
  "Exterior House Painting": Paintbrush,
};

const Services = ({ services }: ServicesSectionProps) => {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="heading-secondary">Home Services, Made Easy</h2>

        <p className="text-muted mt-3">
          Trusted professionals, just a booking away.
        </p>
      </div>

      <div className="pt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {services.map((service) => {
          const Icon = serviceIcons[service.name] ?? Hammer;

          return (
            <div
              key={service.id}
              className="group flex cursor-pointer flex-col items-center text-center"
            >
              {/* Icon */}
              <div
                className="
                    flex h-16 w-16 items-center justify-center
                    rounded-2xl
                    bg-(--color-primary-light)
                    text-slate-500
                    transition-all duration-300
                    group-hover:bg-(--color-primary)
                    group-hover:text-white
                    group-hover:-translate-y-1
                  "
              >
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>

              {/* Service name */}
              <h3
                className="
                    mt-4 text-sm font-semibold
                    text-slate-700
                    transition-colors duration-300
                    group-hover:text-(--color-primary)
                    dark:text-slate-300
                  "
              >
                {service.name}
              </h3>

              {/* Arrow */}
              <ChevronRight
                className="
                    mt-1 h-4 w-4
                    text-transparent
                    transition-all duration-300
                    group-hover:translate-x-1
                    group-hover:text-(--color-primary)
                  "
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
