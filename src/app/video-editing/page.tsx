"use client";

import { useMemo, useState } from "react";

import { CategoryPills } from "@/components/youtube/category-pills";
import { ShortsShelf } from "@/components/youtube/shorts-shelf";
import { SidebarRail } from "@/components/youtube/sidebar-rail";
import { TopHeader } from "@/components/youtube/top-header";
import { VideoCard } from "@/components/youtube/video-card";
import {
  SHORT_PROJECTS,
  VIDEO_PROJECTS,
  type PillId,
  type ShortProject,
  type VideoProject,
} from "@/lib/videos";

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

type FeedRow =
  | { type: "videos"; items: VideoProject[] }
  | { type: "shorts"; items: ShortProject[] };

/**
 * Matches real YouTube's home feed: Shorts don't get their own horizontally-scrolling strip —
 * they show up as fixed shelves interspersed between rows of regular videos, throughout the
 * same vertical feed. Confirmed by live-inspecting youtube.com's actual DOM structure.
 */
function buildInterleavedFeed(): FeedRow[] {
  const videoChunks = chunk(VIDEO_PROJECTS, 3);
  const shortChunks = chunk(SHORT_PROJECTS, 5);
  const rows: FeedRow[] = [];

  for (let i = 0; i < Math.max(videoChunks.length, shortChunks.length); i++) {
    if (videoChunks[i]) rows.push({ type: "videos", items: videoChunks[i] });
    if (shortChunks[i]) rows.push({ type: "shorts", items: shortChunks[i] });
  }

  return rows;
}

/** A pill matches a video/short on either its content-type category or its language. */
function matchesPill(item: { category?: string; language: string }, pill: PillId): boolean {
  return item.category === pill || item.language === pill;
}

export default function VideoEditingPage() {
  const [category, setCategory] = useState<PillId | null>(null);
  const [query, setQuery] = useState("");
  const isUnfiltered = category === null && query === "";

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase().replace(/^#/, "");

    return VIDEO_PROJECTS.filter((video) => {
      const matchesCategory = category === null || matchesPill(video, category);
      const matchesQuery =
        normalizedQuery === "" ||
        video.title.toLowerCase().includes(normalizedQuery) ||
        video.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const filteredShorts = useMemo(() => {
    if (category === null) return SHORT_PROJECTS;
    return SHORT_PROJECTS.filter((short) => matchesPill(short, category));
  }, [category]);

  const feed = useMemo(() => (isUnfiltered ? buildInterleavedFeed() : null), [isUnfiltered]);
  const firstShortsRowIndex = feed?.findIndex((row) => row.type === "shorts") ?? -1;

  return (
    <div className="min-h-screen">
      <TopHeader query={query} onQueryChange={setQuery} />
      <SidebarRail />

      <div className="md:pl-60">
        <CategoryPills value={category} onSelect={setCategory} />

        <main className="px-4 py-6 md:px-6">
          <div id="long-form" className="scroll-mt-20">
            {feed ? (
              <div className="flex flex-col gap-8">
                {feed.map((row, index) =>
                  row.type === "videos" ? (
                    <div
                      key={`videos-${index}`}
                      className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                      {row.items.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                  ) : (
                    <ShortsShelf
                      key={`shorts-${index}`}
                      shorts={row.items}
                      anchor={index === firstShortsRowIndex}
                    />
                  ),
                )}
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No videos match that search.
              </p>
            )}
          </div>

          {/* Shown separately (not interleaved) whenever a category/language filter or a
              search is active — the interleaved feed already covers the fully-unfiltered
              case. Falls back to an empty anchor so the sidebar's #shorts link always
              resolves to something, even mid-search (search doesn't filter Shorts) or when
              a filter matches zero Shorts. */}
          {!isUnfiltered && (
            <div className="pb-10">
              {query === "" && filteredShorts.length > 0 ? (
                <ShortsShelf shorts={filteredShorts} />
              ) : (
                <section id="shorts" className="scroll-mt-20" />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
