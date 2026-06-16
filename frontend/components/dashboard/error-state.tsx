"use client";

import { useState } from "react";
import type { ApiError } from "@/lib/api/client";
export default function ErrorState({
  error
}: {
  error: ApiError;
}) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    location.reload();
  }
  return (
    <div className={"rounded-lg border border-red-200 bg-red-50 p-4 text-sm "}>
      <p className="font-semibold text-red-700">Something went wrong!</p>

      <p className="mt-1 text-red-600">{error.message}</p>

      <button
        onClick={handleClick}
        className="mt-3 text-sm cursor-pointer font-medium text-red-700 underline hover:text-red-900"
      >
        {loading ? "Retrying..." : "Try again"}
      </button>
    </div>
  );
}
