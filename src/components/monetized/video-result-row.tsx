import Image from "next/image";

import type { MonetizedChannel, MonetizedResultItem } from "@/lib/monetized-channels";

interface VideoResultRowProps {
  video: MonetizedResultItem;
  channel: MonetizedChannel;
}

/** Matches real YouTube's search-result video row: a wide 16:9 thumbnail on the left, title,
 *  views, channel avatar + name on the right — the whole row links out to the real video. */
export function VideoResultRow({ video, channel }: VideoResultRowProps) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 py-2 sm:flex-row"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-secondary sm:w-80">
        {video.thumbnailSrc && (
          <Image
            src={video.thumbnailSrc}
            alt=""
            fill
            sizes="(min-width: 640px) 320px, 100vw"
            className="object-cover"
          />
        )}
        {video.durationLabel && (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
            {video.durationLabel}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-base font-medium leading-snug">{video.title}</p>
        {video.viewsLabel && (
          <p className="mt-1 text-sm text-muted-foreground">{video.viewsLabel}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-secondary">
            {channel.avatarSrc && (
              <Image src={channel.avatarSrc} alt="" fill sizes="24px" className="object-cover" />
            )}
          </div>
          <span className="text-sm text-muted-foreground">{channel.name}</span>
        </div>
      </div>
    </a>
  );
}
