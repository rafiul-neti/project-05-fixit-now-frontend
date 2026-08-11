import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book a home service?",
    answer:
      "Choose a service from FixItNow, explore the available technicians, and book the professional that best fits your needs.",
  },
  {
    question: "Can I choose a specific technician?",
    answer:
      "Yes. You can explore available technicians and choose one based on their services, experience, ratings, and other available information.",
  },
  {
    question: "How can I become a technician?",
    answer:
      "You can join FixItNow by creating an account through the registration page and getting started as a technician.",
  },
  {
    question: "What if I have a problem with my booking?",
    answer:
      "Contact our support team through the contact form and provide your booking details. We'll help you resolve the issue.",
  },
];

export default function ContactFAQ() {
  return (
    <section className="">
      <div className="fixit-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-(--color-primary)">
            FAQ
          </span>

          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Common Questions
          </h2>

          <p className="mt-4 text-muted-foreground">
            Find quick answers to some of the most common FixItNow questions.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="leading-6 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
