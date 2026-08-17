import type { TechnicianAvailability } from "@/lib/types/modules/technician/technician.types";
import { UpdateAvailabilitySlots } from "./UpdateAvailabilitySlots";

export function AvailabilityCard({
  availability,
}: {
  availability: TechnicianAvailability;
}) {
  return (
    <section className="fixit-card p-6">
      <UpdateAvailabilitySlots initialAvailability={availability} />
    </section>
  );
}
