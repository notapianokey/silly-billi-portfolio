"use client";

import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

import { VideoThumbnail } from "./video-thumbnail";
import { formatViews, type VideoProject } from "@/lib/videos";

interface VideoCardProps {
  video: VideoProject;
  onSelect: (video: VideoProject) => void;
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  return (
    <div className="group flex w-full flex-col gap-3">
      <button type="button" onClick={() => onSelect(video)} className="text-left">
        <VideoThumbnail title={video.title} durationSeconds={video.durationSeconds} paletteIndex={video.paletteIndex} />
      </button>

      <div className="flex gap-3">
        <Image
          src="/brand/mascot.png"
          alt="Silly Billi Agency"
          width={36}
          height={36}
          className="mt-0.5 size-9 shrink-0 rounded-full object-cover"
        />
        <button type="button" onClick={() => onSelect(video)} className="min-w-0 flex-1 text-left">
          <span className="line-clamp-2 text-sm font-medium leading-snug">{video.title}</span>
          <span className="mt-1 block text-xs text-muted-foreground">Silly Billi Agency</span>
          <span className="block text-xs text-muted-foreground">
            {formatViews(video.views)} · {video.publishedLabel}
          </span>
        </button>
        <button
          type="button"
          onClick={(event) => event.stopPropagation()}
          className="h-fit shrink-0 rounded-full p-1.5 opacity-0 hover:bg-accent group-hover:opacity-100"
        >
          <EllipsisVertical className="size-4" />
        </button>
      </div>
    </div>
  );
}
