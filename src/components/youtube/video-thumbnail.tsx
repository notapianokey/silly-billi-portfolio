import { PlayIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDuration, THUMBNAIL_PALETTE } from "@/lib/videos";

interface VideoThumbnailProps {
  title: string;
  durationSeconds: number;
  paletteIndex: number;
  aspect?: "video" | "9:16";
}

export function VideoThumbnail({
  title,
  durationSeconds,
  paletteIndex,
  aspect = "video",
}: VideoThumbnailProps) {
  const gradient = THUMBNAIL_PALETTE[paletteIndex % THUMBNAIL_PALETTE.length];

  return (
    <div className="group relative w-full">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-gradient-to-br",
          gradient,
          aspect === "video" ? "aspect-video" : "aspect-[9/16]",
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
          <span className="text-sm font-semibold text-white/90 drop-shadow-sm">
            {title}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
          <PlayIcon className="size-10 fill-white text-white drop-shadow" />
        </div>
      </div>
      <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
        {formatDuration(durationSeconds)}
      </div>
    </div>
  );
}
