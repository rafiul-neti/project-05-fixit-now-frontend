import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JoinTechnicianSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="fixit-container">
        <div className="relative overflow-hidden rounded-3xl bg-(--color-primary) px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join as a Technician
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/85 sm:text-base">
              Share your skills, grow your career, and connect with customers
              who need your expertise.
            </p>

            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-(--color-primary) transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-primary-light)"
            >
              Join Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
