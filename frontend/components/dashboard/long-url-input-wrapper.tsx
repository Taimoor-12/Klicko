"use client";

import { LongUrlInput } from "@/components/long-url-input";
import { Button } from "@/components//ui/button";
import { useState } from "react";
import { longUrl } from "@/lib/longUrl";
import { linkApi } from "@/lib/api";
import { ArrowRight } from "lucide-react";

export function LongUrlInputWrapper() {
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    const normalized = longUrl.normalize(inputUrl);
    let validUrl = longUrl.isValidUrl(normalized);
    let parsedUrl;
    let isProtocolValid;
    if (validUrl) {
      parsedUrl = longUrl.parseUrl(normalized);
      isProtocolValid = longUrl.isValidProtocol(parsedUrl);
      if (isProtocolValid) {
        await linkApi.longToShortUrl({ longUrl: inputUrl });
      } else {
        setError(
          'We\'ll need a valid URL, like "super-long-link.com/shorten-it"',
        );
      }
    } else {
      setError(
        'We\'ll need a valid URL, like "super-long-link.com/shorten-it"',
      );
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
            Shorten
            <ArrowRight />
          </Button>
        }
        className="flex gap-3"
        layout="custom"
      />
    </div>
  );
}
