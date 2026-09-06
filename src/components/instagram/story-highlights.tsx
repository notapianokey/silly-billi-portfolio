import { PlusIcon } from "lucide-react";
import Image from "next/image";

import { EditProfileDialog } from "@/components/instagram/edit-profile-dialog";
import type { InstagramProfile } from "@/lib/instagram";

/** Real horizontal scrolling here, unlike the YouTube Shorts shelf fix elsewhere on this site —
 *  Instagram's highlights row actually scrolls on the real platform, so this isn't the same
 *  placeholder-era hack that fix corrected. */
export function StoryHighlights({ profile }: { profile: InstagramProfile }) {
  if (profile.highlights.length === 0) {
    return (
      <div className="flex shrink-0 px-4 pb-2">
        <EditProfileDialog
          profile={profile}
          trigger={
            <div className="flex flex-col items-center gap-1">
              <div className="flex size-16 items-center justify-center rounded-full border border-dashed border-white/60 bg-transparent">
                <PlusIcon className="size-6 text-white/70" />
              </div>
              <span className="ig-text-shadow text-[12px] text-white">New</span>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="no-scrollbar flex shrink-0 gap-4 overflow-x-auto px-4 pb-2">
      {profile.highlights.map((highlight) => (
        <div key={highlight.id} className="flex shrink-0 flex-col items-center gap-1">
          <div className="rounded-full border border-white/60 bg-transparent p-[2px]">
            <div className="relative size-16 overflow-hidden rounded-full bg-neutral-800">
              {highlight.coverSrc && (
                <Image src={highlight.coverSrc} alt="" fill sizes="64px" className="object-cover" />
              )}
            </div>
          </div>
          <span className="ig-text-shadow max-w-16 truncate text-[12px] text-white">{highlight.label}</span>
        </div>
      ))}
    </div>
  );
}
