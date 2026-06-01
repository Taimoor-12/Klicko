"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clipboard, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function LinksTable() {
  const links = [
    {
      id: "1",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "2",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "3",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "4",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "5",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "6",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "7",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "8",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "9",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "10",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "11",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "12",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
    {
      id: "13",
      shortUrl: "http://localhost:4000/cO",
      longUrl:
        "https://google.com/feuiawjfeioajofieawjoafejaojfoiawjefeaoejfaijafeofaepokfeaopkfapokfopewkfopakpofakopafwkapoewfkfeapokfaeopkfaopkefpaokaewfopkaewf",
      clicks: 4,
      Created: "22 July",
      Actions: "Idk",
    },
  ];

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      toast.error("Unable to copy. Please try again.");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Short URL</TableHead>
          <TableHead className="hidden md:table-cell">Long URL</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {links.map((link) => (
          <TableRow key={link.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <a
                  href={link.shortUrl}
                  target="_blank"
                  className="text-primary hover:underline font-mono"
                >
                  <span className="hidden md:inline">{link.shortUrl}</span>
                  <span className="md:hidden">{new URL(link.shortUrl).pathname.slice(1)}</span>
                </a>
                <div className="relative h-6 w-4 shrink-0">
                  <Clipboard
                    onClick={() => handleCopy(link.id, link.shortUrl)}
                    className={`
                    absolute inset-0 cursor-pointer transition-all duration-200
                    ${
                      copiedId === link.id
                        ? "scale-0 opacity-0"
                        : "scale-100 opacity-100"
                    }  
                  `}
                  />

                  <Check
                    className={`
                    absolute inset-0 text-green-500 transition-all duration-200
                    ${
                      copiedId === link.id
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    }
                  `}
                  />
                </div>
              </div>
            </TableCell>
            <TableCell className="max-w-xs truncate hidden md:table-cell font-mono">{link.longUrl}</TableCell>
            <TableCell>{link.clicks}</TableCell>
            <TableCell>{link.Created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
