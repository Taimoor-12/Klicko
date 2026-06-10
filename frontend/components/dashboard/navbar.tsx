'use client'

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { logout } from "@/lib/actions/user";

export function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await logout();

      if (res.status === 200) {
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full">
      <nav
        className="
          flex flex-wrap items-center justify-between
          gap-y-4
        "
      >
        <Link
          href="/dashboard"
          className="
            transition-transform duration-300 ease-in-out
            hover:scale-105
            shrink-0
          "
        >
          <Image
            src="/logo-black.svg"
            width={168}
            height={50}
            alt="logo"
            priority
            className="
              w-20
              sm:w-24
              md:w-28
              h-auto
            "
          />
        </Link>

        <div
          className="
            flex items-center justify-end
            gap-2 sm:gap-4
            flex-1
            min-w-0
          "
        >
          <Button
            onClick={handleLogout}
            variant="destructive"
            disabled={loading}
            className="
              shrink-0

              text-xs
              sm:text-sm

              px-3 py-2
              sm:px-5 sm:py-5
              md:px-8

              cursor-pointer
            "
          >
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </nav>
    </header>
  );
}
