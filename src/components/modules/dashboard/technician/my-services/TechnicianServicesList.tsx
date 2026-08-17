"use client";

import { useState } from "react";
import { Pencil, Check, X, Clock, Tag } from "lucide-react";
import type { TechnicianServiceItem } from "@/lib/types/modules/technician/technician.types";

// Formatting helpers
function formatPrice(priceOverride: string | null) {
  if (priceOverride === null) return null;
  const value = Number(priceOverride);
  if (Number.isNaN(value)) return null;
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(value);
}

function ServiceRow({
  item,
  onToggleActive,
  onSaveOverrides,
}: {
  item: TechnicianServiceItem;
  onToggleActive: (id: string, nextIsActive: boolean) => void;
  onSaveOverrides: (
    id: string,
    values: { priceOverride: string | null; estimatedDuration: number | null },
  ) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [priceInput, setPriceInput] = useState(item.priceOverride ?? "");
  const [durationInput, setDurationInput] = useState(
    item.estimatedDuration?.toString() ?? "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startEditing() {
    setPriceInput(item.priceOverride ?? "");
    setDurationInput(item.estimatedDuration?.toString() ?? "");
    setError(null);
    setIsEditing(true);
  }

  async function handleSave() {
    setIsSubmitting(true);
    setError(null);
    try {
      // TODO: call update-technician-service action once the mutation


      onSaveOverrides(item.id, {
        priceOverride: priceInput.trim() === "" ? null : priceInput.trim(),
        estimatedDuration:
          durationInput.trim() === "" ? null : Number(durationInput),
      });
      setIsSubmitting(false);
      setIsEditing(false);
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  async function handleToggle() {
    setIsSubmitting(true);
    setError(null);
    try {
      // TODO: call toggle-technician-service-active action once the
      


      onToggleActive(item.id, !item.isActive);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  const formattedPrice = formatPrice(item.priceOverride);

  return (
    <div className="fixit-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-navy">{item.service.name}</p>
            {!item.isActive && (
              <span
                className="fixit-badge status-warning"
                style={{ border: "none" }}
              >
                Inactive
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-secondary">
            {item.service.description}
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted">
            <Tag size={12} />
            {item.service.category.name}
          </p>
        </div>

        {/* Active toggle */}
        <div className="flex flex-none items-center gap-2">
          <span
            className={`text-sm font-medium ${
              item.isActive ? "text-(--success)" : "text-muted"
            }`}
          >
            {item.isActive ? "Active" : "Inactive"}
          </span>
          <button
            type="button"
            onClick={handleToggle}
            disabled={isSubmitting}
            role="switch"
            aria-checked={item.isActive}
            aria-label={
              item.isActive
                ? "Deactivate this service"
                : "Activate this service"
            }
            className={`relative inline-flex h-6 w-11 flex-none items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              item.isActive ? "bg-(--success)" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                item.isActive ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="fixit-divider my-4" />

      {isEditing ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium text-navy">
                Price override (৳)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                placeholder="Use default price"
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-navy">
                Estimated duration (min)
              </span>
              <input
                type="number"
                min="0"
                step="1"
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
                placeholder="Use default duration"
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </label>
          </div>

          {error && <p className="text-sm text-(--error)">{error}</p>}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting}
              className="btn-primary inline-flex items-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={15} />
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
              className="btn-secondary inline-flex items-center gap-1.5"
            >
              <X size={15} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-secondary">
            <span>
              Price:{" "}
              <span className="font-medium text-navy">
                {formattedPrice ?? "Default"}
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              {item.estimatedDuration
                ? `${item.estimatedDuration} min`
                : "Default duration"}
            </span>
          </div>
          <button
            type="button"
            onClick={startEditing}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            <Pencil size={14} />
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export function TechnicianServicesList({
  initialServices,
}: {
  initialServices: TechnicianServiceItem[];
}) {
  const [services, setServices] = useState(initialServices);

  function handleToggleActive(id: string, nextIsActive: boolean) {
    setServices((current) =>
      current.map((s) => (s.id === id ? { ...s, isActive: nextIsActive } : s)),
    );
  }

  function handleSaveOverrides(
    id: string,
    values: { priceOverride: string | null; estimatedDuration: number | null },
  ) {
    setServices((current) =>
      current.map((s) => (s.id === id ? { ...s, ...values } : s)),
    );
  }

  if (services.length === 0) {
    return (
      <div className="fixit-card p-6 text-center text-sm text-secondary">
        You haven&apos;t added any services yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {services.map((item) => (
        <ServiceRow
          key={item.id}
          item={item}
          onToggleActive={handleToggleActive}
          onSaveOverrides={handleSaveOverrides}
        />
      ))}
    </div>
  );
}
