"use client";

import { useState } from "react";
import { Clock, Calendar, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import type { TechnicianAvailability } from "@/lib/types/modules/technician/technician.types";
import { formatTechnicianAvailabilityTime } from "@/utils/formattedDate";

const WEEKEND_DAY_LABEL: Record<TechnicianAvailability["weekendDays"], string> =
  {
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
  };

const WEEKEND_DAY_OPTIONS: TechnicianAvailability["weekendDays"][] = [
  "FRI",
  "SAT",
  "SUN",
];

function EditAvailabilityDialog({
  availability,
  onSave,
}: {
  availability: TechnicianAvailability;
  onSave: (next: TechnicianAvailability) => void;
}) {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(availability.startTime);
  const [endTime, setEndTime] = useState(availability.endTime);
  const [weekendDays, setWeekendDays] = useState(availability.weekendDays);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetToCurrentValues() {
    setStartTime(availability.startTime);
    setEndTime(availability.endTime);
    setWeekendDays(availability.weekendDays);
    setError(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) resetToCurrentValues();
    setOpen(nextOpen);
  }

  async function handleSave() {
    if (startTime >= endTime) {
      setError("Start time must be before end time.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      // TODO: call update-availability action once wired up — await it,
      // need to call onSave with the response's actual saved values after it resolves successfully.


      onSave({ startTime, endTime, weekendDays });
      setIsSubmitting(false);
      setOpen(false);
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Edit availability"
          />
        }
      >
        <Pencil size={15} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit availability</DialogTitle>
          <DialogDescription>
            Set your working hours and weekly day off.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              <span className="mb-1 block font-medium text-navy">
                Start time
              </span>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-navy">End time</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </label>
          </div>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-navy">Day off</span>
            <select
              value={weekendDays}
              onChange={(e) =>
                setWeekendDays(
                  e.target.value as TechnicianAvailability["weekendDays"],
                )
              }
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
            >
              {WEEKEND_DAY_OPTIONS.map((day) => (
                <option key={day} value={day}>
                  {WEEKEND_DAY_LABEL[day]}
                </option>
              ))}
            </select>
          </label>

          {error && <p className="text-sm text-(--error)">{error}</p>}
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateAvailabilitySlots({
  initialAvailability,
}: {
  initialAvailability: TechnicianAvailability;
}) {
  const [availability, setAvailability] = useState(initialAvailability);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-navy">Availability</h2>
        <EditAvailabilityDialog
          availability={availability}
          onSave={setAvailability}
        />
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-brand-light text-brand">
            <Clock size={17} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted">Working hours</p>
            <p className="text-sm font-semibold text-navy">
              {formatTechnicianAvailabilityTime(availability.startTime)} –{" "}
              {formatTechnicianAvailabilityTime(availability.endTime)}
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
    </>
  );
}
