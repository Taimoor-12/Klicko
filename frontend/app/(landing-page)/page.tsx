'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import { longUrl } from "@/lib/longUrl";
import { useRouter } from "next/navigation";

export default function Page() {
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleShorten = async () => {
    const normalized = longUrl.normalize(inputUrl);
    let validUrl = longUrl.isValidUrl(normalized);
    let parsedUrl;
    let isProtocolValid;
    if (validUrl) {
      parsedUrl = longUrl.parseUrl(normalized);
      isProtocolValid = longUrl.isValidProtocol(parsedUrl);
      if (isProtocolValid) {
        router.push(`/signup?longUrl=${encodeURIComponent(parsedUrl.toString())}`);
      } else {
        setError("We'll need a valid URL, like \"super-long-link.com/shorten-it\"");
      }
    } else {
      setError("We'll need a valid URL, like \"super-long-link.com/shorten-it\"");
    }
  };

  return (
    <>
      <header>
        <nav className="flex justify-between">
          <ul className="list-none">
            <li className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">
              <Link href="/">
                <Image
                  src="/logo-black.svg"
                  width={168}
                  height={50}
                  alt="logo"
                  className="md:pt-3 w-20 sm:w-22 md:w-27"
                  priority
                />
              </Link>
            </li>
          </ul>
          <ul className="md:pt-2 list-none flex items-center gap-2 sm:gap-4">
            <li><Link href="/login"><Button variant={"ghost"} className="cursor-pointer 
            text-sm px-4 py-4
            sm:px-10 sm:py-6">Log In</Button></Link></li>
            <li><Link href="/signup"><Button className="cursor-pointer
            text-sm px-4 py-4
            sm:px-10 sm:py-6">Sign up</Button></Link></li>
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
