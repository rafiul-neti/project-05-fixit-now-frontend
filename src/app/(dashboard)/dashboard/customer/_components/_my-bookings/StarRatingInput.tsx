"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const STAR_LABELS = ["Poor", "Fair", "Good", "Very good", "Excellent"];

export function StarRatingInput({
  value,
  onChange,
  disabled,
}: StarRatingInputProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayValue = hovered ?? value;

  return (
    <div>
      <div
        className="flex items-center gap-1"
        onMouseLeave={() => setHovered(null)}
        role="radiogroup"
        aria-label="Rating"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            disabled={disabled}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(null)}
            className="rounded-md p-0.5 transition-transform hover:scale-110 disabled:pointer-events-none disabled:opacity-50"
          >
            <Star
              size={28}
              strokeWidth={1.5}
              className={
                star <= displayValue
                  ? "fill-(--warning) text-(--warning)"
                  : "fill-transparent text-border"
              }
            />
          </button>
        ))}
      </div>
      <p className="mt-1.5 h-4 text-xs font-medium text-muted">
        {displayValue > 0 ? STAR_LABELS[displayValue - 1] : ""}
      </p>
    </div>
  );
}
