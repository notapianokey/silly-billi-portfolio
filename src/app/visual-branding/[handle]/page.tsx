"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";

import { ActionButtons } from "@/components/instagram/action-buttons";
import { InstagramHeaderBar } from "@/components/instagram/header-bar";
import { PhoneFrame } from "@/components/instagram/phone-frame";
import { PostGrid } from "@/components/instagram/post-grid";
import { ProfileHeader } from "@/components/instagram/profile-header";
import { StoryHighlights } from "@/components/instagram/story-highlights";
import { TabBar, type TabId } from "@/components/instagram/tab-bar";
import { getInstagramProfile } from "@/lib/instagram";

interface ProfilePageProps {
  params: Promise<{ handle: string }>;
}

/** Instagram profile clone, rendered as the phone/mobile layout even on desktop — the client's
 *  explicit call, not a responsive redesign. Deliberately has no site chrome (no SidebarRail,
 *  no TopHeader) — this is meant to read as the real app, not a page inside the rest of the
 *  site's YouTube-styled shell. */
export default function InstagramProfilePage({ params }: ProfilePageProps) {
  const { handle } = use(params);
  const profile = getInstagramProfile(handle);
  const [tab, setTab] = useState<TabId>("posts");

  if (!profile) notFound();

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="flex justify-center py-5">
        <PhoneFrame>
          <InstagramHeaderBar handle={profile.handle} />
          <ProfileHeader profile={profile} />
          <ActionButtons profile={profile} />
          <StoryHighlights profile={profile} />
          <TabBar active={tab} onChange={setTab} />
          {tab === "posts" && <PostGrid handle={profile.handle} posts={profile.posts} />}
          {tab === "reels" && <EmptyTab label="Reels" />}
          {tab === "reposts" && <EmptyTab label="Reposts" />}
          {tab === "tagged" && <EmptyTab label="Tagged posts" />}
        </PhoneFrame>
      </div>
    </div>
  );
}

function EmptyTab({ label }: { label: string }) {
  return <p className="py-16 text-center text-sm text-neutral-500">{label} coming soon</p>;
}
