import videosData from "./videos.data.json";

export type VideoCategoryId =
  | "talking-head"
  | "vlogs"
  | "commercial"
  | "short-form";

export interface VideoCategoryDef {
  id: VideoCategoryId;
  label: string;
}

export const VIDEO_CATEGORIES: VideoCategoryDef[] = [
  { id: "talking-head", label: "Talking Head" },
  { id: "vlogs", label: "Vlogs" },
  { id: "commercial", label: "Commercial" },
  { id: "short-form", label: "Short Form" },
];

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
  category: VideoCategoryId;
  tags: string[];
  durationSeconds: number;
  views: number;
  publishedLabel: string;
  description: string;
  chapters: Chapter[];
  paletteIndex: number;
  /** Path under /public, e.g. "/videos/thumbnails/main.jpg". Falls back to a gradient when unset. */
  thumbnailSrc?: string;
}

export interface ShortProject {
  id: string;
  title: string;
  views: number;
  paletteIndex: number;
  durationSeconds: number;
  thumbnailSrc?: string;
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
