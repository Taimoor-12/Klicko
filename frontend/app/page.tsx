'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    const normalized = normalize(inputUrl);
    let validUrl = isValidUrl(normalized);
    let parsedUrl;
    let isProtocolValid;
    if (validUrl) {
      parsedUrl = parseUrl(normalized);
      isProtocolValid = isValidProtocol(parsedUrl);
      if (isProtocolValid) {
        setUrl(parsedUrl.toString());
      } else {
        setError("We'll need a valid URL, like \"super-long-link.com/shorten-it\"");
      }
    } else {
      setError("We'll need a valid URL, like \"super-long-link.com/shorten-it\"");
    }
  };

  const normalize = (value: string) => {
    let url = value.trim();

    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url);

    if (!hasProtocol) {
      url = `https://${url}`;
    }

    return url;
  }

  const isValidUrl = (value: string) => {
    if (!URL.canParse(value)) return false;

    const url = parseUrl(value);
    const hostname = url.hostname;

    // must have at least one dot in hostname (e.g. google.com)
    // and TLD must be at least 2 characters
    const parts = hostname.split('.');
    if (parts.length < 2) return false;

    const tld = parts[parts.length - 1];
    if (!tld || tld.length < 2) return false;

    return true;
  }

  const parseUrl = (value: string) => {
    return new URL(value);
  }

  const isValidProtocol = (url: URL) => {
    return url.protocol === "http:" || url.protocol === "https:";
  }

  return (
    <>
      <header>
        <nav className="flex justify-between">
          <ul className="list-none">
            <li className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">
              <Image
                src="/logo-black.svg"
                width={168}
                height={50}
                alt="logo"
                className="md:pt-3 w-20 sm:w-22 md:w-27"
                priority
              />
            </li>
          </ul>
          <ul className="md:pt-2 list-none flex items-center gap-2 sm:gap-4">
            <li><Button variant={"ghost"} className="cursor-pointer 
            text-sm px-4 py-4
            sm:px-10 sm:py-6">Log In</Button></li>
            <li><Button className="cursor-pointer
            text-sm px-4 py-4
            sm:px-10 sm:py-6">Sign up</Button></li>
          </ul>
        </nav>
      </header>
      <main className="mt-12 md:mt-24">
        <section>
          <div className="flex flex-col items-center mt-12">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center">Shorten Links, Amplify Reach</h1>
            <p className="mt-2 sm:mt-4 md:mt-6 text-sm sm:text-lg md:text-2xl text-center">Klicko turns your long, clunky URLs into clean, shareable links in seconds—making them easier to manage, track, and use across any platform without the usual mess.</p>
          </div>

          <div className="min-h-72 bg-muted rounded-4xl mt-12 mb-12 opacity-90">
            <Tabs defaultValue="shorten" className="w-full">
              <div className="flex justify-center mt-2">
                <TabsList>
                  <TabsTrigger className="cursor-pointer text-sm md:text-base px-4 py-4 sm:px-6 sm:py-6 rounded-4xl mt-4 sm:mt-6 border-1 border-black" value="shorten">Short Link</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="shorten" className="mx-6 mt-6">
                <h2 className="text-xl md:text-2xl font-semibold">Shorten a long link</h2>
                <p className="mt-2 opacity-70 text-sm md:text-base">No credit card required</p>

                <h3 className="text-md md:text-lg font-semibold mt-15">Paste your long link here</h3>

                <Input
                  className={`h-12 mt-2 border-black text-xs sm:text-base ${error ? 'border-red-500' : ''}`}
                  placeholder="https://example.com/my-long-url"
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                />

                {error && <p className="text-red-500 mt-2 text-sm md:text-base">{error}</p>}

                <Button className="mt-6 w-full h-12 md:w-64 cursor-pointer text-base md:text-lg md:px-6 mb-10" onClick={handleShorten}>
                  Get your link for free
                  <ArrowRight />
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </>
  );
}
