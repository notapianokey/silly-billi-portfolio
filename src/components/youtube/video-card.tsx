"use client";

import Image from "next/image";
import Link from "next/link";

import { EditVideoDialog } from "./edit-video-dialog";
import { VideoThumbnail } from "./video-thumbnail";
import { getViewsLabel, type VideoProject } from "@/lib/videos";

interface VideoCardProps {
  video: VideoProject;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group flex w-full flex-col gap-3">
      <Link href={`/video-editing/watch/${video.id}`}>
        <VideoThumbnail
          title={video.title}
          durationSeconds={video.durationSeconds}
          paletteIndex={video.paletteIndex}
          thumbnailSrc={video.thumbnailSrc}
        />
      </Link>

      <div className="flex gap-3">
        <Image
          src="/brand/mascot.png"
          alt="Silly Billi Studio"
          width={36}
          height={36}
          className="mt-0.5 size-9 shrink-0 rounded-full object-cover"
        />
        <Link href={`/video-editing/watch/${video.id}`} className="min-w-0 flex-1">
          <span className="line-clamp-2 text-sm font-medium leading-snug">{video.title}</span>
          <span className="mt-1 block text-xs text-muted-foreground">Silly Billi Studio</span>
          <span className="block text-xs text-muted-foreground">
            {video.id === "main" ? "Varied Views" : getViewsLabel(video.views, video.sourceUrl)}
          </span>
        </Link>
        <EditVideoDialog
          id={video.id}
          kind="video"
          title={video.title}
          description={video.description}
          thumbnailSrc={video.thumbnailSrc}
          sourceUrl={video.sourceUrl}
          category={video.category}
          language={video.language}
          triggerClassName="h-fit shrink-0 rounded-full p-1.5 opacity-0 hover:bg-accent group-hover:opacity-100"
        />
      </div>
    </div>
  );
}
