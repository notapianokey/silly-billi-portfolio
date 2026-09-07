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

/** Same 6 artifacts, positioned against the client's separately-painted 7:3 ultrawide scene
 *  (`scene-wide.webp`) instead of the 3:2 one — object spacing/proportions differ between the
 *  two source paintings (confirmed by direct pixel diff, not just a padded/extended canvas), so
 *  these are a genuinely separate mask/build pass, not a repositioning of the same crops. See
 *  scripts/build-homepage-stickers-wide.mjs. */
const STICKERS_WIDE: Sticker[] = [
  {
    label: "Video Editing",
    href: "/video-editing",
    src: "/homepage/stickers-wide/vhs.webp",
    box: { left: "14.37%", top: "63.99%", width: "16.67%", height: "31.15%" },
    hitPath:
      "polygon(66.6% 7.6%, 58.7% 10.2%, 50.8% 12.7%, 42.6% 15.3%, 34.2% 17.8%, 25.8% 20.4%, 17.6% 22.9%, 9.2% 25.5%, 7.4% 28%, 7.1% 30.6%, 7.1% 33.1%, 6.9% 35.7%, 6.9% 38.2%, 6.9% 40.8%, 6.6% 43.3%, 6.6% 45.9%, 6.6% 48.4%, 6.4% 51%, 6.4% 53.5%, 6.6% 56.1%, 8.2% 58.6%, 10.2% 61.1%, 12% 63.7%, 14% 66.2%, 16.1% 68.8%, 17.9% 71.3%, 19.9% 73.9%, 21.9% 76.4%, 23.7% 79%, 25.8% 81.5%, 35.7% 91.7%, 41.6% 89.2%, 47.4% 86.6%, 53.3% 84.1%, 58.9% 81.5%, 64.8% 79%, 70.7% 76.4%, 76.5% 73.9%, 82.4% 71.3%, 88.3% 68.8%, 93.1% 66.2%, 93.6% 63.7%, 93.4% 61.1%, 93.4% 58.6%, 93.1% 56.1%, 93.1% 53.5%, 92.9% 51%, 92.9% 48.4%, 92.9% 45.9%, 92.9% 43.3%, 93.4% 40.8%, 91.8% 38.2%, 89.5% 35.7%, 87.5% 33.1%, 85.2% 30.6%, 83.2% 28%, 81.1% 25.5%, 78.8% 22.9%, 76.8% 20.4%, 75% 17.8%)",
  },
  {
    label: "Marketing & Ads",
    href: "/marketing-ads",
    src: "/homepage/stickers-wide/brief.webp",
    box: { left: "21.05%", top: "73.21%", width: "27.76%", height: "26.79%" },
    hitPath:
      "polygon(41.2% 8.9%, 40.4% 11.9%, 39.5% 14.8%, 35.1% 17.8%, 33.8% 20.7%, 32.6% 23.7%, 31.4% 26.7%, 30.2% 29.6%, 28.9% 32.6%, 27.7% 35.6%, 26.5% 38.5%, 25.3% 41.5%, 24% 44.4%, 22.8% 47.4%, 21.6% 50.4%, 20.4% 53.3%, 19.1% 56.3%, 17.9% 59.3%, 16.7% 62.2%, 15.5% 65.2%, 14.2% 68.1%, 13% 71.1%, 11.8% 74.1%, 10.6% 77%, 9.3% 80%, 8.1% 83%, 6.9% 85.9%, 5.7% 88.9%, 4.4% 91.9%, 85.6% 99.6%, 86.7% 99.6%, 87.6% 97.8%, 88.7% 94.8%, 89.6% 91.9%, 90.7% 88.9%, 91.6% 85.9%, 92.6% 83%, 93.6% 80%, 94.6% 77%, 95.6% 74.1%, 96% 71.1%, 95.6% 68.1%, 95.1% 65.2%, 94.6% 62.2%, 94.2% 59.3%, 93.7% 56.3%, 93.3% 53.3%, 92.8% 50.4%, 86.5% 47.4%, 79.9% 44.4%, 74% 41.5%, 67.2% 38.5%, 60.6% 35.6%, 60.3% 32.6%, 60.3% 29.6%, 57.9% 26.7%, 52.1% 23.7%, 46.2% 20.7%)",
  },
  {
    label: "Editorial Direction",
    href: "/editorial-direction",
    src: "/homepage/stickers-wide/notebook.webp",
    box: { left: "54.93%", top: "49.01%", width: "26.49%", height: "45.63%" },
  },
  {
    label: "Visual Branding",
    href: "/visual-branding",
    src: "/homepage/stickers-wide/logo.webp",
    box: { left: "71.26%", top: "2.98%", width: "11.31%", height: "28.17%" },
    hitPath:
      "polygon(41.4% 8.5%, 21.4% 11.3%, 15.8% 14.1%, 15% 16.9%, 14.3% 19.7%, 14.3% 22.5%, 14.3% 25.4%, 13.9% 28.2%, 13.5% 31%, 13.5% 33.8%, 13.2% 36.6%, 13.2% 39.4%, 12% 42.3%, 10.5% 45.1%, 9.8% 47.9%, 9.4% 50.7%, 9.4% 53.5%, 9.4% 56.3%, 9.4% 59.2%, 9% 62%, 9.4% 64.8%, 9.8% 67.6%, 10.2% 70.4%, 10.2% 73.2%, 10.5% 76.1%, 42.1% 78.9%, 80.5% 90.1%, 82.3% 87.3%, 83.1% 84.5%, 84.2% 81.7%, 85% 78.9%, 85.3% 76.1%, 85.7% 73.2%, 86.5% 70.4%, 86.8% 67.6%, 87.2% 64.8%, 87.2% 62%, 87.2% 59.2%, 87.2% 56.3%, 86.8% 53.5%, 86.5% 50.7%, 86.5% 47.9%, 86.8% 45.1%, 87.2% 42.3%, 87.2% 39.4%, 88.3% 36.6%, 89.1% 33.8%, 90.2% 31%, 90.6% 28.2%, 88.7% 25.4%, 60.2% 22.5%, 57.1% 19.7%)",
  },
  {
    label: "About Us",
    href: "/about",
    src: "/homepage/stickers-wide/photo.webp",
    box: { left: "59.35%", top: "20.73%", width: "15.35%", height: "29.66%" },
    hitPath:
      "polygon(14.7% 8%, 12.2% 10.7%, 11.6% 13.4%, 11.6% 16.1%, 11.4% 18.7%, 11.4% 21.4%, 11.4% 24.1%, 11.4% 26.8%, 11.4% 29.4%, 11.1% 32.1%, 11.1% 34.8%, 11.1% 37.5%, 10.8% 40.1%, 10.5% 42.8%, 10.5% 45.5%, 10.2% 48.2%, 9.7% 50.8%, 9.4% 53.5%, 9.4% 56.2%, 9.7% 58.9%, 7.5% 61.5%, 6.6% 64.2%, 7.5% 66.9%, 12.5% 69.6%, 30.7% 72.2%, 41.6% 74.9%, 51.8% 77.6%, 71.7% 80.3%, 85.3% 91%, 86.7% 88.3%, 87.3% 85.6%, 87.5% 82.9%, 88.4% 80.3%, 88.9% 77.6%, 89.2% 74.9%, 89.5% 72.2%, 89.8% 69.6%, 90% 66.9%, 90.3% 64.2%, 91.1% 61.5%, 91.7% 58.9%, 92.5% 56.2%, 92.8% 53.5%, 93.1% 50.8%, 93.1% 48.2%, 92.8% 45.5%, 92.5% 42.8%, 92.5% 40.1%, 92.5% 37.5%, 92.2% 34.8%, 92.5% 32.1%, 91.1% 29.4%, 82% 26.8%, 71.2% 24.1%, 60.1% 21.4%, 24.1% 18.7%)",
  },
  {
    label: "Hire Us",
    href: "/hire-us",
    src: "/homepage/stickers-wide/getintouch.webp",
    box: { left: "59.95%", top: "0.2%", width: "10.67%", height: "27.18%" },
    hitPath:
      "polygon(46.6% 8.8%, 42.2% 11.7%, 21.1% 14.6%, 16.3% 17.5%, 15.9% 20.4%, 14.3% 23.4%, 13.5% 26.3%, 13.5% 29.2%, 13.5% 32.1%, 13.9% 35%, 13.1% 38%, 12.7% 40.9%, 12.4% 43.8%, 12% 46.7%, 11.6% 49.6%, 11.2% 52.6%, 11.2% 55.5%, 10.8% 58.4%, 10% 61.3%, 9.6% 64.2%, 10% 67.2%, 10.4% 70.1%, 15.9% 73%, 39.8% 75.9%, 56.2% 78.8%, 82.5% 90.5%, 84.9% 87.6%, 85.7% 84.7%, 86.9% 81.8%, 87.3% 78.8%, 87.6% 75.9%, 88% 73%, 88.4% 70.1%, 88.4% 67.2%, 88.4% 64.2%, 88% 61.3%, 88% 58.4%, 87.6% 55.5%, 87.6% 52.6%, 87.6% 49.6%, 87.6% 46.7%, 87.6% 43.8%, 88.4% 40.9%, 88.8% 38%, 88.4% 35%, 90% 32.1%, 89.6% 29.2%, 87.3% 26.3%, 64.5% 23.4%, 61% 20.4%)",
  },
];

