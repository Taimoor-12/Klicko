'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    const body = { longUrl: url };
    const res = await fetch('https://klicko-production.up.railway.app/api/urls/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = res.json();
    console.log(data);
  };

  return (
    <>
      <header>
        <nav className="flex justify-between">
          <ul className="list-none">
            <li className="w-[120px]">
              <Image
                src="/logo-black.svg"
                width={168}
                height={50}
                alt="logo"
                priority
              />
            </li>
          </ul>
          <ul className="list-none flex items-center gap-4">
            <li><Button size={"xl"} className="text-base cursor-pointer">Sign up</Button></li>
            <li><Button size={"xl"} className="text-base cursor-pointer">Sign In</Button></li>
          </ul>
        </nav>
      </header>
      <main className="mt-24">
        <section>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance max-w-2xl">Shorten Links, Amplify reach</h1>
          <p className="mt-4 text-base italic md:text-2xl">Klicko turns your long, clunky URLs into clean, shareable links in seconds.</p>

          <div className="mt-6 flex gap-6">
            <Input
              className="max-w-2xl min-h-lg" 
              placeholder="Enter your long URL..."
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button className="cursor-pointer" onClick={handleShorten}>Shorten</Button>
          </div>

          {shortUrl && <p className="mt-12">{shortUrl}</p>}
        </section>
      </main>
    </>
  );
}
