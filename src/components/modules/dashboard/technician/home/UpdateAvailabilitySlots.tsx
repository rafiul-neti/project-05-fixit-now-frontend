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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateAvailabilityInput,
  updateAvailabilitySchema,
} from "@/validation/schemas/modules/technician";
import { updateAvailabilitySlots } from "@/actions/modules/dashboard/technician/updateAvaiabilitySlots";
import { toast } from "@/components/ui/toast";

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
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateAvailabilityInput>({
    resolver: zodResolver(updateAvailabilitySchema),
    defaultValues: {
      startTime: availability.startTime,
      endTime: availability.endTime,
      weekendDays: availability.weekendDays,
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      reset({
        startTime: availability.startTime,
        endTime: availability.endTime,
        weekendDays: availability.weekendDays,
      });
      setSubmitError(null);
    }
    setOpen(nextOpen);
  }

  async function onSubmit(values: UpdateAvailabilityInput) {
    setSubmitError(null);
    try {
      const result = await updateAvailabilitySlots(values);
      if (result.success) {
        onSave({
          startTime: result.data.startTime,
          endTime: result.data.endTime,
          weekendDays: result.data.weekendDays,
        });
        setOpen(false);

        toast.add({
          type: "success",
          description: "Your availability slots updated successfully.",
        });
      } else {
        setSubmitError(
          result.message
            ? result.message
            : "Something went wrong. Please try again.",
        );
      }
    } catch (err) {
      console.error(err, "Error from update availability slots component.");
      setSubmitError("Something went wrong. Please try again.");
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

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit availability</DialogTitle>
          <DialogDescription>
            Set your working hours and weekly day off.
          </DialogDescription>
        </DialogHeader>

        <form
          id="edit-availability-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium text-navy">
                Start time
              </span>
              <input
                type="time"
                {...register("startTime")}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
              {errors.startTime && (
                <p className="mt-1 text-xs text-(--error)">
                  {errors.startTime.message}
                </p>
              )}
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-navy">End time</span>
              <input
                type="time"
                {...register("endTime")}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
              {errors.endTime && (
                <p className="mt-1 text-xs text-(--error)">
                  {errors.endTime.message}
                </p>
              )}
            </label>
          </div>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-navy">Day off</span>
            <select
              {...register("weekendDays")}
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
            >
              {WEEKEND_DAY_OPTIONS.map((day) => (
                <option key={day} value={day}>
                  {WEEKEND_DAY_LABEL[day]}
                </option>
              ))}
            </select>
            {errors.weekendDays && (
              <p className="mt-1 text-xs text-(--error)">
                {errors.weekendDays.message}
              </p>
            )}
          </label>

          {submitError && (
            <p className="text-sm text-(--error)">{submitError}</p>
          )}
        </form>

        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose
            render={<Button variant="outline" className="w-full sm:w-auto" />}
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            form="edit-availability-form"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
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
