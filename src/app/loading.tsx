import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Loader */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          {/* Outer ring */}
          <div
            className="
              absolute inset-0
              rounded-full
              border-4
              border-(--color-primary-light)
              border-t-(--color-primary)
              animate-spin
            "
          />

          {/* Icon container */}
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full
              bg-(--color-primary-light)
            "
          >
            <Wrench
              className="
                h-5 w-5
                text-(--color-primary)
                animate-pulse
              "
            />
          </div>
        </div>

        {/* Loading text */}
        <p className="mt-5 text-sm font-medium text-muted-foreground">
          Getting things ready...
        </p>
      </div>
    </div>
  );
}
