import { del, put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { execFile } from "child_process";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import os from "os";
import path from "path";
import sharp from "sharp";
import { promisify } from "util";

import type { InstagramHighlight, InstagramMedia, InstagramPost, InstagramProfile } from "@/lib/instagram";

const execFileAsync = promisify(execFile);
const DATA_PATH = path.join(process.cwd(), "src", "lib", "instagram.data.json");

const LOCAL_ONLY_MESSAGE =
  "Editing only works when running the site locally (npm run dev) — the live deployed site can't save changes.";

/** Compresses + uploads one image to Blob, capped to a real Instagram-ish serving width. */
async function uploadImage(file: File, key: string, maxWidth: number): Promise<string> {
  const input = Buffer.from(await file.arrayBuffer());
  const output = await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toBuffer();
  const blob = await put(key, output, { access: "public", addRandomSuffix: false, allowOverwrite: true });
  return blob.url;
}

/** Compresses + uploads one video to Blob — same ffmpeg recipe as scripts/upload-video-clips.mjs,
 *  reasonable here since this route (like every other /api/dev/* route) only ever runs locally
 *  alongside that script, which already assumes ffmpeg is on PATH. */
async function uploadVideo(file: File, key: string): Promise<string> {
  const tmpDir = os.tmpdir();
  const inputPath = path.join(tmpDir, `ig-in-${randomUUID()}`);
  const outputPath = path.join(tmpDir, `ig-out-${randomUUID()}.mp4`);

  await fs.writeFile(inputPath, Buffer.from(await file.arrayBuffer()));
  try {
    await execFileAsync("ffmpeg", [
      "-y",
      "-i",
      inputPath,
      "-vf",
      "scale='if(gt(iw,ih),min(720,iw),-2)':'if(gt(iw,ih),-2,min(720,ih))'",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "28",
      "-c:a",
      "aac",
      "-b:a",
      "96k",
      "-movflags",
      "+faststart",
      outputPath,
    ]);
    const output = await fs.readFile(outputPath);
    const blob = await put(key, output, { access: "public", addRandomSuffix: false, allowOverwrite: true });
    return blob.url;
  } finally {
    await fs.rm(inputPath, { force: true });
    await fs.rm(outputPath, { force: true });
  }
}

async function deleteBlobBestEffort(url: string | undefined) {
  if (!url || !url.includes(".blob.vercel-storage.com")) return;
  try {
    await del(url);
  } catch {
    // Not worth failing the whole save over a cleanup miss.
  }
}

async function readProfiles(): Promise<InstagramProfile[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as InstagramProfile[];
}

async function writeProfiles(profiles: InstagramProfile[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(profiles, null, 2) + "\n", "utf-8");
}

export async function PATCH(request: Request) {
  try {
    const formData = await request.formData();
    const action = formData.get("action");
    const handle = formData.get("handle");

    if (typeof handle !== "string") {
      return NextResponse.json({ error: "Missing profile handle." }, { status: 400 });
    }

    let profiles: InstagramProfile[];
    try {
      profiles = await readProfiles();
    } catch {
      return NextResponse.json({ error: LOCAL_ONLY_MESSAGE }, { status: 500 });
    }

    const profile = profiles.find((item) => item.handle === handle);
    if (!profile) {
      return NextResponse.json({ error: `No profile found for handle "${handle}".` }, { status: 404 });
    }

    if (action === "profile") {
      const displayName = formData.get("displayName");
      const bio = formData.get("bio");
      const followers = formData.get("followers");
      const following = formData.get("following");
      const followedByLabel = formData.get("followedByLabel");
      const externalLinksRaw = formData.get("externalLinks");
      const pillsRaw = formData.get("pills");
      const highlightsRaw = formData.get("highlights");
      const avatar = formData.get("avatar");
      const background = formData.get("background");

      if (typeof displayName === "string" && displayName.trim()) profile.displayName = displayName.trim();
      if (typeof bio === "string") profile.bio = bio;
      if (typeof followers === "string") profile.followers = followers;
      if (typeof following === "string") profile.following = following;
      if (typeof followedByLabel === "string") {
        profile.followedByLabel = followedByLabel.trim() || undefined;
      }

      if (typeof externalLinksRaw === "string") {
        try {
          const parsed = JSON.parse(externalLinksRaw);
          if (
            Array.isArray(parsed) &&
            parsed.every((item) => typeof item?.label === "string" && typeof item?.url === "string")
          ) {
            profile.externalLinks = parsed;
          }
        } catch {
          return NextResponse.json({ error: "Invalid external links." }, { status: 400 });
        }
      }

      if (typeof pillsRaw === "string") {
        try {
          const parsed = JSON.parse(pillsRaw);
          if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
            profile.pills = parsed;
          }
        } catch {
          return NextResponse.json({ error: "Invalid pills." }, { status: 400 });
        }
      }

      if (avatar instanceof File && avatar.size > 0) {
        await deleteBlobBestEffort(profile.avatarSrc);
        profile.avatarSrc = await uploadImage(avatar, `instagram/${handle}/avatar.jpg`, 400);
      }

      if (background instanceof File && background.size > 0) {
        await deleteBlobBestEffort(profile.backgroundSrc);
        profile.backgroundSrc = await uploadImage(background, `instagram/${handle}/background.jpg`, 1080);
      }

      if (typeof highlightsRaw === "string") {
        let incoming: { id: string; label: string }[];
        try {
          incoming = JSON.parse(highlightsRaw);
        } catch {
          return NextResponse.json({ error: "Invalid highlights." }, { status: 400 });
        }

        const existingById = new Map(profile.highlights.map((h) => [h.id, h]));
        const nextHighlights: InstagramHighlight[] = [];

        for (const item of incoming) {
          const id = item.id || randomUUID();
          const coverFile = formData.get(`highlightCover_${item.id}`);
          const existing = existingById.get(item.id);
          let coverSrc = existing?.coverSrc;

          if (coverFile instanceof File && coverFile.size > 0) {
            await deleteBlobBestEffort(coverSrc);
            coverSrc = await uploadImage(coverFile, `instagram/${handle}/highlights/${id}.jpg`, 300);
          }

          nextHighlights.push({ id, label: item.label, coverSrc });
        }

        // Clean up covers for highlights that were removed.
        const keptIds = new Set(nextHighlights.map((h) => h.id));
        for (const h of profile.highlights) {
          if (!keptIds.has(h.id)) await deleteBlobBestEffort(h.coverSrc);
        }

        profile.highlights = nextHighlights;
      }
    } else if (action === "post") {
      const postId = formData.get("postId");
      const caption = formData.get("caption");
      const isNew = formData.get("isNew");
      const mediaRaw = formData.get("media");

      if (typeof mediaRaw !== "string") {
        return NextResponse.json({ error: "Missing media." }, { status: 400 });
      }

      type MediaMeta = { pending: true } | { pending: false; type: "image" | "video"; src: string };
      let mediaMeta: MediaMeta[];
      try {
        mediaMeta = JSON.parse(mediaRaw);
      } catch {
        return NextResponse.json({ error: "Invalid media." }, { status: 400 });
      }

      if (mediaMeta.length === 0) {
        return NextResponse.json({ error: "A post needs at least one image or video." }, { status: 400 });
      }

      const id = typeof postId === "string" && postId ? postId : randomUUID();
      const existingPost = profile.posts.find((p) => p.id === id);

      const media: InstagramMedia[] = [];
      for (let i = 0; i < mediaMeta.length; i++) {
        const meta = mediaMeta[i];
        if (!meta.pending) {
          media.push({ type: meta.type, src: meta.src });
          continue;
        }
        const file = formData.get(`mediaFile_${i}`);
        if (!(file instanceof File) || file.size === 0) {
          return NextResponse.json({ error: `Missing file for media slot ${i + 1}.` }, { status: 400 });
        }
        const isVideo = file.type.startsWith("video");
        const key = `instagram/${handle}/posts/${id}-${i}.${isVideo ? "mp4" : "jpg"}`;
        const src = isVideo ? await uploadVideo(file, key) : await uploadImage(file, key, 1080);
        media.push({ type: isVideo ? "video" : "image", src });
      }

      // Clean up media dropped from an existing post during this edit.
      if (existingPost) {
        const keptSrcs = new Set(media.map((m) => m.src));
        for (const old of existingPost.media) {
          if (!keptSrcs.has(old.src)) await deleteBlobBestEffort(old.src);
        }
      }

      const post: InstagramPost = {
        id,
        type: media.length > 1 ? "carousel" : media[0].type,
        media,
        caption: typeof caption === "string" && caption.trim() ? caption : undefined,
        isNew: isNew === "true",
      };

      if (existingPost) {
        profile.posts = profile.posts.map((p) => (p.id === id ? post : p));
      } else {
        profile.posts = [post, ...profile.posts];
      }
    } else if (action === "deletePost") {
      const postId = formData.get("postId");
      const post = profile.posts.find((p) => p.id === postId);
      if (post) {
        for (const m of post.media) await deleteBlobBestEffort(m.src);
        profile.posts = profile.posts.filter((p) => p.id !== postId);
      }
    } else {
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    await writeProfiles(profiles);
    return NextResponse.json({ profile });
  } catch (err) {
    console.error("PATCH /api/dev/instagram failed:", err);
    return NextResponse.json({ error: LOCAL_ONLY_MESSAGE }, { status: 500 });
  }
}
