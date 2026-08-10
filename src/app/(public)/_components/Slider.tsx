"use client";

import Image from "next/image";
import Link from "next/link";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "/images/house-cleaning.webp",
    eyebrow: "Professional Cleaning",
    title: "A Cleaner Home Starts Here.",
    description:
      "Book trusted cleaning professionals and enjoy a spotless, comfortable home without the hassle.",
    primaryAction: "Book Cleaning",
    primaryHref: "/services/cleaning",
    secondaryAction: "Explore Services",
    secondaryHref: "/services",
  },
  {
    id: 2,
    image: "/images/sink-installation.webp",
    eyebrow: "Expert Plumbing",
    title: "Plumbing Problems? We've Got You Covered.",
    description:
      "From sink installation to everyday plumbing repairs, get reliable help from skilled professionals.",
    primaryAction: "Book a Plumber",
    primaryHref: "/services/plumbing",
    secondaryAction: "View Services",
    secondaryHref: "/services",
  },
  {
    id: 3,
    image: "/images/wiring-inspection.webp",
    eyebrow: "Electrical Services",
    title: "Safe, Reliable Electrical Services.",
    description:
      "Get professional electrical inspections, installations, and repairs from qualified technicians.",
    primaryAction: "Book an Electrician",
    primaryHref: "/services/electrical",
    secondaryAction: "View Services",
    secondaryHref: "/technicians",
  },
];

export default function Slider() {
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        className="group"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative min-h-130 sm:min-h-145 lg:min-h-[85vh] w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                sizes="100vw"
                className="object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-black/15" />

              {/* Content */}
              <div className="relative z-10 flex min-h-130 sm:min-h-145 lg:min-h-[85vh] items-center">
                <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
                  <div className="max-w-2xl flex flex-col items-center justify-center">
                    {/* Eyebrow */}
                    <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                      {slide.eyebrow}
                    </span>

                    {/* Heading */}
                    <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={slide.primaryHref}
                        className="inline-flex items-center gap-2 rounded-lg bg-(--color-primary) px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-(--color-primary-hover)]hover:-translate-y-0.5"
                      >
                        {slide.primaryAction}

                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <Link
                        href={slide.secondaryHref}
                        className="inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-(--color-primary)"
                      >
                        {slide.secondaryAction}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <button
          type="button"
          aria-label="Previous slide"
          className="swiper-button-prev-custom absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-(--color-primary) md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          className="swiper-button-next-custom absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-(--color-primary) md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Pagination */}
        <div className="swiper-pagination-custom absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2" />
      </Swiper>
    </section>
  );
}
