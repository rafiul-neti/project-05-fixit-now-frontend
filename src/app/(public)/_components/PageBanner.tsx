import Link from "next/link";

interface PageBannerProps {
  title: string;
}

export default function PageBanner({ title }: PageBannerProps) {
  return (
    <section
      className="
        relative overflow-hidden
        bg-linear-to-br
        from-(--color-primary-hover)
        via-(--color-primary)
        to-[#062b52]
        py-16 sm:py-20
      "
    >
      {/* Decorative gradients */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="fixit-container relative">
        <div className="flex flex-col items-center text-center">
          {/* Page Title */}
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            {title}
          </h1>

          {/* Breadcrumb */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium uppercase">
            <Link
              href="/"
              className="text-white/75 transition-colors hover:text-white"
            >
              Home
            </Link>

            <span className="text-white/40">/</span>

            <span className="text-cyan-300">{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
