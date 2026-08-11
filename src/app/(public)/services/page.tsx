import React from "react";
import PageBanner from "../_components/PageBanner";
import Services from "../_components/Services";
import Technicians from "../_components/Technicians";
import Testimonial from "../_components/Testimonials";
import { getServices } from "../_actions/getServices";
import { getTechnicians } from "../_actions/getTechnicians";
import { getReviews } from "../_actions/getReviews";

const ServicesPage = async () => {
  const services = await getServices();
  const technicians = await getTechnicians();
  const reviews = await getReviews();
  return (
    <div>
      <PageBanner title="Services" />
      <Services services={services} />
      <Technicians technicians={technicians} />
      <Testimonial reviews={reviews} className="py-20 lg:py-24" />
    </div>
  );
};

export default ServicesPage;
