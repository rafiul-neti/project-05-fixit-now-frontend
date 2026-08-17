import { getTechnicianIncomingBookings } from "@/actions/modules/dashboard/technician/getTechnicianIncomingBookings";
import { IncomingBookingsList } from "@/components/modules/dashboard/technician/view-incoming-bookings/IncomingBookingsList";
import { BookingStatus } from "@/lib/types/enum";

export default async function ViewIncomingBookingsPage() {
  const bookings = await getTechnicianIncomingBookings({
    status: BookingStatus.REQUESTED,
  });

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container flex flex-col gap-6">
        <div>
          <h1 className="heading-secondary">Incoming bookings</h1>
          <p className="mt-1 text-sm text-secondary">
            New service requests waiting for your response.
          </p>
        </div>

        <IncomingBookingsList initialBookings={bookings} />
      </div>
    </div>
  );
}
