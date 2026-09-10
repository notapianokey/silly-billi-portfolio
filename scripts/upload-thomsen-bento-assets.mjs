// One-off tool: compresses real Thomsen Company brand assets (from the git-ignored
// "Visual Branding/The Thomsen Company" folder) and uploads them to Vercel Blob storage,
// printing the resulting public URLs so they can be plugged into
// src/lib/visual-branding-bento.data.json by hand (this is a one-time content population,
// not an ongoing edit workflow, so there's no local edit UI for it — same reasoning as the
// monetized-channels page).
//
// Usage: node --env-file=.env.local scripts/upload-thomsen-bento-assets.mjs
// Requires .env.local with BLOB_READ_WRITE_TOKEN (from `vercel env pull .env.local`).

import { put } from "@vercel/blob";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "Visual Branding/The Thomsen Company";

/** Maps tile id -> source filename in SOURCE_DIR. */
const FILES = {
  "coat-of-arms": "VIRTUS SUB ROSA LOGO.png",
  "sub-rosa": "SUB ROSA.png",
  shield: "VIRTUS SHIELD.png",
  "owl-snake": "VIRTUS OWL SNAKE.png",
  compass: "VIRTUS COMPASS.png",
  lineart: "coat_of_arms_lineart_transparent.png",
  "marcus-aurelius-parchment": "799503716_1567064261135656_3715775941738431341_n.webp",
  "chess-set-spread": "799392543_2295529937872792_4141427412865652859_n.webp",
  "julius-caesar-rook": "10 King_s Rook Julius Caesar.jpeg",
  "genghis-khan-knight": "9 Queen_s Knight Genghis Khan.jpeg",
  "marcus-aurelius-rook": "11 Queen_s Rook Marcus Aurelius.jpeg",
  "construction-blueprint": "marcus_rook_A8151E_wireframe.webp",
  "workshop-flatlay": "799525923_1074336705244099_5960058874051444304_n.webp",
};

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN missing — run `vercel env pull .env.local` first.");
  }

  const urls = {};

  for (const [id, filename] of Object.entries(FILES)) {
    const srcPath = path.join(SOURCE_DIR, filename);
    console.log(`[${id}] compressing...`);

    const hasAlpha = filename.toLowerCase().endsWith(".png");
    const pipeline = sharp(srcPath).resize(1600, 1600, { fit: "inside", withoutEnlargement: true });
    const bytes = hasAlpha
      ? await pipeline.webp({ quality: 90, lossless: false }).toBuffer()
      : await pipeline.webp({ quality: 82 }).toBuffer();

    console.log(`[${id}] uploading (${(bytes.length / 1024).toFixed(0)}KB)...`);
    const blob = await put(`visual-branding-bento/${id}.webp`, bytes, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "image/webp",
    });

    urls[id] = blob.url;
    console.log(`[${id}] done -> ${blob.url}`);
  }

  await fs.writeFile("scripts/.thomsen-bento-urls.json", JSON.stringify(urls, null, 2) + "\n", "utf-8");
  console.log("\nAll URLs written to scripts/.thomsen-bento-urls.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
