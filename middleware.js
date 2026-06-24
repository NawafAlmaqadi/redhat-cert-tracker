import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const COOKIE_NAME = 'rh_token';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public paths — no auth required
  const publicPaths = [
    '/',
    '/dashboard',
    '/login',
    '/register',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/me',
  ];
  if (publicPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;

  // Only protect private API routes (e.g. /api/certs)
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
