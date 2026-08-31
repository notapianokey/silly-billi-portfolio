import { VideoThumbnail } from "./video-thumbnail";
import { formatViews, SHORT_PROJECTS } from "@/lib/videos";

export function ShortsShelf() {
  return (
    <section id="shorts" className="mt-8 scroll-mt-20">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        <ShortsGlyph className="size-6 text-red-600" />
        Shorts
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {SHORT_PROJECTS.map((short) => (
          <div key={short.id} className="w-[160px] shrink-0">
            <VideoThumbnail
              title={short.title}
              durationSeconds={45}
              paletteIndex={short.paletteIndex}
              aspect="9:16"
            />
            <p className="mt-2 text-xs text-muted-foreground">{formatViews(short.views)}</p>
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
