import { getTechnicianIncomingBookings } from "@/actions/modules/dashboard/technician/getTechnicianIncomingBookings";
import { IncomingBookingsList } from "@/components/modules/dashboard/technician/view-incoming-bookings/IncomingBookingsList";
import { BookingStatus } from "@/lib/types/enum";

export default async function ViewIncomingBookingsPage() {
  const result = await getTechnicianIncomingBookings({
    status: BookingStatus.REQUESTED,
  });

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-(--background-secondary) py-10">
        <div className="fixit-container">
          <div className="fixit-card p-8 text-center text-sm text-secondary">
            {result.message ?? "Couldn't load the page. Please try again."}
          </div>
        </div>
      </div>
    );
  }

  const { data: bookings } = result;

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
