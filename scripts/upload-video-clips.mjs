// One-off/occasional tool: compresses real source videos (from the git-ignored
// "VIDEO EDITING PAGE CONTENT" folder) and uploads them to Vercel Blob storage, then writes
// the resulting public URL into each entry's `videoUrl` in videos.data.json.
//
// Runs for every entry listed in FILES that doesn't already have a `videoUrl` — including ones
// that also have a `sourceUrl` (a platform link + a local source file aren't mutually
// exclusive: the client wants the native self-hosted player over the platform's embed widget
// whenever we actually have the footage locally, even if it's also posted elsewhere. sourceUrl
// still drives the "View on X" link either way.
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
  "article-4-reel-1a": "Article 4 Reel 1a.mov",
  "article-4-reel-2a": "Article 4 Reel 2a.mov",
  "iran-and-the-west": "Iran and The West.mp4",
  "imran-waseem-dream-team":
    "Imran + Waseem Dream Team #imrankhan #imrankhanworldcup #waseemakram #pakistancricket #eonpodcast [15R6CCoQN64].webm",
  "imran-khan-king-of-cricket":
    "Imran Khan： King of Cricket #imrankhan #cricketworldcup1992 #imrankhanworldcup #eonpodcast [WnhjCEgRVkc].webm",
  "pakistanis-want-foreigners-good-time":
    "Pakistanis Want Foreigners To Have A Good Time In Pakistan! #CallumAbroad #Hospitality [uu-NZjJzUBY].webm",
  final: "Final.mp4",
  "reel-02": "Reel 02.mp4",
  "sequence-01-1": "Sequence 01_1.mp4",
  "the-reel": "The Reel.mp4",
  "facebook-reel-1lores": "facebook reel_1lores.mp4",
  reel: "reel.mp4",
  "she-lost-her-son-to-drugs":
    "She lost her son to drugs.Her interview is one of the most heartbreaking parts of our documentar.mp4",
  "this-mothers-interview-heartbreaking":
    "This mothers interview is one of the most heartbreaking parts of our documentary.If you stil ha.mp4",
  "property-dealers-vs-kickboxer-football-challenge":
    "Property Dealers Vs. Kickboxer Football Challenge.mp4",
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
    if (entry.videoUrl) {
      console.log(`Skipping ${id}: already has a videoUrl.`);
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
