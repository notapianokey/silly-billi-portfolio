// One-off/occasional tool: compresses real source videos (from the git-ignored
// "VIDEO EDITING PAGE CONTENT" folder) and uploads them to Vercel Blob storage, then writes
// the resulting public URL into each entry's `videoUrl` in videos.data.json.
//
// Only run for entries that have no `sourceUrl` (nothing publicly posted to embed) — those
// entries stay dark/silent otherwise, since there's no other way to make them playable. Entries
// with a `sourceUrl` already get a real platform embed and don't need this.
//
// Usage: node --env-file=.env.local scripts/upload-video-clips.mjs
// Requires .env.local with BLOB_READ_WRITE_TOKEN (from `vercel env pull .env.local`) and ffmpeg
// on PATH.

import { put } from "@vercel/blob";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const SOURCE_DIR = "VIDEO EDITING PAGE CONTENT";
const DATA_PATH = "src/lib/videos.data.json";
const TMP_DIR = process.env.CLAUDE_SCRATCHPAD ?? process.env.TEMP ?? ".";

/** Maps data entry id -> source filename in SOURCE_DIR. Only entries without a sourceUrl. */
const FILES = {
  main: "Main.mp4",
  "240726-reaction-video-new-logo": "240726_Reaction_Video_New_Logo.mov",
  "legitimacy-episode-4": "Legitimacy Episode 4.mov",
  "editing-sample-etc": "Editing Sample ETC.mp4",
  "painting-5-reel-1a": "Painting 5 Reel 1a.mov",
  power2: "Power2.mp4",
  "trends-2": "Trends_2.mp4",
  "client-trial-sub-1": "client trial sub 1.mp4",
  "article-4-reel-1a": "Article 4 Reel 1a.mov",
  "article-4-reel-2a": "Article 4 Reel 2a.mov",
  "iran-and-the-west": "Iran and The West.mp4",
  "imran-waseem-dream-team":
    "Imran + Waseem Dream Team #imrankhan #imrankhanworldcup #waseemakram #pakistancricket #eonpodcast [15R6CCoQN64].webm",
  "imran-khan-king-of-cricket":
    "Imran Khan： King of Cricket #imrankhan #cricketworldcup1992 #imrankhanworldcup #eonpodcast [WnhjCEgRVkc].webm",
  "pakistanis-want-foreigners-good-time":
    "Pakistanis Want Foreigners To Have A Good Time In Pakistan! #CallumAbroad #Hospitality [uu-NZjJzUBY].webm",
};

/** Longer pieces get compressed harder to stay within the free storage budget. */
const LONG_IDS = new Set(["240726-reaction-video-new-logo", "legitimacy-episode-4"]);

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN missing — run `vercel env pull .env.local` first.");
  }

  const data = JSON.parse(await fs.readFile(DATA_PATH, "utf-8"));
  const allEntries = [...data.videoProjects, ...data.shortProjects];

  for (const [id, filename] of Object.entries(FILES)) {
    const entry = allEntries.find((item) => item.id === id);
    if (!entry) {
      console.warn(`Skipping ${id}: no matching data entry.`);
      continue;
    }
    if (entry.sourceUrl) {
      console.log(`Skipping ${id}: has a sourceUrl, uses a real embed instead.`);
      continue;
    }

    const srcPath = path.join(SOURCE_DIR, filename);
    const tmpPath = path.join(TMP_DIR, `${id}.mp4`);
    const maxDim = LONG_IDS.has(id) ? 640 : 720;
    const crf = LONG_IDS.has(id) ? 30 : 28;

    console.log(`[${id}] compressing...`);
    await execFileAsync("ffmpeg", [
      "-y",
      "-i",
      srcPath,
      "-vf",
      `scale='if(gt(iw,ih),min(${maxDim},iw),-2)':'if(gt(iw,ih),-2,min(${maxDim},ih))'`,
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      String(crf),
      "-c:a",
      "aac",
      "-b:a",
      "96k",
      "-movflags",
      "+faststart",
      tmpPath,
    ]);

    const bytes = await fs.readFile(tmpPath);
    console.log(`[${id}] uploading (${(bytes.length / 1024 / 1024).toFixed(1)}MB)...`);
    const blob = await put(`videos/${id}.mp4`, bytes, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    entry.videoUrl = blob.url;
    await fs.unlink(tmpPath);
    console.log(`[${id}] done -> ${blob.url}`);
  }

  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log("videos.data.json updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
