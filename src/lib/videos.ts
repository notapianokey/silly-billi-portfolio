import videosData from "./videos.data.json";

export type VideoCategoryId = "talking-head" | "vlogs" | "documentary";
export type LanguageId = "english" | "other-languages";
/** The category pills row is one flat single-select list mixing content-type and language. */
export type PillId = VideoCategoryId | LanguageId;

export interface CategoryDef {
  id: PillId;
  label: string;
}

export const VIDEO_CATEGORIES: CategoryDef[] = [
  { id: "talking-head", label: "Talking Head" },
  { id: "vlogs", label: "Vlogs" },
  { id: "documentary", label: "Documentary" },
];

export const LANGUAGE_CATEGORIES: CategoryDef[] = [
  { id: "english", label: "English" },
  { id: "other-languages", label: "Other Languages" },
];

/** All pills shown in the top filter row, in display order. */
export const PILL_CATEGORIES: CategoryDef[] = [...VIDEO_CATEGORIES, ...LANGUAGE_CATEGORIES];

export const SEARCH_TAG_SUGGESTIONS = [
  "#podcast",
  "#documentary",
  "#shorts",
  "#talkinghead",
  "#brandfilm",
];

/** Fallback background for any project without a real thumbnailSrc yet. */
export const THUMBNAIL_PALETTE = [
  "from-orange-400 to-amber-600",
  "from-blue-500 to-indigo-700",
  "from-emerald-500 to-teal-700",
  "from-fuchsia-500 to-purple-700",
] as const;

export interface Chapter {
  label: string;
  timestamp: string;
}

export interface VideoProject {
  id: string;
  title: string;
  /** Unset for pieces that don't fit any content-type pill (e.g. the intros compilation) —
   *  they still show under "All", just not under any specific category. */
  category?: VideoCategoryId;
  language: LanguageId;
  tags: string[];
  durationSeconds: number;
  views: number;
  description: string;
  chapters: Chapter[];
  paletteIndex: number;
  /** Path under /public, e.g. "/videos/thumbnails/main.jpg". Falls back to a gradient when unset. */
  thumbnailSrc?: string;
  /** Link to the real posted video (YouTube/Instagram/TikTok/etc). Drives the "View on X" button. */
  sourceUrl?: string;
  /** Vercel Blob URL for a compressed self-hosted copy — used when there's no sourceUrl to embed. */
  videoUrl?: string;
}

export interface ShortProject {
  id: string;
  title: string;
  description?: string;
  category: VideoCategoryId;
  language: LanguageId;
  views: number;
  paletteIndex: number;
  durationSeconds: number;
  thumbnailSrc?: string;
  sourceUrl?: string;
  videoUrl?: string;
}

export const VIDEO_PROJECTS: VideoProject[] = videosData.videoProjects as VideoProject[];
export const SHORT_PROJECTS: ShortProject[] = videosData.shortProjects as ShortProject[];

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const paddedSeconds = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${minutes}:${paddedSeconds}`;
}

export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(views < 10_000 ? 1 : 0)}K views`;
  return `${views} views`;
}

/**
 * A zero view count with no sourceUrl means there's no way to trace the piece back to a live
 * public post, so showing "0 views" would misleadingly imply it flopped rather than was never
 * (or is no longer) posted publicly.
 */
export function getViewsLabel(views: number, sourceUrl?: string): string {
  if (views === 0 && !sourceUrl) return "No longer publicly posted";
  return formatViews(views);
}

const PLATFORM_LABELS: Record<string, string> = {
  "youtube.com": "YouTube",
  "youtu.be": "YouTube",
  "instagram.com": "Instagram",
  "tiktok.com": "TikTok",
  "facebook.com": "Facebook",
  "fb.watch": "Facebook",
  "twitter.com": "X",
  "x.com": "X",
  "linkedin.com": "LinkedIn",
};

/** "View on YouTube" / "View on Instagram" / etc, derived from the URL's host. Falls back to a generic label for unrecognized hosts. */
export function getPlatformLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return PLATFORM_LABELS[host] ?? "Original Post";
  } catch {
    return "Original Post";
  }
}

export type EmbedInfo =
  | { type: "youtube"; embedUrl: string }
  | { type: "instagram"; permalink: string };

/**
 * Resolves a sourceUrl to something actually embeddable in-page, using each platform's free
 * public embed (no API key/token, no external hosting — the platform hosts the bytes).
 * Returns null for platforms without a workable no-auth embed (TikTok's oEmbed needs a server
 * round-trip we don't have; Facebook/X similarly) — those fall back to the "View on X" link-out.
 */
export function getEmbedInfo(url: string): EmbedInfo | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1);
    if (id) return { type: "youtube", embedUrl: `https://www.youtube-nocookie.com/embed/${id}` };
  }

  if (host === "youtube.com") {
    const id =
      parsed.searchParams.get("v") ??
      (parsed.pathname.startsWith("/shorts/") ? parsed.pathname.split("/")[2] : null) ??
      (parsed.pathname.startsWith("/embed/") ? parsed.pathname.split("/")[2] : null);
    if (id) return { type: "youtube", embedUrl: `https://www.youtube-nocookie.com/embed/${id}` };
  }

  if (host === "instagram.com") {
    const match = parsed.pathname.match(/^\/(reel|p|tv)\/[^/]+\/?/);
    if (match) {
      return { type: "instagram", permalink: `https://www.instagram.com${match[0]}`.replace(/\/$/, "") + "/" };
    }
  }

  return null;
}
