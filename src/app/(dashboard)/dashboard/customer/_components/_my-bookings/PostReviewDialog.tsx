"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarRatingInput } from "./StarRatingInput";
import { Star } from "lucide-react";
import {
  ReviewFormValues,
  reviewSchema,
} from "../../my-bookings/[bookingId]/_validations";
import { createReview } from "../../_actions/createReview";
import { toast } from "@/components/ui/toast";

export function PostReviewDialog({
  bookingId,
  serviceName,
}: {
  bookingId: string;
  serviceName: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { givenStars: 0, content: "" },
  });

  async function onSubmit(values: ReviewFormValues) {
    setSubmitError(null);
    try {
      const result = await createReview(bookingId, values);

      if (result.success) {
        reset();
        setOpen(false);

        toast.add({
          type: "success",
          description: result.message ?? "Review submission successful.",
        });
      } else {
        setSubmitError(
          result.message
            ? result.message
            : "Something went wrong while submitting your review. Please try again.",
        );
      }
    } catch (err) {
      console.error(err, "Error from post review dialog component.");
      setSubmitError(
        "Something went wrong while submitting your review. Please try again.",
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          reset();
          setSubmitError(null);
        }
      }}
    >
      <DialogTrigger>
        <span className={`btn-primary`}>
          <Star size={16} /> Leave a Review
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <DialogTitle className={`text-lg font-semibold`}>
            Write a Review
          </DialogTitle>
          <h2 className="text-md font-bold text-zinc-800">{serviceName}</h2>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 flex flex-col items-center border p-5 rounded">
            <Label>Please rate this service</Label>
            <Controller
              name="givenStars"
              control={control}
              render={({ field }) => (
                <StarRatingInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.givenStars && (
              <p className="text-sm text-(--error)">
                {errors.givenStars.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Textarea
              id="content"
              placeholder="Describe your experience (optional)"
              className="min-h-32"
              disabled={isSubmitting}
              {...register("content")}
            />
            {errors.content && (
              <p className="text-sm text-(--error)">{errors.content.message}</p>
            )}
          </div>

          {submitError && (
            <p className="rounded-md bg-(--error-light) px-3 py-2 text-sm text-(--error)">
              {submitError}
            </p>
          )}

          <DialogFooter className="flex-row gap-3 sm:justify-stretch">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setOpen(false)}
              className="flex-1 border-(--success) text-(--success) hover:bg-(--success) hover:text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: "var(--success)" }}
              className="flex-1"
            >
              {isSubmitting ? <Spinner /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
