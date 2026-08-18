import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { getTechniciansByService } from "@/actions/modules/public/service/getTechniciansByService";
import { TechnicianList } from "@/components/modules/public/service/TechnicianList";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const technicians = await getTechniciansByService(serviceId);

  if (technicians.length === 0) {
    return (
      <div className="min-h-screen bg-(--background-secondary) py-10">
        <div className="fixit-container max-w-3xl">
          <Link
            href="/services"
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-navy transition-colors"
          >
            <ArrowLeft size={15} />
            Back to services
          </Link>
          <div className="fixit-card p-8 text-center text-sm text-secondary">
            No technicians currently offer this service.
          </div>
        </div>
      </div>
    );
  }

  const { serviceName, serviceCategory, serviceDescription } = technicians[0];

  return (
    <div className="min-h-screen bg-(--background-secondary) py-10">
      <div className="fixit-container max-w-3xl">
        <Link
          href="/services"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-navy transition-colors"
        >
          <ArrowLeft size={15} />
          Back to services
        </Link>

        <div className="mb-8">
          <span
            className="fixit-badge status-info mb-2 inline-flex items-center gap-1"
            style={{ border: "none" }}
          >
            <Tag size={11} />
            {serviceCategory}
          </span>
          <h1 className="heading-secondary">{serviceName}</h1>
          <p className="mt-2 text-sm text-secondary">{serviceDescription}</p>
        </div>

        <h2 className="mb-3 text-base font-bold text-navy">
          Available technicians
          <span className="ml-2 text-sm font-medium text-muted">
            ({technicians.length})
          </span>
        </h2>
        <TechnicianList technicians={technicians} />
      </div>
    </div>
  );
}
