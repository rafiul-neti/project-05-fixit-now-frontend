import React from "react";
import PageBanner from "../_components/PageBanner";
import Technicians from "../_components/Technicians";
import Testimonial from "../_components/Testimonials";
import { getServices } from "../_actions/getServices";
import { getTechnicians } from "../_actions/getTechnicians";
import { getReviews } from "../_actions/getReviews";
import { ServicesBrowser } from "@/components/modules/public/service/ServicesBrowser";

const ServicesPage = async () => {
  const services = await getServices();
  const technicians = await getTechnicians();
  const reviews = await getReviews();
  return (
    <section>
      <PageBanner title="Services" />
      <div className="min-h-screen bg-(--background-secondary) py-10">
        <div className="fixit-container">
          <div className="mb-8">
            <h1 className="heading-secondary">Our services</h1>
            <p className="mt-1 text-sm text-secondary">
              Browse services by category and find the right professional for
              the job.
            </p>
          </div>

          <ServicesBrowser services={services} />
        </div>
      </div>
      <Technicians technicians={technicians} className="pt-20" />
      <Testimonial reviews={reviews} className="py-20 lg:py-24" />
    </section>
  );
};

export default ServicesPage;
