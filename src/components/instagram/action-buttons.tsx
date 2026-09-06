"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { EditProfileDialog } from "@/components/instagram/edit-profile-dialog";
import { cn } from "@/lib/utils";
import type { InstagramProfile } from "@/lib/instagram";

const GLASS_SURFACE = "border-white/50 bg-white/10 text-white backdrop-blur-md hover:bg-white/20";
const GLASS_BUTTON = cn("rounded-lg border py-1 text-[13px] font-medium", GLASS_SURFACE);

/** Visitor-view action row (Follow/Following / Message / Email) rather than the literal
 *  owner-view (Edit Profile / Share Profile) from the reference screenshot — site visitors are
 *  viewing someone else's brand profile, not their own, matching the hamna.ayub reference. The
 *  dropdown chevron lives inside the Follow button itself once following (real Instagram never
 *  shows it as a separate button). Content editing lives in the small pencil trigger instead.
 *
 *  Glassmorphic treatment (translucent white fill + backdrop blur, not just an outline) for
 *  every button including Follow — the "environmental" pivot drops literal Instagram's filled
 *  brand-blue primary CTA in favor of one consistent glass-chrome look over the brand photo. */
export function ActionButtons({ profile }: { profile: InstagramProfile }) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex shrink-0 items-center gap-2.5 px-6 pb-6">
      <button
        type="button"
        onClick={() => setFollowing((current) => !current)}
        className={cn("flex flex-1 items-center justify-center gap-1", GLASS_BUTTON)}
      >
        {following ? "Following" : "Follow"}
        {following && <ChevronDownIcon className="size-4" />}
      </button>
      <button type="button" className={cn("flex-1", GLASS_BUTTON)}>
        Message
      </button>
      <button type="button" className={cn("flex-1", GLASS_BUTTON)}>
        Email
      </button>
      <EditProfileDialog profile={profile} triggerClassName={cn("shrink-0", GLASS_SURFACE)} />
    </div>
  );
}
