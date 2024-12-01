// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow base64 URLs to pass through
  if (request.nextUrl.pathname.startsWith('/sects/join/')) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/sects/join/:path*',
};
