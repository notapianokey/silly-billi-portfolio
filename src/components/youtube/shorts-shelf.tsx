import { ExternalLinkIcon } from "lucide-react";

import { EditVideoDialog } from "./edit-video-dialog";
import { VideoThumbnail } from "./video-thumbnail";
import { formatViews, getPlatformLabel, SHORT_PROJECTS } from "@/lib/videos";

export function ShortsShelf() {
  return (
    <section id="shorts" className="mt-8 scroll-mt-20">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        <ShortsGlyph className="size-6 text-red-600" />
        Shorts
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {SHORT_PROJECTS.map((short) => (
          <div key={short.id} className="group w-[160px] shrink-0">
            <VideoThumbnail
              title={short.title}
              durationSeconds={short.durationSeconds}
              paletteIndex={short.paletteIndex}
              thumbnailSrc={short.thumbnailSrc}
              aspect="9:16"
            />
            <div className="mt-2 flex items-start justify-between gap-1">
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-medium leading-snug">{short.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatViews(short.views)}</p>
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
              <EditVideoDialog
                id={short.id}
                kind="short"
                title={short.title}
                thumbnailSrc={short.thumbnailSrc}
                sourceUrl={short.sourceUrl}
                triggerClassName="size-6 shrink-0 rounded-full p-1 opacity-0 hover:bg-accent group-hover:opacity-100"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShortsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="7" fill="currentColor" />
      <path d="M10 7.5 16 12l-6 4.5v-9Z" fill="white" />
    </svg>
  );
}
