import { getAllBookings } from "@/actions/modules/dashboard/admin/getAllBookings";
import AllBookingsTable from "@/components/modules/dashboard/admin/manage-bookings/AllBookingsTable";

export default async function AllBookingsPage() {
  const result = await getAllBookings();

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
