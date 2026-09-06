import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The fixed phone-shaped shell every Instagram-clone page renders inside of — deliberately not
 *  responsive to the viewport, per the client's "phone version even on desktop" instruction.
 *  Scrolls internally so it reads as a phone screen rather than stretching the outer page. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "ig-font no-scrollbar flex h-[calc(100vh-2.5rem)] w-full max-w-[390px] flex-col overflow-y-auto rounded-[38px] border border-neutral-800 bg-black text-white shadow-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
