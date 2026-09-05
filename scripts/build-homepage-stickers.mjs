// One-off/occasional tool: builds pixel-accurate homepage "sticker" cutouts from a hand-filled
// color mask, instead of hand-typed clip-path polygon coordinates (which were too imprecise —
// see CLAUDE.md's Homepage section for why). The client fills each artifact in the homepage
// scene solid with a distinct flat color on a copy of the source image; this script thresholds
// each color into a binary mask (with connected-component filtering to drop stray false-positive
// pixels elsewhere in the painting), then bakes that exact silhouette into a real alpha channel
// on a crop of the ORIGINAL (unmasked) scene image — so the sticker just IS the object, with true
// transparency, rather than a rectangular image clipped by an approximated shape.
//
// Usage: node scripts/build-homepage-stickers.mjs
// Update MASK_PATH below to a new mask file, re-run, and copy the printed `box` percentages into
// the STICKERS array in src/app/page.tsx.

import sharp from "sharp";
import fs from "node:fs/promises";

const MASK_PATH = "homepage/masked banner homepage.png";
const SCENE_PATH = "homepage/final_homepage_1920.png";
const OUT_DIR = "public/homepage/stickers";
const PAD = 40;
const FEATHER = 1.2;
const TOLERANCE = 20;
const MIN_COMPONENT_AREA = 300;

const TARGETS = [
  { name: "vhs", color: [255, 0, 0] },
  { name: "brief", color: [0, 255, 0] },
  { name: "notebook", color: [0, 0, 255] },
  { name: "logo", color: [255, 255, 0] },
  { name: "photo", color: [255, 0, 255] },
  { name: "getintouch", color: [0, 255, 255] },
];

function findComponents(matched, width, height) {
  const visited = new Uint8Array(width * height);
  const components = [];
  const stack = [];

  for (let start = 0; start < width * height; start++) {
    if (!matched[start] || visited[start]) continue;
    let area = 0;
    let minX = width, minY = height, maxX = -1, maxY = -1;
    stack.push(start);
    visited[start] = 1;
    while (stack.length) {
      const idx = stack.pop();
      const x = idx % width;
      const y = (idx / width) | 0;
      area++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      const neighbors = [idx - 1, idx + 1, idx - width, idx + width];
      for (const n of neighbors) {
        if (n < 0 || n >= width * height) continue;
        if (Math.abs((n % width) - x) > 1) continue; // avoid row wrap
        if (matched[n] && !visited[n]) {
          visited[n] = 1;
          stack.push(n);
        }
      }
    }
    components.push({ area, minX, minY, maxX, maxY });
  }
  return components;
}

async function main() {
  const maskImg = sharp(MASK_PATH);
  const { data: maskData, info } = await maskImg.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const sceneImg = sharp(SCENE_PATH).ensureAlpha();
  const { data: sceneData } = await sceneImg.raw().toBuffer({ resolveWithObject: true });

  await fs.mkdir(OUT_DIR, { recursive: true });
  const results = [];

  for (const target of TARGETS) {
    const [tr, tg, tb] = target.color;
    const matched = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = maskData[idx], g = maskData[idx + 1], b = maskData[idx + 2];
        if (Math.abs(r - tr) <= TOLERANCE && Math.abs(g - tg) <= TOLERANCE && Math.abs(b - tb) <= TOLERANCE) {
          matched[y * width + x] = 1;
        }
      }
    }

    const components = findComponents(matched, width, height).filter((c) => c.area >= MIN_COMPONENT_AREA);
    if (components.length === 0) {
      console.warn(`No significant components for ${target.name}`);
      continue;
    }

    // Zero out pixels belonging to discarded (small/noise) components by rebuilding `matched`
    // restricted to kept components' bounding boxes intersected with original matched pixels.
    let minX = width, minY = height, maxX = -1, maxY = -1;
    for (const c of components) {
      if (c.minX < minX) minX = c.minX;
      if (c.minY < minY) minY = c.minY;
      if (c.maxX > maxX) maxX = c.maxX;
      if (c.maxY > maxY) maxY = c.maxY;
    }

    const padMinX = Math.max(0, minX - PAD);
    const padMinY = Math.max(0, minY - PAD);
    const padMaxX = Math.min(width - 1, maxX + PAD);
    const padMaxY = Math.min(height - 1, maxY + PAD);
    const boxW = padMaxX - padMinX + 1;
    const boxH = padMaxY - padMinY + 1;

    const alphaCrop = Buffer.alloc(boxW * boxH);
    for (let y = 0; y < boxH; y++) {
      for (let x = 0; x < boxW; x++) {
        alphaCrop[y * boxW + x] = matched[(y + padMinY) * width + (x + padMinX)] ? 255 : 0;
      }
    }

    const alphaBuf = await sharp(alphaCrop, { raw: { width: boxW, height: boxH, channels: 1 } })
      .blur(FEATHER)
      .raw()
      .toBuffer();

    const rgbaCrop = Buffer.alloc(boxW * boxH * 4);
    for (let y = 0; y < boxH; y++) {
      for (let x = 0; x < boxW; x++) {
        const srcIdx = ((y + padMinY) * width + (x + padMinX)) * 4;
        const dstIdx = (y * boxW + x) * 4;
        rgbaCrop[dstIdx] = sceneData[srcIdx];
        rgbaCrop[dstIdx + 1] = sceneData[srcIdx + 1];
        rgbaCrop[dstIdx + 2] = sceneData[srcIdx + 2];
        rgbaCrop[dstIdx + 3] = alphaBuf[y * boxW + x];
      }
    }

    // Lossless WebP, served via a plain <img> in page.tsx (NOT next/image) — Next's image
    // optimizer re-encodes everything it serves as lossy WebP/AVIF regardless of source format
    // and quality setting, which reintroduces faint non-zero alpha at DCT block edges that
    // `drop-shadow` then amplifies into a visible ghost rectangle. Lossless WebP guarantees exact
    // alpha (unlike lossy WebP or Next-reprocessed PNG) while still compressing better than PNG.
    await sharp(rgbaCrop, { raw: { width: boxW, height: boxH, channels: 4 } })
      .webp({ lossless: true })
      .toFile(`${OUT_DIR}/${target.name}.webp`);

    results.push({
      name: target.name,
      componentCount: components.length,
      componentAreas: components.map((c) => c.area),
      box: {
        left: `${((padMinX / width) * 100).toFixed(2)}%`,
        top: `${((padMinY / height) * 100).toFixed(2)}%`,
        width: `${((boxW / width) * 100).toFixed(2)}%`,
        height: `${((boxH / height) * 100).toFixed(2)}%`,
      },
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
