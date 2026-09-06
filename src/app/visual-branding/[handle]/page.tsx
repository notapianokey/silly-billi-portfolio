"use client";

import Image from "next/image";
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
 *  site's YouTube-styled shell.
 *
 *  The brand background photo is full-viewport here (fixed, covers the entire browser window),
 *  not confined to the narrow mobile-width content column — the client's explicit correction
 *  after an earlier version left dark empty margins on either side of the phone-width UI on
 *  desktop. Only the actual chrome (header, buttons, grid, etc.) stays mobile-width; the photo
 *  behind it fills the whole screen. */
export default function InstagramProfilePage({ params }: ProfilePageProps) {
  const { handle } = use(params);
  const profile = getInstagramProfile(handle);
  const [tab, setTab] = useState<TabId>("posts");

  if (!profile) notFound();

  return (
    <div className="relative min-h-screen bg-black">
      {profile.backgroundSrc && (
        <>
          {/* next/image's `fill` sets its own absolute inset-0 inline — equivalent to fixed
              full-viewport coverage here since the outer page itself never scrolls (only the
              phone-width content column scrolls internally). */}
          <Image src={profile.backgroundSrc} alt="" fill sizes="100vw" className="object-cover" priority />
          {/* Contrast overlay — keeps white chrome text legible over a bright or busy brand
              photo. Harmless dead weight over the plain black fallback (no backgroundSrc). */}
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
        </>
      )}

      <div className="relative flex justify-center py-5">
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
  return <p className="ig-text-shadow py-16 text-center text-sm text-white/80">{label} coming soon</p>;
}
