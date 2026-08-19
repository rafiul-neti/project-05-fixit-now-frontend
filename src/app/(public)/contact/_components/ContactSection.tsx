"use client";

import { useForm } from "react-hook-form";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Rajshahi, Bangladesh",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1XXX-XXXXXX",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "support@fixitnow.com",
  },
];

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();

  const onSubmit = async (data: ContactFormValues) => {
   

    // TODO: Have to connect my backend API here

    toast.add({
      type: "success",
      description: "Your message has been sent successfully.",
    });

    reset();
  };

  return (
    <section className="py-20 lg:py-24">
      <div className="fixit-container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ==================== LEFT ==================== */}
          <div>
            <span className="text-sm font-semibold text-(--color-primary)">
              Contact FixItNow
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s Get in{" "}
              <span className="text-(--color-primary)">Touch</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              Have a question, need help with a booking, or want to learn more
              about FixItNow? Send us a message and our team will be happy to
              help.
            </p>

            {/* Contact information */}
            <div className="mt-8 space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      flex items-center gap-4 rounded-xl border
                      bg-card p-4
                      transition-all duration-200
                      hover:border-(--color-primary)
                    "
                  >
                    <div
                      className="
                        flex h-11 w-11 shrink-0 items-center
                        justify-center rounded-lg
                        bg-(--color-primary-light)
                      "
                    >
                      <Icon className="h-5 w-5 text-(--color-primary)" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.title}
                      </p>

                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small support card */}
            <div
              className="
                mt-6 rounded-2xl
                bg-linear-to-br
                from-(--color-primary)
                to-[#062b52]
                p-6
              "
            >
              <MessageSquare className="h-7 w-7 text-white" />

              <h3 className="mt-4 text-lg font-semibold text-white">
                Need help with a booking?
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/75">
                Our support team can help you with bookings, services,
                technicians, and other FixItNow questions.
              </p>
            </div>
          </div>

          {/* ==================== RIGHT ==================== */}
          <div
            className="
              rounded-2xl border bg-card p-6 shadow-sm
              sm:p-8
            "
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Send Us a Message
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Name
                  </label>

                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>

                <Input
                  id="subject"
                  placeholder="How can we help?"
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                />

                {errors.subject && (
                  <p className="mt-1.5 text-xs text-destructive">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>

                <Textarea
                  id="message"
                  placeholder="Write your message..."
                  className="min-h-36 resize-none"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                />

                {errors.message && (
                  <p className="mt-1.5 text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full gap-2
                  bg-(--color-primary)
                  hover:bg-(--color-primary-hover)
                "
              >
                <Send className="h-4 w-4" />

                {isSubmitting ? <Spinner /> : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
