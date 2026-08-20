"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  bookingFormSchema,
  BookingFormInput,
} from "@/validation/schemas/modules/public/booking-form.validation";
import { bookService } from "@/actions/modules/public/service/bookAService";
import { toast } from "@/components/ui/toast";

export function BookNowDialog({
  technicianId,
  serviceId,
  technicianName,
  serviceName,
  serviceCategory,
}: {
  technicianId: string;
  serviceId: string;
  technicianName: string;
  serviceName: string;
  serviceCategory: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormInput>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      useExistingAddress: true,
      addressLine1: "",
      addressLine2: "",
      city: "",
      region: "",
      postCode: "",
    },
  });

  const useExistingAddress = watch("useExistingAddress");

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      reset({
        useExistingAddress: true,
        addressLine1: "",
        addressLine2: "",
        city: "",
        region: "",
        postCode: "",
      });
      setSubmitError(null);
    }
    setOpen(nextOpen);
  }

  async function onSubmit(values: BookingFormInput) {
    setSubmitError(null);
    try {
      // TODO: call create-booking action once confirmed, passing
      // technicianId + serviceId (need to thread this through — currently
      // only serviceName/serviceCategory strings are available on this
      // component) + values.useExistingAddress, and only the address
      // fields when useExistingAddress is false. On success, probably
      // redirect to the new booking's detail page or a confirmation
      // screen rather than just closing the dialog.
      await bookService(technicianId, serviceId, values);
      setOpen(false);

      toast.add({
        type: "success",
        description:
          "Thank you for booking the service. You will be contacted by the technician as soon as possible.",
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button size="sm" className="btn-primary" />}>
        Book now
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Confirm booking</DialogTitle>
          <DialogDescription>
            Review the details below and confirm your booking request.
          </DialogDescription>
        </DialogHeader>

        <form
          id="book-now-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <label className="text-sm">
            <span className="mb-1 block font-medium text-navy">Service</span>
            <input
              type="text"
              value={serviceName}
              readOnly
              className="w-full rounded-md border border-border bg-(--background-secondary) px-3 py-2 text-sm text-secondary"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-navy">Category</span>
            <input
              type="text"
              value={serviceCategory}
              readOnly
              className="w-full rounded-md border border-border bg-(--background-secondary) px-3 py-2 text-sm text-secondary"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-navy">Technician</span>
            <input
              type="text"
              value={technicianName}
              readOnly
              className="w-full rounded-md border border-border bg-(--background-secondary) px-3 py-2 text-sm text-secondary"
            />
          </label>

          {/* Address choice */}
          <div className="rounded-md border border-border p-3">
            <p className="mb-2 text-sm font-medium text-navy">
              Service address
            </p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value="true"
                  checked={useExistingAddress === true}
                  onChange={() =>
                    reset({
                      ...watch(),
                      useExistingAddress: true,
                    })
                  }
                />
                Use my existing address
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value="false"
                  checked={useExistingAddress === false}
                  onChange={() =>
                    reset({
                      ...watch(),
                      useExistingAddress: false,
                    })
                  }
                />
                Use a new address
              </label>
            </div>
          </div>

          {/* New address fields — only shown/required when the user picks "new" */}
          {useExistingAddress === false && (
            <div className="flex flex-col gap-3 rounded-md border border-border p-3">
              <label className="text-sm">
                <span className="mb-1 block font-medium text-navy">
                  Address line 1
                </span>
                <input
                  type="text"
                  {...register("addressLine1")}
                  className="w-full rounded-md border border-border px-3 py-2 text-sm"
                />
                {errors.addressLine1 && (
                  <p className="mt-1 text-xs text-(--error)">
                    {errors.addressLine1.message}
                  </p>
                )}
              </label>

              <label className="text-sm">
                <span className="mb-1 block font-medium text-navy">
                  Address line 2 <span className="text-muted">(optional)</span>
                </span>
                <input
                  type="text"
                  {...register("addressLine2")}
                  className="w-full rounded-md border border-border px-3 py-2 text-sm"
                />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-navy">City</span>
                  <input
                    type="text"
                    {...register("city")}
                    className="w-full rounded-md border border-border px-3 py-2 text-sm"
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-(--error)">
                      {errors.city.message}
                    </p>
                  )}
                </label>
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-navy">
                    Region
                  </span>
                  <input
                    type="text"
                    {...register("region")}
                    className="w-full rounded-md border border-border px-3 py-2 text-sm"
                  />
                  {errors.region && (
                    <p className="mt-1 text-xs text-(--error)">
                      {errors.region.message}
                    </p>
                  )}
                </label>
              </div>

              <label className="text-sm">
                <span className="mb-1 block font-medium text-navy">
                  Postcode
                </span>
                <input
                  type="text"
                  {...register("postCode")}
                  className="w-full rounded-md border border-border px-3 py-2 text-sm"
                />
                {errors.postCode && (
                  <p className="mt-1 text-xs text-(--error)">
                    {errors.postCode.message}
                  </p>
                )}
              </label>
            </div>
          )}

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
            form="book-now-form"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Booking…" : "Confirm booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
