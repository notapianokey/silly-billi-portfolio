"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  MaximizeIcon,
  PauseIcon,
  SettingsIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Volume2Icon,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use, useState } from "react";

import { Button } from "@/components/ui/button";
import { EditVideoDialog } from "@/components/youtube/edit-video-dialog";
import { SidebarRail } from "@/components/youtube/sidebar-rail";
import { SocialEmbed } from "@/components/youtube/social-embed";
import { TopHeader } from "@/components/youtube/top-header";
import { VideoRowCard } from "@/components/youtube/video-row-card";
import { cn } from "@/lib/utils";
import {
  formatDuration,
  formatViews,
  getEmbedInfo,
  getPlatformLabel,
  THUMBNAIL_PALETTE,
  VIDEO_PROJECTS,
} from "@/lib/videos";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const { id } = use(params);
  const video = VIDEO_PROJECTS.find((item) => item.id === id);

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [query, setQuery] = useState("");

  if (!video) notFound();

  const embedInfo = video.sourceUrl ? getEmbedInfo(video.sourceUrl) : null;
  const hasRealPlayback = embedInfo !== null || !!video.videoUrl;
  const upNext = VIDEO_PROJECTS.filter((item) => item.id !== video.id);

  return (
    <div className="min-h-screen">
      <TopHeader query={query} onQueryChange={setQuery} />
      <SidebarRail />

      <div className="md:pl-60">
        <main className="flex flex-col gap-6 px-4 py-6 md:px-6 lg:flex-row">
          <div className="min-w-0 flex-1 lg:max-w-4xl">
            <div
              className={cn(
                "relative overflow-hidden rounded-xl bg-black",
                !video.videoUrl && embedInfo?.type === "instagram"
                  ? "flex items-center justify-center p-4"
                  : "aspect-video",
              )}
            >
              {video.videoUrl ? (
                <video
                  src={video.videoUrl}
                  poster={video.thumbnailSrc}
                  controls
                  playsInline
                  className="h-full w-full"
                />
              ) : embedInfo ? (
                <SocialEmbed
                  info={embedInfo}
                  className={embedInfo.type === "youtube" ? "h-full w-full" : "w-full max-w-sm"}
                />
              ) : (
                <PlaceholderPlayer paletteIndex={video.paletteIndex} thumbnailSrc={video.thumbnailSrc} />
              )}
              {!hasRealPlayback && <PlayerControlBar />}
            </div>

            <div className="flex flex-col gap-3 py-4">
              <div className="flex items-start justify-between gap-2">
                <h1 className="text-lg font-semibold leading-snug">{video.title}</h1>
                <EditVideoDialog
                  id={video.id}
                  kind="video"
                  title={video.title}
                  description={video.description}
                  thumbnailSrc={video.thumbnailSrc}
                  sourceUrl={video.sourceUrl}
                  triggerClassName="shrink-0 rounded-full"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/brand/mascot.png"
                    alt="Silly Billi Studio"
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">Silly Billi Studio</p>
                    <p className="text-xs text-muted-foreground">128K subscribers</p>
                  </div>
                  <Button size="sm" className="ml-2 rounded-full">
                    Subscribe
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center overflow-hidden rounded-full border">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm hover:bg-accent">
                      <ThumbsUpIcon className="size-4" />
                      {Math.round(video.views / 1400)}
                    </span>
                    <span className="h-5 w-px bg-border" />
                    <span className="px-3 py-1.5 hover:bg-accent">
                      <ThumbsDownIcon className="size-4" />
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm hover:bg-accent">
                    <ShareIcon className="size-4" />
                    Share
                  </span>
                  {video.sourceUrl && (
                    <a
                      href={video.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm hover:bg-accent"
                    >
                      <ExternalLinkIcon className="size-4" />
                      View on {getPlatformLabel(video.sourceUrl)}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {video.chapters.length > 0 && (
                <div>
                  <h2 className="mb-2 text-sm font-semibold">Chapters</h2>
                  <ul className="flex flex-col gap-1">
                    {video.chapters.map((chapter) => (
                      <li key={chapter.timestamp}>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm hover:bg-accent"
                        >
                          <span>{chapter.label}</span>
                          <span className="tabular-nums text-muted-foreground">
                            {chapter.timestamp}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div
                onClick={() => setDescriptionExpanded((current) => !current)}
                className="cursor-pointer rounded-xl bg-secondary/50 p-3 transition hover:bg-secondary/70"
              >
                <p className="mb-2 text-sm font-medium">
                  {formatViews(video.views)} · {formatDuration(video.durationSeconds)} runtime
                </p>
                <p
                  className={cn(
                    "whitespace-pre-wrap text-sm",
                    !descriptionExpanded && "line-clamp-2",
                  )}
                >
                  {video.description || "No description yet."}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium">
                  {descriptionExpanded ? (
                    <>
                      Show less <ChevronUpIcon className="size-4" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDownIcon className="size-4" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="flex w-full flex-col gap-3 lg:w-[400px] lg:shrink-0">
            <h2 className="text-sm font-semibold">Up next</h2>
            {upNext.map((item) => (
              <VideoRowCard key={item.id} video={item} />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
}

function PlaceholderPlayer({
  paletteIndex,
  thumbnailSrc,
}: {
  paletteIndex: number;
  thumbnailSrc?: string;
}) {
  const gradient = THUMBNAIL_PALETTE[paletteIndex % THUMBNAIL_PALETTE.length];

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        !thumbnailSrc && "bg-gradient-to-br",
        !thumbnailSrc && gradient,
      )}
    >
      {thumbnailSrc && (
        <Image src={thumbnailSrc} alt="" fill sizes="900px" className="object-cover" />
      )}
      <div className={cn("relative flex flex-col items-center gap-2 text-white/90", thumbnailSrc && "drop-shadow-lg")}>
        <PauseIcon className="size-12 fill-white/90" />
      </div>
    </div>
  );
}

/** Decorative player chrome — matches YouTube's control bar layout; not wired to real playback. */
function PlayerControlBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6">
      <div className="mb-2 h-[3px] w-full rounded-full bg-white/30">
        <div className="h-full w-1/3 rounded-full bg-red-600" />
      </div>
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <PauseIcon className="size-5 fill-white" />
          <Volume2Icon className="size-5" />
          <span className="text-xs tabular-nums">0:32 / --:--</span>
        </div>
        <div className="flex items-center gap-3">
          <SettingsIcon className="size-4" />
          <MaximizeIcon className="size-4" />
        </div>
      </div>
    </div>
  );
}
