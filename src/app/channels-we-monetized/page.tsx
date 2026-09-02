"use client";

import { UsersIcon } from "lucide-react";
import { useState } from "react";

import { ChannelResultCard } from "@/components/monetized/channel-result-card";
import { ShortsResultShelf } from "@/components/monetized/shorts-result-shelf";
import { VideoResultRow } from "@/components/monetized/video-result-row";
import { SidebarRail } from "@/components/youtube/sidebar-rail";
import { TopHeader } from "@/components/youtube/top-header";
import { MONETIZED_CHANNELS } from "@/lib/monetized-channels";

export default function ChannelsWeMonetizedPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen">
      <TopHeader query={query} onQueryChange={setQuery} />
      <SidebarRail />

      <div className="md:pl-60">
        <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 md:px-6">
          {MONETIZED_CHANNELS.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-14 text-center text-muted-foreground">
              <UsersIcon className="size-6" />
              <span className="text-sm font-medium">Channel links coming soon</span>
            </div>
          ) : (
            MONETIZED_CHANNELS.map((channel) => (
              <div key={channel.id} className="flex flex-col gap-4 border-b pb-6 last:border-b-0">
                <ChannelResultCard channel={channel} />
                {channel.topVideos.map((video) => (
                  <VideoResultRow key={video.url} video={video} channel={channel} />
                ))}
                <ShortsResultShelf shorts={channel.topShorts} />
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
