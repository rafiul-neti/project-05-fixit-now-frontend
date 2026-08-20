"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";
import { PublicService } from "@/lib/types/modules/service/service.types";

function ServiceCard({ service }: { service: PublicService }) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="fixit-card group flex flex-col p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-light text-brand">
        <Wrench size={18} strokeWidth={2} />
      </div>
      <p className="mt-3 font-semibold text-navy">{service.name}</p>
      <p className="mt-1 flex-1 text-sm text-secondary">
        {service.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="fixit-badge status-info" style={{ border: "none" }}>
          {service.category.name}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
          View technicians
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export function ServicesBrowser({ services }: { services: PublicService[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const unique = new Map<string, string>();
    for (const service of services) {
      unique.set(service.categoryId, service.category.name);
    }
    return Array.from(unique.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [services]);

  const filteredServices = selectedCategory
    ? services.filter((s) => s.categoryId === selectedCategory)
    : services;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
      {/* Category filter sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Categories
        </p>
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`flex-none rounded-md px-3 py-2 text-left text-sm font-medium transition-colors lg:flex-auto ${
              selectedCategory === null
                ? "bg-brand text-white"
                : "text-secondary hover:bg-(--background-secondary)"
            }`}
          >
            All services
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-none rounded-md px-3 py-2 text-left text-sm font-medium transition-colors lg:flex-auto ${
                selectedCategory === category.id
                  ? "bg-brand text-white"
                  : "text-secondary hover:bg-(--background-secondary)"
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Grid */}
      <div>
        {filteredServices.length === 0 ? (
          <div className="fixit-card p-8 text-center text-sm text-secondary">
            No services found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
