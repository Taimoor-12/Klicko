"use client";

import { LongUrlInput } from "@/components/long-url-input";
import { Button } from "@/components//ui/button";
import { useState } from "react";
import { longUrl } from "@/lib/longUrl";
import { linkApi } from "@/lib/api";
import { Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LongUrlInputWrapper() {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    const normalized = longUrl.normalize(inputUrl);
    const validUrl = longUrl.isValidUrl(normalized);

    if (!validUrl) {
      setError(
        'We\'ll need a valid URL, like "super-long-link.com/shorten-it"',
      );
      return;
    }

    const parsedUrl = longUrl.parseUrl(normalized);
    if (!longUrl.isValidProtocol(parsedUrl)) {
      setError(
        'We\'ll need a valid URL, like "super-long-link.com/shorten-it"',
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      await linkApi.longToShortUrl({ longUrl: normalized });
      setInputUrl(""); // clear input
      router.refresh(); // ← re-fetches server component data
      toast.success("Link shortened!");
    } catch (err: any) {
      toast.error("Failed to shorten link");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 flex flex-col gap-3">
      <LongUrlInput
        value={inputUrl}
        onChange={setInputUrl}
        error={error}
        button={
          <Button
            className="mt-2 h-12 w-28 md:w-32 cursor-pointer text-base md:text-lg md:px-6"
            onClick={() => handleShorten()}
          >
            {loading ? (
              <Loader2 className="animate-spin ml-2 h-4 w-4" />
            ) : (
              <>
                Shorten <ArrowRight />
              </>
            )}
          </Button>
        }
        className="flex gap-3"
        layout="custom"
      />
    </div>
  );
}
