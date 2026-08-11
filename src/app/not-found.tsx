import { Home, SearchX, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          {/* Outer ring */}
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
            <SearchX className="h-7 w-7 text-(--color-primary)" />
          </div>
        </div>

        {/* 404 */}
        <p className="mt-7 text-sm font-semibold var(--color-primary)">
          Error 404
        </p>

        {/* Heading */}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back to FixItNow.
        </p>

        {/* Action */}
        <div className="mt-8 flex justify-center">
          <Button
            className="
              flex w-full items-center justify-center
              gap-2 whitespace-nowrap
              bg-(--color-primary)
              hover:bg-(--color-primary-hover)
              sm:w-auto
            "
          >
            <Link href="/" className="flex justify-center items-center gap-2">
              <Home className="h-4 w-4 shrink-0" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Brand message */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Wrench className="h-3.5 w-3.5" />
          <span>FixItNow — Home services made simple.</span>
        </div>
      </div>
    </div>
  );
}
