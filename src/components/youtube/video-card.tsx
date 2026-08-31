"use client";

import { VideoThumbnail } from "./video-thumbnail";
import { formatViews, type VideoProject } from "@/lib/videos";

interface VideoCardProps {
  video: VideoProject;
  onSelect: (video: VideoProject) => void;
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(video)}
      className="group flex w-full flex-col gap-2 text-left"
    >
      <VideoThumbnail
        title={video.title}
        durationSeconds={video.durationSeconds}
        paletteIndex={video.paletteIndex}
      />
      <div className="flex flex-col">
        <span className="line-clamp-2 text-sm font-medium leading-snug">
          {video.title}
        </span>
        <span className="mt-1 text-xs text-muted-foreground">
          Silly Billi Agency · {formatViews(video.views)} · {video.publishedLabel}
        </span>
      </div>
    </button>
  );
}
