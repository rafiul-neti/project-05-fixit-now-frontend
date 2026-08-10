"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { TestimonialProps } from "../_types";

export default function Testimonial({ reviews }: TestimonialProps) {
  return (
    <section className="overflow-hidden">
      <div className="fixit-container">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-sm font-semibold text-(--color-primary)">
            Testimonials
          </span>

          <h2 className="heading-secondary mt-2">What Our Customers Say</h2>

          <p className="text-muted mt-3">
            Real experiences from customers who trust FixItNow.
          </p>
        </div>

        {/* Reviews Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={reviews.length > 3}
          grabCursor
          spaceBetween={20}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12!"
        >
          {reviews.map((review) => {
            const rating = Math.min(Math.max(review.givenStars, 0), 5);

            const avatar = `/images/technician-05.webp`;

            return (
              <SwiperSlide key={review.id}>
                <article
                  className="
                    h-full rounded-2xl border border-border
                    bg-background p-6
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  {/* Quote Icon */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-primary-light)">
                      <Quote
                        className="h-5 w-5 text-(--color-primary)"
                        fill="currentColor"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`h-4 w-4 ${
                            starIndex < rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review */}
                  <p className="text-sm leading-6 text-muted-foreground">
                    &ldquo;{review.content}&quot;
                  </p>

                  {/* Reviewer */}
                  <div className="mt-6 flex items-center gap-3 border-t pt-5">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={avatar}
                        alt={review.user.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">
                        {review.user.name}
                      </h3>

                      <p className="text-xs text-muted-foreground">
                        FixItNow Customer
                      </p>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
