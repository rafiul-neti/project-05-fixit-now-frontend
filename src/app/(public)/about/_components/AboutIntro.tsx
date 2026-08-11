import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutIntro() {
  return (
    <section className="relative overflow-hidden bg-(--color-primary-light) py-20 lg:py-24">
      {/* Decorative background */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="fixit-container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Title */}
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Making Home Services{" "}
            <span className="text-(--color-primary)">Simple & Reliable</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            FixItNow connects you with trusted professionals for the services
            your home needs—quickly, conveniently, and with confidence.
          </p>

          {/* CTA */}
          <Link
            href="/services"
            className="
              mt-8 inline-flex items-center gap-2 rounded-lg
              bg-(--color-primary)
              px-6 py-3.5
              text-sm font-semibold text-white
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
    </section>
  );
}
