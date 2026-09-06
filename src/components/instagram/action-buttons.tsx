"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { EditProfileDialog } from "@/components/instagram/edit-profile-dialog";
import { cn } from "@/lib/utils";
import type { InstagramProfile } from "@/lib/instagram";

/** Visitor-view action row (Follow/Following / Message / Email) rather than the literal
 *  owner-view (Edit Profile / Share Profile) from the reference screenshot — site visitors are
 *  viewing someone else's brand profile, not their own, matching the hamna.ayub reference. The
 *  dropdown chevron lives inside the Follow button itself once following (real Instagram never
 *  shows it as a separate button). Content editing lives in the small pencil trigger instead. */
export function ActionButtons({ profile }: { profile: InstagramProfile }) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex shrink-0 items-center gap-2 px-4 pb-4">
      <button
        type="button"
        onClick={() => setFollowing((current) => !current)}
        className={cn(
          "flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-sm font-semibold",
          following ? "bg-neutral-800 text-white" : "bg-[#0095F6] text-white hover:bg-[#1877F2]",
        )}
      >
        {following ? "Following" : "Follow"}
        {following && <ChevronDownIcon className="size-4" />}
      </button>
      <button
        type="button"
        className="flex-1 rounded-lg bg-neutral-800 py-1.5 text-sm font-semibold text-white hover:bg-neutral-700"
      >
        Message
      </button>
      <button
        type="button"
        className="flex-1 rounded-lg bg-neutral-800 py-1.5 text-sm font-semibold text-white hover:bg-neutral-700"
      >
        Email
      </button>
      <EditProfileDialog
        profile={profile}
        triggerClassName="shrink-0 rounded-lg border-neutral-700 bg-transparent text-white hover:bg-neutral-800"
      />
    </div>
  );
}
