import { getAllBookings } from "@/actions/modules/dashboard/admin/getAllBookings";
import AllBookingsTable from "@/components/modules/dashboard/admin/manage-bookings/AllBookingsTable";

export default async function AllBookingsPage() {
  const bookings = await getAllBookings();

  return (
    <section className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container flex flex-col gap-6">
        {bookings.length === 0 ? (
          <div className="fixit-card py-12 text-center text-muted-foreground">
            No bookings yet.
          </div>
        ) : (
          <AllBookingsTable initialBookings={bookings} />
        )}
      </div>
    </section>
  );
}
