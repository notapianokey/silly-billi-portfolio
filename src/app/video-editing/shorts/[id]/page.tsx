"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  PauseIcon,
  ShareIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";

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

  if (index === -1) notFound();

  const short = SHORT_PROJECTS[index];
  const prev = SHORT_PROJECTS[index - 1];
  const next = SHORT_PROJECTS[index + 1];
  const embedInfo = short.sourceUrl ? getEmbedInfo(short.sourceUrl) : null;
  const gradient = THUMBNAIL_PALETTE[short.paletteIndex % THUMBNAIL_PALETTE.length];

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
                  src={short.videoUrl}
                  poster={short.thumbnailSrc}
                  controls
                  playsInline
                  className="h-full w-full object-contain"
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

              {/* Caption scrim — only over the static placeholder; real embeds/video bring their own chrome */}
              {!embedInfo && !short.videoUrl && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-12">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/brand/mascot.png"
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-white">Silly Billi Agency</span>
                    <button
                      type="button"
                      className="ml-1 rounded-full border border-white/70 px-3 py-1 text-xs font-medium text-white"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-sm text-white">{short.title}</p>
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
                thumbnailSrc={short.thumbnailSrc}
                sourceUrl={short.sourceUrl}
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
