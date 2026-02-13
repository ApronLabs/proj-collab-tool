import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { verifySessionToken } from './index';
import prisma from '@/lib/db';

const COOKIE_NAME = 'session-token';

export async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifySessionToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
  });

  return user;
}

export async function getCurrentUserFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifySessionToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
  });

  return user;
}

export function getUserIdFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifySessionToken(token);
  return payload?.sub ?? null;
}
