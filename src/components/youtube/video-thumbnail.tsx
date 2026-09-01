import { PlayIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { formatDuration, THUMBNAIL_PALETTE } from "@/lib/videos";

interface VideoThumbnailProps {
  title: string;
  durationSeconds: number;
  paletteIndex: number;
  thumbnailSrc?: string;
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
          "relative w-full overflow-hidden rounded-xl",
          !thumbnailSrc && "bg-gradient-to-br",
          !thumbnailSrc && gradient,
          isShort ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            sizes={isShort ? "160px" : "(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 100vw"}
            className="object-cover"
          />
        ) : isShort ? (
          <>
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute inset-x-2 bottom-2 text-sm font-bold leading-tight text-white drop-shadow-sm">
              {title}
            </span>
          </>
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
