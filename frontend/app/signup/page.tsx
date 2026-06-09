import { SignupForm } from "@/components/signup-form";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
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
          <SignupForm />
        </Suspense>
      </div>
    </div>
  )
}
