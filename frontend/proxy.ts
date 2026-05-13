import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get('authToken');
  const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isOnDashboard && !token) {
    const signupUrl = new URL('/signup', request.url);
    signupUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signupUrl);
  }

  if (!isOnDashboard && token) {
    return NextResponse.redirect(new URL('dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/signup', '/']
}
