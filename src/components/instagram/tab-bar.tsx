"use client";

import { Grid3x3Icon, SquarePlayIcon, UserSquareIcon } from "lucide-react";

import { RepostsTabIcon } from "@/components/instagram/icons";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "posts", icon: Grid3x3Icon },
  { id: "reels", icon: SquarePlayIcon },
  { id: "reposts", icon: RepostsTabIcon },
  { id: "tagged", icon: UserSquareIcon },
] as const;

export type TabId = (typeof TABS)[number]["id"];

/** Posts is the only functional tab for this first build — Reels/Reposts/Tagged are real chrome
 *  with no content behind them yet, matching how the video-editing sidebar keeps some
 *  destinations decorative until there's something real to show.
 *
 *  Uses clean, purpose-built outline icons (lucide) rather than Instagram's own traced fill
 *  paths rendered as strokes — those paths use nested subpaths (opposite winding) to punch
 *  "holes" for rings/frames under fill-rule, which is exactly why forcing them into stroke mode
 *  produced the doubled/parallel-line artifact the client flagged. Once the design moved to an
 *  outline-only look, a real single-path outline icon is the correct fix, not a patch on top of
 *  a fill-shaped path. */
export function TabBar({ active, onChange }: { active: TabId; onChange: (tab: TabId) => void }) {
  return (
    <div className="flex shrink-0">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex flex-1 items-center justify-center border-b py-3",
            active === tab.id ? "border-white text-white" : "border-transparent text-white/60",
          )}
        >
          <tab.icon className="size-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}
