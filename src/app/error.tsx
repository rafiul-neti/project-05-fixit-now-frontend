"use client";

import { AlertTriangle, Home, RefreshCcw, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Error Icon */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          {/* Decorative ring */}
          <div
            className="
              absolute inset-0 rounded-full
              border-4
              border-(--color-primary-light)
            "
          />

          {/* Icon container */}
          <div
            className="
              flex h-14 w-14 items-center justify-center
              rounded-full
              bg-(--color-primary-light)
            "
          >
            <AlertTriangle className="h-7 w-7 text-(--color-primary)" />
          </div>
        </div>

        {/* Heading */}
        <p className="mt-7 text-sm font-semibold text-(--color-primary)">
          Something went wrong
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          We couldn&apos;t complete that request
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Something unexpected happened while loading this page. Please try
          again, or head back to FixItNow and continue browsing our services.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => reset()}
            className="
              w-full gap-2
              bg-(--color-primary)
              hover:bg-(--color-primary-hover)
              sm:w-auto
            "
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>

          <Button variant="outline" className="w-full gap-2 sm:w-auto">
            <Link href="/" className="flex justify-center items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Small brand message */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Wrench className="h-3.5 w-3.5" />
          <span>FixItNow — Home services made simple.</span>
        </div>
      </div>
    </div>
  );
}
