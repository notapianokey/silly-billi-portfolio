"use client";

import { PostsTabIcon, ReelsTabIcon, RepostsTabIcon, TaggedTabIcon } from "@/components/instagram/icons";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "posts", icon: PostsTabIcon },
  { id: "reels", icon: ReelsTabIcon },
  { id: "reposts", icon: RepostsTabIcon },
  { id: "tagged", icon: TaggedTabIcon },
] as const;

export type TabId = (typeof TABS)[number]["id"];

/** Posts is the only functional tab for this first build — Reels/Reposts/Tagged are real chrome
 *  with no content behind them yet, matching how the video-editing sidebar keeps some
 *  destinations decorative until there's something real to show. Icons themselves are traced
 *  exactly from instagram.com (see components/instagram/icons.tsx). */
export function TabBar({ active, onChange }: { active: TabId; onChange: (tab: TabId) => void }) {
  return (
    <div className="flex shrink-0">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex flex-1 items-center justify-center border-t py-2.5",
            active === tab.id ? "border-white text-white" : "border-transparent text-neutral-500",
          )}
        >
          <tab.icon className="size-6" />
        </button>
      ))}
    </div>
  );
}
