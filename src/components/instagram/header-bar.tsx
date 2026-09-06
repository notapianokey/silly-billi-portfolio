import { BellIcon, ChevronLeftIcon, MoreHorizontalIcon } from "lucide-react";

import { VerifiedBadgeIcon } from "@/components/instagram/icons";

/** Instagram's own top bar. Kept fully decorative for now (per this session's answer) — no
 *  function behind the back/bell/menu icons yet; the client will decide later which get real
 *  links vs. get removed. The verified badge is traced exactly from instagram.com's own SVG
 *  (see components/instagram/icons.tsx); the second icon is three dots (Instagram's real profile
 *  menu), not a hamburger — that was a wrong icon choice, not a simplification. Bell/dots sit
 *  inside circular tap targets matching the reference screenshot; Instagram only renders that
 *  icon for logged-in viewers, which this can't verify against without signing into a real
 *  account, so its exact glyph is a best-effort match, not a traced copy.
 *
 *  No solid divider under the header and light (not dark) button borders — this page now sits
 *  over a full-bleed brand background photo (the mockup-style pivot), where a solid
 *  bg-neutral-800 line/border would look like an opaque UI panel instead of transparent chrome. */
export function InstagramHeaderBar({ handle }: { handle: string }) {
  return (
    <div className="ig-text-shadow flex shrink-0 items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <ChevronLeftIcon className="size-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
        <span className="text-xl">{handle}</span>
        <VerifiedBadgeIcon className="size-[18px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
      </div>
      <div className="flex items-center gap-1">
        <button type="button" className="flex size-9 items-center justify-center rounded-full border border-white/40">
          <BellIcon className="size-5" strokeWidth={1.75} />
        </button>
        <button type="button" className="flex size-9 items-center justify-center rounded-full border border-white/40">
          <MoreHorizontalIcon className="size-5" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
