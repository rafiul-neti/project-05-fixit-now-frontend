"use client";

import { useState } from "react";
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

export function BookNowDialog({
  technicianId,
  technicianName,
  serviceName,
  serviceCategory,
}: {
  technicianId: string;
  technicianName: string;
  serviceName: string;
  serviceCategory: string;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);
    try {
      // TODO: have to call create-booking action
      // confirmed, passing technicianId + serviceName/serviceCategory (or
      // more likely a serviceId once that's threaded through). On success,
      // probably redirect to the new booking's detail page or a
      // confirmation screen rather than just closing the dialog.
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" className={`btn-primary`} />}>Book now</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm booking</DialogTitle>
          <DialogDescription>
            Review the details below and confirm your booking request.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <label className="text-sm">
            <span className="mb-1 block font-medium text-navy">Service</span>
            <input
              type="text"
              value={serviceName}
              readOnly
              className="w-full rounded-md border border-(--border) bg-(--background-secondary) px-3 py-2 text-sm text-secondary"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-navy">Category</span>
            <input
              type="text"
              value={serviceCategory}
              readOnly
              className="w-full rounded-md border border-(--border) bg-(--background-secondary) px-3 py-2 text-sm text-secondary"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-navy">Technician</span>
            <input
              type="text"
              value={technicianName}
              readOnly
              className="w-full rounded-md border border-(--border) bg-(--background-secondary) px-3 py-2 text-sm text-secondary"
            />
          </label>

          {error && <p className="text-sm text-(--error)">{error}</p>}
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Booking…" : "Confirm booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
