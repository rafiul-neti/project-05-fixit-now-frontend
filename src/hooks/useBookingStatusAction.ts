import { useState } from "react";
import { BookingStatus } from "@/lib/types/enum";
import { handleBookingStatus } from "@/actions/modules/dashboard/technician/handleBookingStatus";
import { toast } from "@/components/ui/toast";

export function useBookingStatusAction(
  bookingId: string,
  onStatusChange: (bookingId: string, newStatus: BookingStatus) => void,
) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isBusy = isAccepting || isDeclining;

  async function accept() {
    setIsAccepting(true);
    setError(null);
    try {
      const result = await handleBookingStatus(
        { status: BookingStatus.ACCEPTED },
        bookingId,
      );

      if (result?.success) {
        toast.add({
          type: "error",
          description:
            result.message ??
            "Failed to update booking status! Please try again.",
        });
        setError(result.message);
        setIsAccepting(false);
        return;
      }

      toast.add({ type: "success", description: "Booking accepted." });
      setIsAccepting(false);
      onStatusChange(bookingId, BookingStatus.ACCEPTED);
    } catch (err) {
      toast.add({
        type: "error",
        description: "Failed to update booking status! Please try again.",
      });
    }
  }

  async function decline() {
    setIsDeclining(true);
    setError(null);
    try {
      const result = await handleBookingStatus(
        { status: BookingStatus.DECLINED },
        bookingId,
      );

      if (result?.success) {
        toast.add({
          type: "error",
          description:
            result.message ??
            "Failed to update booking status! Please try again.",
        });
        setError(result.message);
        setIsDeclining(false);
        return;
      }

      toast.add({ type: "success", description: "Booking declined." });
      setIsDeclining(false);
      onStatusChange(bookingId, BookingStatus.DECLINED);
    } catch (err) {
      setIsDeclining(false);
      toast.add({
        type: "error",
        description: "Failed to update booking status! Please try again.",
      });
    }
  }

  return { accept, decline, isAccepting, isDeclining, isBusy, error };
}
