import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COMING_SOON_HOSTS = new Set([
  "sillybilliportfolio.com",
  "www.sillybilliportfolio.com",
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];
  const { pathname } = request.nextUrl;
  if (host && COMING_SOON_HOSTS.has(host) && pathname !== "/coming-soon") {
    return NextResponse.rewrite(new URL("/coming-soon", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
