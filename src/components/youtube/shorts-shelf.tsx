import { VideoThumbnail } from "./video-thumbnail";
import { formatViews, SHORT_PROJECTS } from "@/lib/videos";

export function ShortsShelf() {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold">Shorts</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {SHORT_PROJECTS.map((short) => (
          <div key={short.id} className="w-[160px] shrink-0">
            <VideoThumbnail
              title={short.title}
              durationSeconds={45}
              paletteIndex={short.paletteIndex}
              aspect="9:16"
            />
            <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug">
              {short.title}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatViews(short.views)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
