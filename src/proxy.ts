import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COMING_SOON_HOSTS = new Set([
  "sillybilliportfolio.com",
  "www.sillybilliportfolio.com",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next/") || pathname === "/coming-soon") {
    return;
  }
  const host = request.headers.get("host")?.split(":")[0];
  if (host && COMING_SOON_HOSTS.has(host)) {
    return NextResponse.rewrite(new URL("/coming-soon", request.url));
  }
}
