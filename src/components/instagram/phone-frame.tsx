import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The fixed mobile-width content column every Instagram-clone page renders inside of —
 *  deliberately not responsive to the viewport, per the client's "phone version even on
 *  desktop" instruction. No longer owns its own scroll container (see the page component for
 *  why) — content just flows normally and the page itself scrolls, so the mouse wheel works
 *  everywhere on screen, not just directly over this column. Transparent — the background
 *  photo lives at the page level (full-viewport, position: fixed), not owned by this component. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("ig-font relative z-10 w-full max-w-[470px] text-white", className)}>
      {children}
    </div>
  );
}
