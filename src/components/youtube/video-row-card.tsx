import Link from "next/link";

import { VideoThumbnail } from "./video-thumbnail";
import { formatViews, type VideoProject } from "@/lib/videos";

interface VideoRowCardProps {
  video: VideoProject;
}

/** Compact horizontal card for the "Up next" recommended list on the watch page. */
export function VideoRowCard({ video }: VideoRowCardProps) {
  return (
    <Link href={`/video-editing/watch/${video.id}`} className="flex gap-2">
      <div className="w-40 shrink-0">
        <VideoThumbnail
          title={video.title}
          durationSeconds={video.durationSeconds}
          paletteIndex={video.paletteIndex}
          thumbnailSrc={video.thumbnailSrc}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium leading-snug">{video.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">Silly Billi Agency</p>
        <p className="text-xs text-muted-foreground">
          {formatViews(video.views)} · {video.publishedLabel}
        </p>
      </div>
    </Link>
  );
}
