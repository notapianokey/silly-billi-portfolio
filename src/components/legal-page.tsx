import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";

interface LegalPageProps {
  title: string;
  /** Human-readable date the policy last changed, e.g. "26 September 2026". */
  updated: string;
  children: ReactNode;
}

/** Shared shell for the Privacy / Cookies policy pages: a plain readable column, no platform chrome. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
          <Image
            src="/brand/mascot.png"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full object-cover"
          />
          Silly Billi Studio
        </Link>

        <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated {updated}</p>

        <div className="mt-8 leading-relaxed [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </main>
      <SiteFooter className="border-t" />
    </div>
  );
}
