import { LinkIcon } from "lucide-react";
import Image from "next/image";

import type { InstagramProfile } from "@/lib/instagram";

/** Renders "@mention" tokens in Instagram's mention-blue, everything else plain — a lightweight
 *  fidelity detail matching the reference screenshot's bio styling (no real linking, since these
 *  aren't real accounts on this site). */
function BioText({ bio }: { bio: string }) {
  return (
    <p className="whitespace-pre-wrap text-sm text-neutral-200">
      {bio.split(/(\s+)/).map((token, index) =>
        token.startsWith("@") && token.length > 1 ? (
          <span key={index} className="font-medium text-sky-400">
            {token}
          </span>
        ) : (
          <span key={index}>{token}</span>
        ),
      )}
    </p>
  );
}

export function ProfileHeader({ profile }: { profile: InstagramProfile }) {
  const [firstLink, ...restLinks] = profile.externalLinks;

  return (
    <div className="flex shrink-0 flex-col gap-4 px-4 py-4">
      <div className="flex items-center gap-6">
        <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-black p-[2px]">
            <div className="relative size-full overflow-hidden rounded-full bg-neutral-800">
              {profile.avatarSrc && (
                <Image src={profile.avatarSrc} alt="" fill sizes="80px" className="object-cover" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-around text-center">
          <Stat value={String(profile.posts.length)} label="posts" />
          <Stat value={profile.followers ?? "0"} label="followers" />
          <Stat value={profile.following ?? "0"} label="following" />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold">{profile.displayName}</p>
        {profile.bio && <BioText bio={profile.bio} />}
        {firstLink && (
          <a
            href={firstLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-1 text-sm font-medium text-neutral-300"
          >
            <LinkIcon className="size-3.5" />
            {firstLink.label}
            {restLinks.length > 0 && (
              <span className="text-neutral-500">and {restLinks.length} more</span>
            )}
          </a>
        )}

        {profile.pills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-200"
              >
                {pill}
              </span>
            ))}
          </div>
        )}

        {profile.followedByLabel && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="size-5 rounded-full border-2 border-black bg-neutral-700" />
              ))}
            </div>
            <p className="text-sm text-neutral-300">{profile.followedByLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-base font-semibold">{value}</span>
      <span className="text-xs text-neutral-400">{label}</span>
    </div>
  );
}
