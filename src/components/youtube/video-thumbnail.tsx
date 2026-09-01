import { PlayIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { formatDuration, THUMBNAIL_PALETTE } from "@/lib/videos";

interface VideoThumbnailProps {
  title: string;
  durationSeconds: number;
  paletteIndex: number;
  thumbnailSrc?: string;
  /** "9:16" renders at YouTube's real Shorts card proportions (2:3) and radius (8px). */
  aspect?: "video" | "9:16";
}

export function VideoThumbnail({
  title,
  durationSeconds,
  paletteIndex,
  thumbnailSrc,
  aspect = "video",
}: VideoThumbnailProps) {
  const gradient = THUMBNAIL_PALETTE[paletteIndex % THUMBNAIL_PALETTE.length];
  const isShort = aspect === "9:16";

  return (
    <div className="group relative w-full">
      <div
        className={cn(
          "relative w-full overflow-hidden",
          isShort ? "rounded-[8px] aspect-[2/3]" : "rounded-[12px] aspect-video",
          !thumbnailSrc && "bg-gradient-to-br",
          !thumbnailSrc && gradient,
        )}
      >
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            sizes={isShort ? "160px" : "(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 100vw"}
            quality={90}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <span className="text-sm font-semibold text-white/90 drop-shadow-sm">{title}</span>
          </div>
        )}
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
