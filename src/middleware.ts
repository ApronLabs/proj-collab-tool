import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret-change-in-production"
);

const COOKIE_NAME = "session-token";

const PUBLIC_ROUTES = ["/not-authenticated"];

async function verifyToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload.sub as string) || null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes handle their own auth
  if (pathname.startsWith("/collab/api/") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Strip basePath for route matching
  const path = pathname.replace(/^\/collab/, "") || "/";

  const isPublicRoute = PUBLIC_ROUTES.includes(path);
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const userId = token ? await verifyToken(token) : null;

  // Unauthenticated access to protected page
  if (!userId && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/collab/not-authenticated";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/collab/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|uploads).*)",
  ],
};
