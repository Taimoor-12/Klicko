"use client";

import { Input } from "@/components/ui/input";
import { ReactNode, useState } from "react";

type LongUrlInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  button?: ReactNode;
  className?: string;
  layout?: "default" | "custom";
};

export function LongUrlInput({
  value,
  onChange,
  error,
  button,
  className,
  layout = "default",
}: LongUrlInputProps) {
  const errorElement = error ? (
    <p className="text-red-500 mt-2 text-sm md:text-base">{error}</p>
  ) : null;

  return (
    <div>
      <div>
        <h3 className="text-md md:text-lg font-semibold">
          Paste your long link here
        </h3>
      </div>
      <div className={className}>
        <Input
          className={`h-12 mt-2 border-black text-xs sm:text-base ${error ? "border-red-500" : ""}`}
          placeholder="https://example.com/my-long-url"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {layout === "default" && errorElement}
        {button}
      </div>
      {layout === "custom" && errorElement}
    </div>
  );
}
