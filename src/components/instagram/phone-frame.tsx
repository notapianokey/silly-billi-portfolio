import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  /** Full-bleed brand background photo — sits fixed behind the scrolling content so it reads as
   *  a backdrop, not something that scrolls away. Falls back to plain black when unset. */
  backgroundSrc?: string;
}

/** The fixed phone-shaped shell every Instagram-clone page renders inside of — deliberately not
 *  responsive to the viewport, per the client's "phone version even on desktop" instruction.
 *  Scrolls internally so it reads as a phone screen rather than stretching the outer page. */
export function PhoneFrame({ children, className, backgroundSrc }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "ig-font relative h-[calc(100vh-2.5rem)] w-full max-w-[390px] overflow-hidden rounded-[38px] border border-neutral-800 bg-black text-white shadow-2xl",
        className,
      )}
    >
      {backgroundSrc && (
        <>
          <Image src={backgroundSrc} alt="" fill sizes="390px" className="object-cover" priority />
          {/* Contrast overlay — keeps white chrome text legible over a bright or busy brand
              photo. Sits behind the content but above the photo; harmless dead weight over the
              plain black fallback since black/20-on-black is imperceptible. */}
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
        </>
      )}
      <div className="no-scrollbar relative z-10 flex h-full flex-col overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
