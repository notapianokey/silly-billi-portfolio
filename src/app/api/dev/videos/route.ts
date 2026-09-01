import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "lib", "videos.data.json");
const THUMBNAILS_DIR = path.join(process.cwd(), "public", "videos", "thumbnails");

const LOCAL_ONLY_MESSAGE =
  "Editing only works when running the site locally (npm run dev) — the live deployed site can't save changes.";

interface VideosData {
  videoProjects: Array<Record<string, unknown> & { id: string; thumbnailSrc?: string }>;
  shortProjects: Array<Record<string, unknown> & { id: string; thumbnailSrc?: string }>;
}

/**
 * Local content-authoring endpoint: edits title/description/thumbnail directly on disk in
 * src/lib/videos.data.json. Only works when running `next dev` locally — the deployed site's
 * filesystem is read-only, so this fails gracefully there with a clear message rather than a
 * silent no-op. There's no database in this project by design; this is a local editing tool,
 * not a live CMS. Commit + push the resulting JSON/image changes when ready to publish.
 *
 * The whole body is one try/catch so a filesystem error (e.g. read-only fs on the deployed
 * site) always comes back as valid JSON, never an empty/HTML response that breaks res.json()
 * on the client.
 */
export async function PATCH(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");
    const kind = formData.get("kind");
    const title = formData.get("title");
    const description = formData.get("description");
    const sourceUrl = formData.get("sourceUrl");
    const thumbnail = formData.get("thumbnail");

    if (typeof id !== "string" || (kind !== "video" && kind !== "short")) {
      return NextResponse.json({ error: "Missing or invalid id/kind." }, { status: 400 });
    }

    let raw: string;
    try {
      raw = await fs.readFile(DATA_PATH, "utf-8");
    } catch {
      return NextResponse.json({ error: LOCAL_ONLY_MESSAGE }, { status: 500 });
    }

    const data = JSON.parse(raw) as VideosData;
    const list = kind === "video" ? data.videoProjects : data.shortProjects;
    const entry = list.find((item) => item.id === id);

    if (!entry) {
      return NextResponse.json({ error: `No ${kind} with id "${id}".` }, { status: 404 });
    }

    if (typeof title === "string" && title.trim() !== "") {
      entry.title = title.trim();
    }
    if (typeof description === "string") {
      entry.description = description;
    }
    if (typeof sourceUrl === "string") {
      entry.sourceUrl = sourceUrl.trim();
    }

    if (thumbnail instanceof File && thumbnail.size > 0) {
      const ext = thumbnail.type === "image/png" ? "png" : "jpg";
      const filename = `${id}.${ext}`;
      const bytes = Buffer.from(await thumbnail.arrayBuffer());

      await fs.mkdir(THUMBNAILS_DIR, { recursive: true });
      await fs.writeFile(path.join(THUMBNAILS_DIR, filename), bytes);
      entry.thumbnailSrc = `/videos/thumbnails/${filename}`;
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");

    return NextResponse.json({ entry });
  } catch (err) {
    console.error("PATCH /api/dev/videos failed:", err);
    return NextResponse.json({ error: LOCAL_ONLY_MESSAGE }, { status: 500 });
  }
}
