import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-20 lg:py-24">
      <div className="fixit-container">
        <div
          className="
            relative overflow-hidden rounded-3xl
            bg-linear-to-r
            from-(--color-primary)
            to-[#062b52]
            px-6 py-12 text-center
            sm:px-10 sm:py-14
          "
        >
          {/* Decorative elements */}
          <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative">
            <Wrench className="mx-auto h-9 w-9 text-white/90" />

            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Need a Home Service?
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/75 sm:text-base">
              Find reliable professionals for your next home service with
              FixItNow.
            </p>

            <Link
              href="/services"
              className="
                mt-7 inline-flex items-center gap-2
                rounded-lg bg-white px-5 py-3
                text-sm font-semibold
                text-(--color-primary)
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-white/90
              "
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
