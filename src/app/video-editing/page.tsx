"use client";

import { useMemo, useState } from "react";

import { CategoryPills } from "@/components/youtube/category-pills";
import { ShortsShelf } from "@/components/youtube/shorts-shelf";
import { SidebarRail } from "@/components/youtube/sidebar-rail";
import { TopHeader } from "@/components/youtube/top-header";
import { VideoCard } from "@/components/youtube/video-card";
import { VIDEO_PROJECTS, type VideoCategoryId } from "@/lib/videos";

export default function VideoEditingPage() {
  const [category, setCategory] = useState<VideoCategoryId | null>(null);
  const [query, setQuery] = useState("");

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase().replace(/^#/, "");

    return VIDEO_PROJECTS.filter((video) => {
      const matchesCategory = category === null || video.category === category;
      const matchesQuery =
        normalizedQuery === "" ||
        video.title.toLowerCase().includes(normalizedQuery) ||
        video.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="min-h-screen">
      <TopHeader query={query} onQueryChange={setQuery} />
      <SidebarRail />

      <div className="md:pl-60">
        <CategoryPills value={category} onSelect={setCategory} />

        <main className="px-4 py-6 md:px-6">
          {filteredVideos.length > 0 ? (
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

          {category === null && query === "" && <ShortsShelf />}
        </main>
      </div>
    </div>
  );
}
