import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

interface Sticker {
  label: string;
  href: string;
  src: string;
  /** Position/size of the cutout crop against the 1920x1280 base scene, in percent. The cutout
   *  itself already carries real alpha transparency traced to the object's exact silhouette
   *  (see scripts/build-homepage-stickers.mjs) — this is what gives the VISUAL shape. */
  box: { left: string; top: string; width: string; height: string };
  /** A looser polygon (also derived from the same mask, not hand-guessed) restricted to
   *  CLICK/HOVER hit-testing only — without it, two artifacts sitting close together (VHS tapes /
   *  campaign brief folder) have padded rectangular hit-boxes that overlap, so the cursor
   *  flickers between them near the shared padding zone even though the visible shapes don't
   *  touch. Applied to a separate invisible hit-area element, NOT the visual sticker, so it
   *  doesn't clip the sticker's own hover grow/lift animation. `undefined` for the
   *  notebook/sticky-notes cluster, which has a disjoint second region (the separate pink sticky
   *  note) a single polygon can't represent, and which isn't close enough to another artifact for
   *  this to matter anyway. */
  hitPath?: string;
}

const STICKERS: Sticker[] = [
  {
    label: "Video Editing",
    href: "/video-editing",
    src: "/homepage/stickers/vhs.webp",
    box: { left: "0%", top: "64.45%", width: "22.97%", height: "29.53%" },
    hitPath:
      "polygon(64.4% 6.3%, 61.2% 8.5%, 57.8% 10.6%, 45.6% 12.7%, 41.3% 14.8%, 35.1% 16.9%, 29.5% 19%, 23.4% 21.2%, 15.6% 23.3%, 8.4% 25.4%, 5.9% 27.5%, 5.7% 29.6%, 5% 31.7%, 4.8% 33.9%, 5% 36%, 5.2% 38.1%, 5.4% 40.2%, 5.4% 42.3%, 6.6% 44.4%, 4.1% 46.6%, 3.9% 48.7%, 4.1% 50.8%, 4.1% 52.9%, 4.1% 55%, 4.3% 57.1%, 4.5% 59.3%, 5.7% 61.4%, 7.7% 63.5%, 9.5% 65.6%, 11.1% 67.7%, 12.7% 69.8%, 14.1% 72%, 15% 74.1%, 17.2% 76.2%, 19.3% 78.3%, 20.2% 80.4%, 22% 82.5%, 24.3% 84.7%, 34.5% 93.1%, 40.4% 91%, 47.2% 88.9%, 51% 86.8%, 54% 84.7%, 57.6% 82.5%, 63.5% 80.4%, 69.8% 78.3%, 76.6% 76.2%, 80.7% 74.1%, 84.8% 72%, 88.9% 69.8%, 93% 67.7%, 93.4% 65.6%, 93.7% 63.5%, 93.7% 61.4%, 93.4% 59.3%, 93.4% 57.1%, 93.4% 55%, 93% 52.9%, 94.1% 50.8%, 94.3% 48.7%, 93.4% 46.6%, 93.4% 44.4%, 93.4% 42.3%, 93.2% 40.2%, 93.2% 38.1%, 93.2% 36%, 92.7% 33.9%, 90% 31.7%, 86.8% 29.6%, 83.4% 27.5%, 81.6% 25.4%, 80.7% 23.3%, 80% 21.2%, 78% 19%, 76.6% 16.9%, 73.5% 14.8%)",
  },
  {
    label: "Marketing & Ads",
    href: "/marketing-ads",
    src: "/homepage/stickers/brief.webp",
    box: { left: "8.49%", top: "73.13%", width: "40.26%", height: "26.88%" },
    hitPath:
      "polygon(44.6% 7%, 44.1% 9.3%, 42.7% 11.6%, 41.7% 14%, 38.6% 16.3%, 36.5% 18.6%, 35.4% 20.9%, 34.5% 23.3%, 33.5% 25.6%, 32.3% 27.9%, 31.4% 30.2%, 30.5% 32.6%, 29.5% 34.9%, 28.6% 37.2%, 27.6% 39.5%, 26.5% 41.9%, 25.4% 44.2%, 24.3% 46.5%, 23.4% 48.8%, 22.8% 51.2%, 21.9% 53.5%, 20.8% 55.8%, 19.7% 58.1%, 18.9% 60.5%, 18.2% 62.8%, 17.1% 65.1%, 15.7% 67.4%, 14.2% 69.8%, 12.8% 72.1%, 11.6% 74.4%, 10.6% 76.7%, 9.3% 79.1%, 8.2% 81.4%, 7.2% 83.7%, 6.2% 86%, 5.3% 88.4%, 4.8% 90.7%, 3.8% 93%, 85.6% 99.7%, 86.4% 99.7%, 87.2% 97.7%, 88.6% 95.3%, 89.9% 93%, 90.9% 90.7%, 91.8% 88.4%, 92.6% 86%, 93.1% 83.7%, 93.7% 81.4%, 94% 79.1%, 94.4% 76.7%, 95% 74.4%, 95.9% 72.1%, 96.5% 69.8%, 96.8% 67.4%, 96.6% 65.1%, 96.4% 62.8%, 96.1% 60.5%, 95.6% 58.1%, 94.8% 55.8%, 93.9% 53.5%, 93.1% 51.2%, 92.1% 48.8%, 90.4% 46.5%, 85.8% 44.2%, 79.6% 41.9%, 73.6% 39.5%, 68.8% 37.2%, 62.4% 34.9%, 61.2% 32.6%, 60.8% 30.2%, 60.7% 27.9%, 60.2% 25.6%, 59.8% 23.3%, 58.1% 20.9%, 53.8% 18.6%, 49.7% 16.3%)",
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
    hitPath:
      "polygon(43.6% 7.3%, 41.2% 9.7%, 14.8% 12.1%, 14.8% 14.5%, 13.4% 16.9%, 13.1% 19.3%, 13.1% 21.8%, 13.1% 24.2%, 13.1% 26.6%, 13.1% 29%, 12.7% 31.4%, 12.4% 33.8%, 12% 36.3%, 11.3% 38.7%, 11% 41.1%, 11% 43.5%, 11% 45.9%, 11% 48.3%, 10.7% 50.8%, 10% 53.2%, 10% 55.6%, 9.6% 58%, 9.6% 60.4%, 9.3% 62.8%, 8.9% 65.3%, 8.6% 67.7%, 8.6% 70.1%, 8.6% 72.5%, 8.2% 74.9%, 8.9% 77.3%, 14.8% 79.8%, 50.5% 82.2%, 82.1% 91.8%, 83.2% 89.4%, 83.8% 87%, 84.5% 84.6%, 85.2% 82.2%, 85.6% 79.8%, 85.9% 77.3%, 86.3% 74.9%, 86.3% 72.5%, 86.6% 70.1%, 87.3% 67.7%, 87.3% 65.3%, 87.3% 62.8%, 88% 60.4%, 88% 58%, 88% 55.6%, 88.3% 53.2%, 88.7% 50.8%, 88.7% 48.3%, 89% 45.9%, 89.3% 43.5%, 90.4% 41.1%, 90% 38.7%, 90% 36.3%, 90.4% 33.8%, 90.7% 31.4%, 91.1% 29%, 91.4% 26.6%, 77.3% 24.2%, 60.5% 21.8%, 59.5% 19.3%, 55.7% 16.9%)",
  },
  {
    label: "About Us",
    href: "/about",
    src: "/homepage/stickers/photo.webp",
    box: { left: "65.26%", top: "21.8%", width: "21.04%", height: "26.64%" },
    hitPath:
      "polygon(21.5% 7%, 9.9% 9.4%, 9.2% 11.7%, 8.9% 14.1%, 8.9% 16.4%, 8.9% 18.8%, 8.9% 21.1%, 8.7% 23.5%, 8.7% 25.8%, 8.2% 28.2%, 7.9% 30.5%, 7.9% 32.8%, 7.7% 35.2%, 7.4% 37.5%, 7.4% 39.9%, 6.9% 42.2%, 6.9% 44.6%, 6.4% 46.9%, 6.4% 49.3%, 6.4% 51.6%, 6.4% 54%, 6.4% 56.3%, 6.7% 58.7%, 6.4% 61%, 5.9% 63.3%, 5.9% 65.7%, 5.9% 68%, 5.9% 70.4%, 8.4% 72.7%, 17.1% 75.1%, 37.4% 77.4%, 44.8% 79.8%, 63.1% 82.1%, 87.1% 91.5%, 87.1% 89.1%, 87.6% 86.8%, 88.4% 84.5%, 88.6% 82.1%, 89.1% 79.8%, 89.9% 77.4%, 89.9% 75.1%, 90.3% 72.7%, 91.1% 70.4%, 91.3% 68%, 91.3% 65.7%, 91.6% 63.3%, 91.6% 61%, 91.8% 58.7%, 92.1% 56.3%, 92.1% 54%, 92.3% 51.6%, 92.6% 49.3%, 92.8% 46.9%, 92.8% 44.6%, 93.1% 42.2%, 93.1% 39.9%, 93.1% 37.5%, 93.3% 35.2%, 93.8% 32.8%, 93.8% 30.5%, 90.6% 28.2%, 87.1% 25.8%, 77.2% 23.5%, 64.6% 21.1%, 50.5% 18.8%, 33.7% 16.4%)",
  },
  {
    label: "Hire Us",
    href: "/hire-us",
    src: "/homepage/stickers/getintouch.webp",
    box: { left: "66.09%", top: "1.25%", width: "14.37%", height: "25.47%" },
    hitPath:
      "polygon(43.1% 7.4%, 42.4% 9.8%, 18.1% 12.3%, 15.6% 14.7%, 15.2% 17.2%, 14.5% 19.6%, 14.5% 22.1%, 13.4% 24.5%, 13% 27%, 12.7% 29.4%, 12% 31.9%, 11.6% 34.4%, 10.9% 36.8%, 10.1% 39.3%, 9.8% 41.7%, 9.1% 44.2%, 9.1% 46.6%, 9.1% 49.1%, 9.1% 51.5%, 8.7% 54%, 8.7% 56.4%, 8.7% 58.9%, 8.7% 61.3%, 8.7% 63.8%, 8.7% 66.3%, 9.1% 68.7%, 9.1% 71.2%, 14.5% 73.6%, 20.7% 76.1%, 25% 78.5%, 32.2% 81%, 87% 90.8%, 87.7% 88.3%, 87.3% 85.9%, 87.3% 83.4%, 87% 81%, 87% 78.5%, 86.6% 76.1%, 87% 73.6%, 87.7% 71.2%, 88% 68.7%, 88.8% 66.3%, 89.1% 63.8%, 89.9% 61.3%, 90.2% 58.9%, 90.6% 56.4%, 89.9% 54%, 88.4% 51.5%, 87.7% 49.1%, 87.3% 46.6%, 87.7% 44.2%, 88% 41.7%, 88.4% 39.3%, 90.2% 36.8%, 90.9% 34.4%, 90.6% 31.9%, 89.5% 29.4%, 89.1% 27%, 88% 24.5%, 62% 22.1%, 62% 19.6%, 58% 17.2%)",
  },
];

export default function Home() {
  return (
    <main className="relative flex h-dvh w-dvw items-center justify-center overflow-hidden bg-[#a8a19e]">
      <h1 className="sr-only">Silly Billi Studio</h1>
      <div className={styles.stage}>
        <Image
          src="/homepage/scene.webp"
          alt="A desk scene: VHS tapes labeled Raw Footage and Final Cut, a campaign brief folder, an open notebook surrounded by sticky notes and pens, a photo of the founders, a Get In Touch note, and the Silly Billi Studio logo, all pinned to the wall above a CRT monitor."
          fill
          priority
          quality={90}
          sizes="100vw"
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
            {/* Invisible hit-area: this is what actually receives hover/click, clipped to a
                loose mask-derived shape so it can't bleed into a neighboring sticker's hit area.
                Separate from the visual sticker below so clipping it doesn't also clip that
                sticker's hover grow/lift animation. */}
            <span
              className={styles.hitArea}
              style={sticker.hitPath ? { clipPath: sticker.hitPath } : undefined}
            />
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
