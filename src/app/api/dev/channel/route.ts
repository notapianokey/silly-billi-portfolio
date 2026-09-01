import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "lib", "channel.data.json");
const BANNER_DIR = path.join(process.cwd(), "public", "channel");

const LOCAL_ONLY_MESSAGE =
  "Editing only works when running the site locally (npm run dev) — the live deployed site can't save changes.";

interface ChannelData {
  description: string;
  bannerSrc?: string;
  socialLinks: { label: string; url: string }[];
}

/**
 * Local content-authoring endpoint for the About/channel page — same pattern as
 * /api/dev/videos: writes straight to disk, only works under `next dev`, whole body wrapped
 * in one try/catch so a filesystem error (e.g. the deployed site's read-only fs) always comes
 * back as valid JSON.
 */
export async function PATCH(request: Request) {
  try {
    const formData = await request.formData();
    const description = formData.get("description");
    const socialLinksRaw = formData.get("socialLinks");
    const banner = formData.get("banner");

    let raw: string;
    try {
      raw = await fs.readFile(DATA_PATH, "utf-8");
    } catch {
      return NextResponse.json({ error: LOCAL_ONLY_MESSAGE }, { status: 500 });
    }

    const data = JSON.parse(raw) as ChannelData;

    if (typeof description === "string") {
      data.description = description;
    }

    if (typeof socialLinksRaw === "string") {
      try {
        const parsed = JSON.parse(socialLinksRaw);
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (item) => typeof item?.label === "string" && typeof item?.url === "string",
          )
        ) {
          data.socialLinks = parsed;
        }
      } catch {
        return NextResponse.json({ error: "Invalid social links." }, { status: 400 });
      }
    }

    if (banner instanceof File && banner.size > 0) {
      const ext = banner.type === "image/png" ? "png" : "jpg";
      const filename = `banner.${ext}`;
      const bytes = Buffer.from(await banner.arrayBuffer());

      await fs.mkdir(BANNER_DIR, { recursive: true });
      await fs.writeFile(path.join(BANNER_DIR, filename), bytes);
      data.bannerSrc = `/channel/${filename}`;
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");

    return NextResponse.json({ data });
  } catch (err) {
    console.error("PATCH /api/dev/channel failed:", err);
    return NextResponse.json({ error: LOCAL_ONLY_MESSAGE }, { status: 500 });
  }
}
