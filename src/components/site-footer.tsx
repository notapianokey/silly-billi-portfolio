import Link from "next/link";

import { cn } from "@/lib/utils";

/** First year of publication — a copyright notice doesn't need to roll forward every January. */
const COPYRIGHT_YEAR = 2026;

/** Copyright line + the two policy links. Restyle per surface via `className`. */
export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-6 text-xs text-muted-foreground",
        className,
      )}
    >
      <span>© {COPYRIGHT_YEAR} Silly Billi Studio. All rights reserved.</span>
      <Link href="/privacy-policy" className="hover:underline">
        Privacy Policy
      </Link>
      <Link href="/cookies-policy" className="hover:underline">
        Cookies Policy
      </Link>
    </footer>
  );
}
