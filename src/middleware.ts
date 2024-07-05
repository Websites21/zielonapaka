import { type NextRequest, NextResponse } from 'next/server';
import { checkAuthorization } from './lib/server-utils';

export async function middleware(req: NextRequest) {
  const isAuthorized = checkAuthorization(req);

  if (!isAuthorized) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    });
  }
}

export const config = {
  matcher: '/admin/:path*',
};
