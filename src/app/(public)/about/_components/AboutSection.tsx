import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  UsersRound,
  Wrench,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Trusted Professionals",
    description:
      "Connect with skilled technicians for your home service needs.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description: "Find a service and book a technician without the hassle.",
  },
  {
    icon: UsersRound,
    title: "Customer Focused",
    description: "Built around making home services simple and convenient.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="text-sm font-semibold text-(--color-primary) text-center mb-2">
        About FixItNow
      </div>
      <div className="fixit-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Visual */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-(--color-primary) to-[#062b52] p-8 sm:p-10 lg:p-12">
              {/* Decorative circles */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
              <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/5" />

              <div className="relative">
                <Wrench className="h-12 w-12 text-white/90" />

                <h3 className="mt-8 text-3xl font-bold text-white sm:text-4xl">
                  Your Home.
                  <br />
                  Our Expertise.
                </h3>

                <p className="mt-5 max-w-md text-sm leading-6 text-white/75 sm:text-base">
                  FixItNow brings customers and reliable home service
                  professionals together in one convenient platform.
                </p>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-white">10+</p>
                    <p className="mt-1 text-sm text-white/65">Home Services</p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-white">24/7</p>
                    <p className="mt-1 text-sm text-white/65">Easy Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Home Services,
              <span className="text-(--color-primary)"> Simplified.</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-muted-foreground">
              FixItNow is a home service platform designed to make finding and
              booking reliable professionals easier. Whether you need cleaning,
              plumbing, electrical work, repairs, or maintenance, you can find
              the right service in one place.
            </p>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Our goal is simple: make home services more accessible,
              convenient, and dependable for customers while creating
              opportunities for skilled technicians.
            </p>

            {/* Highlights */}
            <div className="mt-8 space-y-5">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-light)">
                      <Icon className="h-5 w-5 text-(--color-primary)" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              href="/services"
              className="
                mt-9 inline-flex items-center gap-2
                rounded-lg bg-(--color-primary)
                px-5 py-3 text-sm font-semibold text-white
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-(--color-primary-hover)
              "
            >
              Explore Our Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
