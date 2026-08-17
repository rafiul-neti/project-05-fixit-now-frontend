import { getTechnicianServices } from "@/actions/modules/dashboard/technician/getTechnicianServices";
import { TechnicianServicesList } from "@/components/modules/dashboard/technician/my-services/TechnicianServicesList";

export default async function MyServicesPage() {
  const services = await getTechnicianServices();

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container flex flex-col gap-6">
        <div>
          <h1 className="heading-secondary">My services</h1>
          <p className="mt-1 text-sm text-secondary">
            Manage which services you offer, and set custom pricing or duration
            for each.
          </p>
        </div>

        <TechnicianServicesList initialServices={services} />
      </div>
    </div>
  );
}
