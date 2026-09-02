"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  PauseIcon,
  PlayIcon,
  ShareIcon,
  ThumbsUpIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useRef, useState } from "react";

import { EditVideoDialog } from "@/components/youtube/edit-video-dialog";
import { SidebarRail } from "@/components/youtube/sidebar-rail";
import { SocialEmbed } from "@/components/youtube/social-embed";
import { TopHeader } from "@/components/youtube/top-header";
import { cn } from "@/lib/utils";
import {
  getEmbedInfo,
  getPlatformLabel,
  SHORT_PROJECTS,
  THUMBNAIL_PALETTE,
} from "@/lib/videos";

interface ShortWatchPageProps {
  params: Promise<{ id: string }>;
}

export default function ShortWatchPage({ params }: ShortWatchPageProps) {
  const { id } = use(params);
  const index = SHORT_PROJECTS.findIndex((item) => item.id === id);
  const [query, setQuery] = useState("");
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (index === -1) notFound();

  const short = SHORT_PROJECTS[index];
  const prev = SHORT_PROJECTS[index - 1];
  const next = SHORT_PROJECTS[index + 1];
  const embedInfo = short.sourceUrl ? getEmbedInfo(short.sourceUrl) : null;
  const gradient = THUMBNAIL_PALETTE[short.paletteIndex % THUMBNAIL_PALETTE.length];

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div className="min-h-screen">
      <TopHeader query={query} onQueryChange={setQuery} />
      <SidebarRail />

      <div className="md:pl-60">
        <main className="flex justify-center px-4 py-8 md:px-6">
          <div className="flex items-center gap-4">
            {/* Prev/next column */}
            <div className="hidden flex-col gap-3 sm:flex">
              <NavButton href={prev ? `/video-editing/shorts/${prev.id}` : undefined} direction="up" />
              <NavButton href={next ? `/video-editing/shorts/${next.id}` : undefined} direction="down" />
            </div>

            {/* Vertical card */}
            <div className="relative aspect-[9/16] h-[calc(100vh-8rem)] max-h-[800px] w-auto overflow-hidden rounded-2xl bg-black">
              {short.videoUrl ? (
                <video
                  ref={videoRef}
                  src={short.videoUrl}
                  poster={short.thumbnailSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onClick={togglePlay}
                  className="h-full w-full cursor-pointer object-contain"
                />
              ) : embedInfo ? (
                <div className="flex h-full w-full items-center justify-center">
                  <SocialEmbed info={embedInfo} className="max-h-full w-full" />
                </div>
              ) : (
                <div
                  className={cn(
                    "relative flex h-full w-full items-center justify-center",
                    gradient,
                    "bg-gradient-to-br",
                  )}
                >
                  {short.thumbnailSrc && (
                    <Image src={short.thumbnailSrc} alt="" fill className="object-cover" />
                  )}
                  <PauseIcon className="relative size-14 fill-white/90 text-white/90 drop-shadow" />
                </div>
              )}

              {/* Play/pause + mute — real YouTube Shorts has no native browser control bar
                  (no scrubber, no duration, no volume slider); it's a borderless autoplaying
                  video with just these two small overlay buttons top-left. */}
              {short.videoUrl && (
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={playing ? "Pause" : "Play"}
                    className="flex size-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                  >
                    {playing ? (
                      <PauseIcon className="size-4" />
                    ) : (
                      <PlayIcon className="size-4 fill-white" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute" : "Mute"}
                    className="flex size-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                  >
                    {muted ? (
                      <VolumeXIcon className="size-4" />
                    ) : (
                      <Volume2Icon className="size-4" />
                    )}
                  </button>
                </div>
              )}

              {/* Caption overlay — shown over the placeholder and our own native player; skipped
                  only for the raw Instagram embed fallback, which brings its own caption UI.
                  Matches real YouTube Shorts: a faint single-stop gradient (not a heavy scrim),
                  a channel row, and the title clamped to one line with no description inline —
                  description only shows if the viewer taps to expand it, same as real YouTube. */}
              {(short.videoUrl || !embedInfo) && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/40 to-transparent p-4 pt-10">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/brand/mascot.png"
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-white">Silly Billi Studio</span>
                    <button
                      type="button"
                      className="ml-1 rounded-full border border-white/70 px-3 py-1 text-xs font-medium text-white"
                    >
                      Subscribe
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDescriptionOpen((current) => !current)}
                    className="flex items-start gap-1 text-left"
                  >
                    <span className="line-clamp-1 text-sm font-normal text-white">
                      {short.title}
                    </span>
                    {short.description && (
                      <ChevronDownIcon
                        className={cn(
                          "mt-0.5 size-4 shrink-0 text-white/80 transition-transform",
                          descriptionOpen && "rotate-180",
                        )}
                      />
                    )}
                  </button>
                  {short.description && (
                    <p
                      className={cn(
                        "whitespace-pre-wrap text-xs text-white/80",
                        !descriptionOpen && "line-clamp-1",
                      )}
                    >
                      {short.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action rail */}
            <div className="flex flex-col items-center gap-5">
              <RailButton icon={ThumbsUpIcon} label={String(Math.round(short.views / 3200) || 0)} />
              <RailButton icon={ShareIcon} label="Share" />
              {short.sourceUrl && (
                <a
                  href={short.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 text-white"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                    <ExternalLinkIcon className="size-5" />
                  </span>
                  <span className="max-w-16 truncate text-center text-xs text-muted-foreground">
                    {getPlatformLabel(short.sourceUrl)}
                  </span>
                </a>
              )}
              <EditVideoDialog
                id={short.id}
                kind="short"
                title={short.title}
                description={short.description}
                thumbnailSrc={short.thumbnailSrc}
                sourceUrl={short.sourceUrl}
                category={short.category}
                language={short.language}
                triggerClassName="size-11 rounded-full bg-secondary"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function RailButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button type="button" className="flex flex-col items-center gap-1">
      <span className="flex size-11 items-center justify-center rounded-full bg-secondary hover:bg-accent">
        <Icon className="size-5" />
      </span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </button>
  );
}

function NavButton({ href, direction }: { href?: string; direction: "up" | "down" }) {
  const Icon = direction === "up" ? ChevronUpIcon : ChevronDownIcon;

  if (!href) {
    return (
      <span className="flex size-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground/40">
        <Icon className="size-5" />
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="flex size-10 items-center justify-center rounded-full bg-secondary hover:bg-accent"
    >
      <Icon className="size-5" />
    </Link>
  );
}
