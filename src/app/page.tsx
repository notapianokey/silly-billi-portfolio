import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

interface Sticker {
  label: string;
  href: string;
  src: string;
  /** Position/size of the padded crop against the 1920x1280 base scene, in percent. */
  box: { left: string; top: string; width: string; height: string };
  /** Hand-traced silhouette of the real object within its own crop, in percent — this is what
   *  makes the exact artifact (not its bounding box) read as the clickable "sticker". */
  clipPath: string;
}

const STICKERS: Sticker[] = [
  {
    label: "Video Editing",
    href: "/video-editing",
    src: "/homepage/stickers/vhs.webp",
    box: { left: "0%", top: "66.41%", width: "26.04%", height: "33.59%" },
    clipPath:
      "polygon(7.6% 14.9%, 33.6% 6.5%, 54.4% 7%, 60% 22.1%, 44% 67.9%, 7.6% 60%, 1.6% 34.9%, 1.6% 20.9%)",
  },
  {
    label: "Marketing & Ads",
    href: "/marketing-ads",
    src: "/homepage/stickers/brief.webp",
    box: { left: "17.71%", top: "74.22%", width: "31.25%", height: "25.78%" },
    clipPath: "polygon(16.7% 13.6%, 29.2% 12.1%, 71.7% 19.7%, 92.5% 87.9%, 92.5% 100%, 9.2% 100%, 4.7% 42.4%)",
  },
  {
    label: "Editorial Direction",
    href: "/editorial-direction",
    src: "/homepage/stickers/notebook.webp",
    box: { left: "57.29%", top: "49.22%", width: "41.15%", height: "45.31%" },
    clipPath:
      "polygon(7.6% 12.9%, 49.4% 12.9%, 50% 9.5%, 75.3% 6%, 76.6% 35.3%, 75.3% 56.9%, 90.5% 68.1%, 88.6% 87.9%, 62% 86.2%, 57.6% 69%, 50.6% 67.2%, 13.3% 47.4%, 7% 41.4%)",
  },
  {
    label: "Visual Branding",
    href: "/visual-branding",
    src: "/homepage/stickers/logo.webp",
    box: { left: "82.03%", top: "1.95%", width: "16.15%", height: "27.34%" },
    clipPath:
      "polygon(12.9% 22.9%, 45.2% 15.7%, 82.3% 21.4%, 87.1% 51.4%, 80.6% 85.7%, 48.4% 91.4%, 14.5% 82.9%, 9.7% 48.6%)",
  },
  {
    label: "About Us",
    href: "/about",
    src: "/homepage/stickers/photo.webp",
    box: { left: "65.1%", top: "20.31%", width: "21.35%", height: "28.91%" },
    clipPath:
      "polygon(11% 16.2%, 48.8% 9.5%, 90.2% 14.9%, 95.1% 48.6%, 89% 83.8%, 51.2% 87.8%, 12.2% 81.1%, 8.5% 45.9%)",
  },
  {
    label: "Hire Us",
    href: "/hire-us",
    src: "/homepage/stickers/getintouch.webp",
    box: { left: "65.1%", top: "0.78%", width: "16.67%", height: "25.78%" },
    clipPath:
      "polygon(15.6% 16.7%, 51.6% 10.6%, 85.9% 18.2%, 90.6% 51.5%, 82.8% 87.9%, 50% 92.4%, 14.1% 83.3%, 10.9% 45.5%)",
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
              <Image
                src={sticker.src}
                alt=""
                fill
                quality={90}
                sizes="30vw"
                className={`object-cover ${styles.stickerImage}`}
                style={{ clipPath: sticker.clipPath }}
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
