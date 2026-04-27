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
        <nav className="flex justify-between px-6 md:px-12 pt-4 md:pt-6">
          <ul className="list-none">
            <li className="w-32 md:w-[100px] cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">
              <Image
                src="/logo-black.svg"
                width={168}
                height={50}
                className="w-full h-auto object-contain"
                alt="logo"
                priority
              />
            </li>
          </ul>
          <ul className="list-none flex items-center gap-4">
            <li><Button variant={"ghost"} size={"lg"} className="text-base cursor-pointer">Log In</Button></li>
            <li><Button size={"xl"} className="text-base cursor-pointer">Sign up</Button></li>
          </ul>
        </nav>
      </header>
      <main className="mt-24">
        <section>
          <div className="flex flex-col items-center mt-12">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">Shorten Links, Amplify Reach</h1>
            <p className="mt-6 text-base md:text-2xl text-center">Klicko turns your long, clunky URLs into clean, shareable links in seconds—making them easier to manage, track, and use across any platform without the usual mess.</p>
          </div>

          <div className="min-h-72 bg-muted rounded-4xl mt-12 opacity-90">
            <Tabs defaultValue="shorten" className="w-full">
              <div className="flex justify-center mt-2">
                <TabsList>
                  <TabsTrigger className="cursor-pointer text-sm md:text-base px-6 py-6 rounded-4xl mt-6 border-1 border-black" value="shorten">Short Link</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="shorten" className="mx-6 mt-6">
                <h2 className="text-xl md:text-2xl font-semibold">Shorten a long link</h2>
                <p className="mt-2 opacity-70 text-xs md:text-sm">No credit card required</p>

                <h3 className="text-md md:text-lg font-semibold mt-15">Paste your long link here</h3>

                <Input
                  className={`h-14 md:h-12 mt-4 border-black ${error ? 'border-red-500' : ''}`}
                  placeholder="https://example.com/my-long-url"
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                />

                {error && <p className="text-red-500 mt-2 text-sm md:text-base">{error}</p>}

                <Button size={"lg"} className="mt-6 min-w-42 min-h-12 cursor-pointer text-lg px-6 mb-10" onClick={handleShorten}>
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
