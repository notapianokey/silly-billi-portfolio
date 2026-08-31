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

/** Cycled per card so placeholder thumbnails read as a designed set, not random noise. */
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
}

export interface ShortProject {
  id: string;
  title: string;
  views: number;
  paletteIndex: number;
}

export const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: "scaled-podcast-100k",
    title: "Scaled a Podcast to 100k Subscribers",
    category: "talking-head",
    tags: ["#podcast", "#talkinghead"],
    durationSeconds: 942,
    views: 128_400,
    publishedLabel: "3 weeks ago",
    description:
      "Full episode edit for a weekly interview podcast — hook restructuring, pacing " +
      "cuts, and a consistent B-roll system that took the channel from flat growth to " +
      "100k subscribers over six months.",
    chapters: [
      { label: "Cold open", timestamp: "0:00" },
      { label: "Guest introduction", timestamp: "0:42" },
      { label: "Main discussion", timestamp: "3:15" },
      { label: "Key insight", timestamp: "11:20" },
      { label: "Close & CTA", timestamp: "15:10" },
    ],
    paletteIndex: 0,
  },
  {
    id: "high-retention-editing-spec",
    title: "High-Retention Editing Spec (Podcast Ep. 12)",
    category: "talking-head",
    tags: ["#podcast", "#retention"],
    durationSeconds: 1284,
    views: 84_200,
    publishedLabel: "1 month ago",
    description:
      "Retention-first edit of a long-form episode — jump cuts on filler words, dynamic " +
      "captions, and pattern interrupts placed against the audience retention graph.",
    chapters: [
      { label: "Hook", timestamp: "0:00" },
      { label: "Setup", timestamp: "0:35" },
      { label: "Story 1", timestamp: "4:02" },
      { label: "Story 2", timestamp: "12:48" },
      { label: "Wrap-up", timestamp: "19:30" },
    ],
    paletteIndex: 1,
  },
  {
    id: "founder-day-in-the-life",
    title: "Founder Day-in-the-Life",
    category: "vlogs",
    tags: ["#vlog", "#founder"],
    durationSeconds: 623,
    views: 46_900,
    publishedLabel: "2 months ago",
    description:
      "Fast-paced lifestyle vlog for a startup founder — handheld footage cut to a driving " +
      "soundtrack with on-screen text call-outs replacing traditional voiceover.",
    chapters: [
      { label: "Morning routine", timestamp: "0:00" },
      { label: "Office standup", timestamp: "1:52" },
      { label: "Client call", timestamp: "3:40" },
      { label: "Evening wind-down", timestamp: "8:15" },
    ],
    paletteIndex: 2,
  },
  {
    id: "product-launch-commercial",
    title: "Product Launch — 30s Commercial",
    category: "commercial",
    tags: ["#commercial", "#brandfilm"],
    durationSeconds: 34,
    views: 212_000,
    publishedLabel: "5 days ago",
    description:
      "Broadcast-ready 30-second spot for a DTC product launch — beauty shots, a tight " +
      "voiceover-led script, and a sound-designed final mix.",
    chapters: [
      { label: "Problem", timestamp: "0:00" },
      { label: "Product reveal", timestamp: "0:08" },
      { label: "Feature montage", timestamp: "0:16" },
      { label: "CTA", timestamp: "0:27" },
    ],
    paletteIndex: 3,
  },
  {
    id: "studio-tour-documentary",
    title: "Studio Tour Mini-Documentary",
    category: "vlogs",
    tags: ["#documentary", "#brandfilm"],
    durationSeconds: 511,
    views: 31_500,
    publishedLabel: "3 months ago",
    description:
      "Short documentary-style piece profiling a client's studio and process — interview " +
      "audio layered over cinematic B-roll, color graded for warmth.",
    chapters: [
      { label: "Opening shots", timestamp: "0:00" },
      { label: "Interview: origins", timestamp: "1:10" },
      { label: "Process walkthrough", timestamp: "4:45" },
      { label: "Closing statement", timestamp: "7:50" },
    ],
    paletteIndex: 1,
  },
  {
    id: "brand-anthem-film",
    title: "Brand Anthem Film",
    category: "commercial",
    tags: ["#brandfilm", "#commercial"],
    durationSeconds: 96,
    views: 158_700,
    publishedLabel: "6 weeks ago",
    description:
      "Emotive brand film built around a single anthem voiceover — match cuts and a " +
      "steadily building score carry the narrative without dialogue.",
    chapters: [
      { label: "Open", timestamp: "0:00" },
      { label: "Rising action", timestamp: "0:22" },
      { label: "Peak", timestamp: "0:58" },
      { label: "Logo out", timestamp: "1:28" },
    ],
    paletteIndex: 0,
  },
];

export const SHORT_PROJECTS: ShortProject[] = [
  { id: "short-01", title: "3 Editing Tricks in 30s", views: 412_000, paletteIndex: 0 },
  { id: "short-02", title: "Before vs. After Color Grade", views: 289_500, paletteIndex: 1 },
  { id: "short-03", title: "Hook Rewrite Breakdown", views: 198_200, paletteIndex: 2 },
  { id: "short-04", title: "Founder Quick Take", views: 94_800, paletteIndex: 3 },
  { id: "short-05", title: "Sound Design Mini-Demo", views: 152_300, paletteIndex: 1 },
];

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
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
