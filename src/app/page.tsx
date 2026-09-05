import Image from "next/image";
import Link from "next/link";

interface Hotspot {
  label: string;
  href: string;
  style: { left: string; top: string; width: string; height: string };
}

// Percentages measured against the 1920x1280 source render in public/homepage/scene.webp —
// each box traces one physical artifact in the scene. Keep these in sync if the art changes.
const HOTSPOTS: Hotspot[] = [
  {
    label: "Video Editing",
    href: "/video-editing",
    style: { left: "0.52%", top: "71.09%", width: "20.31%", height: "24.22%" },
  },
  {
    label: "Marketing & Ads",
    href: "/marketing-ads",
    style: { left: "20.83%", top: "78.91%", width: "25%", height: "21.09%" },
  },
  {
    label: "Editorial Direction",
    href: "/editorial-direction",
    style: { left: "60.42%", top: "53.91%", width: "34.9%", height: "40.63%" },
  },
  {
    label: "Visual Branding",
    href: "/visual-branding",
    style: { left: "84.11%", top: "5.08%", width: "11.98%", height: "21.09%" },
  },
  {
    label: "About Us",
    href: "/about",
    style: { left: "67.19%", top: "23.44%", width: "17.19%", height: "22.66%" },
  },
  {
    label: "Hire Us",
    href: "/hire-us",
    style: { left: "67.19%", top: "3.91%", width: "12.5%", height: "19.53%" },
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
        {HOTSPOTS.map((spot) => (
          <Link
            key={spot.href}
            href={spot.href}
            aria-label={spot.label}
            className="group absolute rounded-xl outline-none"
            style={spot.style}
          >
            <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 ring-0 ring-white/0 transition-all duration-200 group-hover:bg-black/15 group-hover:ring-4 group-hover:ring-white/85 group-focus-visible:bg-black/15 group-focus-visible:ring-4 group-focus-visible:ring-white/85">
              <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {spot.label}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