function StickerLink({ sticker, variantClassName }: { sticker: Sticker; variantClassName: string }) {
  return (
    <Link
      href={sticker.href}
      aria-label={sticker.label}
      className={`${styles.stickerLink} ${variantClassName}`}
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
            correct and small. `loading="lazy"` also lets the inactive variant's stickers
            (display:none via CSS — see page.module.css) skip fetching entirely in
            evergreen browsers, since they're never near the viewport. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- see comment above */}
        <img
          src={sticker.src}
          alt=""
          loading="lazy"
          className={`h-full w-full object-cover ${styles.stickerImage}`}
        />
      </span>
      <span className={styles.stickerLabel}>
        <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background shadow-lg">
          {sticker.label}
        </span>
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="relative flex h-dvh w-dvw items-center justify-center overflow-hidden bg-[#a8a19e]">
      <h1 className="sr-only">Silly Billi Studio</h1>
      <div className={styles.stage}>
        {/* Native art-direction: the browser fetches exactly ONE of these sources based on
            which media query matches (spec-guaranteed — unlike two next/image instances toggled
            by CSS display:none, where an eager/priority <img> still fetches regardless of an
            ancestor's display:none, silently doubling the hero download). See page.module.css
            for the shared breakpoint this and the sticker variants below both key off. */}
        <picture className={styles.scenePicture}>
          <source media="(min-aspect-ratio: 2/1)" srcSet="/homepage/scene-wide.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element -- <picture> art-direction needs a plain <img>, next/image can't do per-breakpoint source switching */}
          <img
            src="/homepage/scene.webp"
            alt="A desk scene: VHS tapes labeled Raw Footage and Final Cut, a campaign brief folder, an open notebook surrounded by sticky notes and pens, a photo of the founders, a Get In Touch note, and the Silly Billi Studio logo, all pinned to the wall above a CRT monitor."
            fetchPriority="high"
            className={styles.sceneImage}
          />
        </picture>
        {STICKERS.map((sticker) => (
          <StickerLink key={`narrow-${sticker.href}`} sticker={sticker} variantClassName={styles.variantNarrow} />
        ))}
        {STICKERS_WIDE.map((sticker) => (
          <StickerLink key={`wide-${sticker.href}`} sticker={sticker} variantClassName={styles.variantWide} />
        ))}
      </div>
    </main>
  );
}
