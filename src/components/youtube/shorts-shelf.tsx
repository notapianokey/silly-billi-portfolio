import { ExternalLinkIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { VideoThumbnail } from "./video-thumbnail";
import { getPlatformLabel, getViewsLabel, SHORT_PROJECTS, type ShortProject } from "@/lib/videos";

interface ShortsShelfProps {
  shorts?: ShortProject[];
  /** Only the first shelf on a page should carry the #shorts anchor id. */
  anchor?: boolean;
}

/**
 * Matches real YouTube's Shorts shelf: a fixed, non-scrolling row that shows as many Shorts as
 * fit the grid width (wrapping to a second row on narrow viewports) — not a horizontally
 * scrolling strip. Confirmed by live-inspecting youtube.com's homepage DOM: the shelf container
 * is `display: flex; overflow-x: clip`, i.e. no scroll mechanism at all.
 */
export function ShortsShelf({ shorts = SHORT_PROJECTS, anchor = true }: ShortsShelfProps) {
  return (
    <section id={anchor ? "shorts" : undefined} className="scroll-mt-20">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        <span className="relative flex size-6 shrink-0 overflow-hidden rounded-[7px]">
          <Image src="/brand/mascot.png" alt="" fill sizes="24px" className="object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/15">
            <PlayIcon className="size-3 fill-white text-white drop-shadow" />
          </span>
        </span>
        Shorts
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {shorts.map((short) => (
          <div key={short.id} className="group">
            <Link href={`/video-editing/shorts/${short.id}`}>
              <VideoThumbnail
                title={short.title}
                durationSeconds={short.durationSeconds}
                paletteIndex={short.paletteIndex}
                thumbnailSrc={short.thumbnailSrc}
                aspect="9:16"
              />
            </Link>
            <div className="mt-2">
              <p className="line-clamp-2 text-sm font-medium leading-snug">{short.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {getViewsLabel(short.views, short.sourceUrl)}
              </p>
              {short.sourceUrl && (
                <a
                  href={short.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <ExternalLinkIcon className="size-3" />
                  View on {getPlatformLabel(short.sourceUrl)}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
