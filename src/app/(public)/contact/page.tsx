import React from "react";
import PageBanner from "../_components/PageBanner";
import ContactSection from "./_components/ContactSection";
import ContactFAQ from "./_components/ContactFAQ";
import ContactCTA from "./_components/ContactCTA";

const ContactPage = () => {
  return (
    <div>
      <PageBanner title="Contact" />
      <ContactSection />
      <ContactFAQ />
      <ContactCTA />
    </div>
  );
};

export default ContactPage;
