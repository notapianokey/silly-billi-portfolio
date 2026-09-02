"use client";

import { ClapperboardIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { EditChannelDialog } from "@/components/channel/edit-channel-dialog";
import { ShortsShelf } from "@/components/youtube/shorts-shelf";
import { SidebarRail } from "@/components/youtube/sidebar-rail";
import { TopHeader } from "@/components/youtube/top-header";
import { VideoCard } from "@/components/youtube/video-card";
import { CHANNEL_PROFILE } from "@/lib/channel";
import { VIDEO_PROJECTS } from "@/lib/videos";

export default function AboutPage() {
  const [query, setQuery] = useState("");
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  return (
    <div className="min-h-screen">
      <TopHeader query={query} onQueryChange={setQuery} />
      <SidebarRail />

      <div className="md:pl-60">
        <main className="px-4 py-6 md:px-6">
          {/* Banner */}
          <div
            className="h-28 w-full bg-cover bg-center sm:h-40 md:h-48"
            style={{
              backgroundImage: CHANNEL_PROFILE.bannerSrc
                ? `url(${CHANNEL_PROFILE.bannerSrc})`
                : undefined,
            }}
          >
            {!CHANNEL_PROFILE.bannerSrc && (
              <div className="h-full w-full bg-gradient-to-r from-fuchsia-500 to-purple-700" />
            )}
          </div>

          {/* Channel header */}
          <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-start">
            <Image
              src="/brand/mascot.png"
              alt="Silly Billi Studio"
              width={160}
              height={160}
              className="size-24 shrink-0 rounded-full object-cover sm:size-32"
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h1 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight sm:text-4xl">
                  Silly Billi Studio
                </h1>
                <EditChannelDialog
                  description={CHANNEL_PROFILE.description}
                  bannerSrc={CHANNEL_PROFILE.bannerSrc}
                  socialLinks={CHANNEL_PROFILE.socialLinks}
                  triggerClassName="shrink-0 rounded-full"
                />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                @sillybillistudio · 200+ videos delivered
              </p>

              <button
                type="button"
                onClick={() => setDescriptionExpanded((current) => !current)}
                className="mt-3 max-w-2xl text-left text-sm text-muted-foreground"
              >
                <span className={descriptionExpanded ? undefined : "line-clamp-2"}>
                  {CHANNEL_PROFILE.description}
                </span>
                <span className="ml-1 font-medium text-foreground">
                  {descriptionExpanded ? "Show less" : "...more"}
                </span>
              </button>

              {CHANNEL_PROFILE.socialLinks.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {CHANNEL_PROFILE.socialLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium hover:bg-accent"
                    >
                      <ExternalLinkIcon className="size-3.5" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b text-sm font-medium">
            <span className="border-b-2 border-foreground pb-3">Home</span>
            <Link href="/video-editing#long-form" className="pb-3 text-muted-foreground hover:text-foreground">
              Videos
            </Link>
            <Link href="/video-editing#shorts" className="pb-3 text-muted-foreground hover:text-foreground">
              Shorts
            </Link>
          </div>

          {/* Featured video — empty until a real show reel is cut */}
          <div className="flex items-center justify-center gap-3 rounded-xl border border-dashed py-14 text-center text-muted-foreground">
            <ClapperboardIcon className="size-6" />
            <span className="text-sm font-medium">Show Reel will be uploaded soon</span>
          </div>

          {/* Videos */}
          <div className="pt-6">
            <h2 className="mb-3 text-lg font-semibold">Videos</h2>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {VIDEO_PROJECTS.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>

          <div className="mt-8 pb-10">
            <ShortsShelf />
          </div>
        </main>
      </div>
    </div>
  );
}
