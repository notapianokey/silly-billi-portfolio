import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The fixed mobile-width content column every Instagram-clone page renders inside of —
 *  deliberately not responsive to the viewport, per the client's "phone version even on
 *  desktop" instruction. Scrolls internally so it reads as a phone screen rather than
 *  stretching the outer page. Transparent — the background photo lives at the page level now
 *  (full-viewport bleed, not confined to this column), not owned by this component. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "ig-font no-scrollbar relative z-10 h-[calc(100vh-2.5rem)] w-full max-w-[470px] overflow-y-auto text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
