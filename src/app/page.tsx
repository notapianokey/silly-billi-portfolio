import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

interface Sticker {
  label: string;
  href: string;
  src: string;
  /** Position/size of the cutout crop against the 1920x1280 base scene, in percent. The cutout
   *  itself already carries real alpha transparency traced to the object's exact silhouette
   *  (see scripts/build-homepage-stickers.mjs) — no clip-path needed on top of it. */
  box: { left: string; top: string; width: string; height: string };
}

const STICKERS: Sticker[] = [
  {
    label: "Video Editing",
    href: "/video-editing",
    src: "/homepage/stickers/vhs.webp",
    box: { left: "0%", top: "64.45%", width: "22.97%", height: "29.53%" },
  },
  {
    label: "Marketing & Ads",
    href: "/marketing-ads",
    src: "/homepage/stickers/brief.webp",
    box: { left: "8.49%", top: "73.13%", width: "40.26%", height: "26.88%" },
  },
  {
    label: "Editorial Direction",
    href: "/editorial-direction",
    src: "/homepage/stickers/notebook.webp",
    box: { left: "58.33%", top: "49.53%", width: "37.86%", height: "44.14%" },
  },
  {
    label: "Visual Branding",
    href: "/visual-branding",
    src: "/homepage/stickers/logo.webp",
    box: { left: "81.93%", top: "3.98%", width: "15.16%", height: "25.86%" },
  },
  {
    label: "About Us",
    href: "/about",
    src: "/homepage/stickers/photo.webp",
    box: { left: "65.26%", top: "21.8%", width: "21.04%", height: "26.64%" },
  },
  {
    label: "Hire Us",
    href: "/hire-us",
    src: "/homepage/stickers/getintouch.webp",
    box: { left: "66.09%", top: "1.25%", width: "14.37%", height: "25.47%" },
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-background p-4 sm:p-8">
      <h1 className="sr-only">Silly Billi Studio</h1>
      <div className="relative aspect-[3/2] w-full max-w-[1600px] overflow-hidden rounded-2xl shadow-xl">
        <Image
          src="/homepage/scene.webp"
          alt="A desk scene: VHS tapes labeled Raw Footage and Final Cut, a campaign brief folder, an open notebook surrounded by sticky notes and pens, a photo of the founders, a Get In Touch note, and the Silly Billi Studio logo, all pinned to the wall above a CRT monitor."
          fill
          priority
          quality={90}
          sizes="(min-width: 1600px) 1600px, 100vw"
          className="object-cover"
        />
        {STICKERS.map((sticker) => (
          <Link
            key={sticker.href}
            href={sticker.href}
            aria-label={sticker.label}
            className={styles.stickerLink}
            style={sticker.box}
          >
            <span className={styles.sticker}>
              {/* Plain <img>, not next/image: Next's optimizer re-encodes everything it serves
                  as lossy WebP/AVIF regardless of source format, which reintroduces faint
                  non-zero alpha at compressed-block edges — invisible at rest, but drop-shadow
                  on hover amplifies it into a visible ghost rectangle around the sticker. These
                  cutouts are pre-compressed as lossless WebP already (see
                  scripts/build-homepage-stickers.mjs), so serving the bytes as-is is both
                  correct and small. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- see comment above */}
              <img
                src={sticker.src}
                alt=""
                loading="eager"
                className={`h-full w-full object-cover ${styles.stickerImage}`}
              />
            </span>
            <span className={styles.stickerLabel}>
              <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background shadow-lg">
                {sticker.label}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
