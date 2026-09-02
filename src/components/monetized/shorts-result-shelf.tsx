import { PlayIcon } from "lucide-react";
import Image from "next/image";

import type { MonetizedResultItem } from "@/lib/monetized-channels";

interface ShortsResultShelfProps {
  shorts: MonetizedResultItem[];
}

/** Same fixed, non-scrolling shelf treatment as the site's own Shorts — matches real YouTube's
 *  shelf behavior and keeps the mascot play badge consistent everywhere "Shorts" appears. */
export function ShortsResultShelf({ shorts }: ShortsResultShelfProps) {
  if (shorts.length === 0) return null;

  return (
    <section className="py-2">
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
          <a
            key={short.url}
            href={short.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[8px] bg-secondary">
              {short.thumbnailSrc && (
                <Image
                  src={short.thumbnailSrc}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              )}
              {short.durationLabel && (
                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
                  {short.durationLabel}
                </span>
              )}
            </div>
            <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug">{short.title}</p>
            {short.viewsLabel && (
              <p className="mt-1 text-xs text-muted-foreground">{short.viewsLabel}</p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
