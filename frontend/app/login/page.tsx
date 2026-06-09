import { LoginForm } from "@/components/login-form";
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Log In',
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 self-center font-medium pb-6">
          <Image
            src="/logo-black.svg"
            width={168}
            height={50}
            alt="logo"
            className="md:pt-3 w-20 sm:w-22 md:w-27"
            priority
          />
        </Link>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
