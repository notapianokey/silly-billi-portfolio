"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Libre_Baskerville, Mulish } from "next/font/google";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Plus,
  X,
} from "lucide-react";

import {
  VISUAL_BRANDING_LAYOUT,
  type TileLayout,
} from "@/lib/visual-branding-layout";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const mulish = Mulish({ subsets: ["latin"], weight: ["700", "800"] });

// Same hardcoded palette as the homepage (the design-system token files aren't in this repo).
const INK = "#141414";
const CREAM = "#F1E5C7";
const BLACK = "#000";
const MUSTARD = "#F2A81D";
// Shadow colour per client (brand palette: orange is the palette's red).
const CLIENT_COLOR: Record<string, string> = {
  "Dimitri Lascaris": "#7C5DA8",
  "The Thomsen Company": "#E24A1E",
  "Eon Podcast": "#F2A81D",
  "Shah’s Curated Vault": "#1E4FA0",
  "Music Video": "#1C9A5A",
};

const round1 = (n: number) => Math.round(n * 10) / 10;

interface Tile {
  id: string;
  name: string;
  /** Client name — shown in the list view. */
  client: string;
  /** Genres — what the "Filter works" menu groups by. */
  genres: string[];
  /** Carousel slides, in order; the tile's arrows page through them. */
  slides: { src: string; alt: string }[];
  /** Video tile (autoplays muted + looped, like a GIF): `slides[0]` is its poster. */
  video?: string;
  /** Tile fill behind a contain-fitted slide of a different shape (default ink). */
  background?: string;
  /** width / height of the slides — drives the tile shape. */
  ratio: number;
}

type ViewMode = "grid" | "list";

// Where each tile sits and how big it is lives in `visual-branding-layout.data.json` (vw units).
// Each tile's `ratio` is its content's natural width/height: nothing is cropped (object-contain).
// Carousel arrows hang 4vw outside the image, so keep those tiles off the page edge.
const TILES: Tile[] = [
  {
    id: "mark-carney",
    name: "Mark Carney",
    client: "Dimitri Lascaris",
    genres: ["Political", "Journalism"],
    slides: [1, 2, 3, 4].map((n) => ({
      src: `/visual-branding/mark-carney-${n}.webp`,
      alt: `Mark Carney carousel, slide ${n}`,
    })),
    ratio: 0.8,
  },
  {
    id: "thomsen-chess-drawings",
    name: "Chess Set Drawings",
    client: "The Thomsen Company",
    genres: ["Chess Set"],
    slides: [
      {
        src: "/visual-branding/thomsen-genghis-khan-knight.webp",
        alt: "Genghis Khan — Queen’s Knight",
      },
      {
        src: "/visual-branding/thomsen-julius-caesar-rook.webp",
        alt: "Julius Caesar — King’s Rook",
      },
      {
        src: "/visual-branding/thomsen-marcus-aurelius-rook.webp",
        alt: "Marcus Aurelius — Queen’s Rook",
      },
    ],
    background: "#FFEFCC",
    ratio: 1080 / 1190,
  },
  {
    id: "thomsen-post-a",
    name: "Embossed Rose",
    client: "The Thomsen Company",
    genres: ["Heraldry"],
    slides: [
      { src: "/visual-branding/thomsen-post-a.webp", alt: "Embossed Rose" },
    ],
    ratio: 1,
  },
  {
    id: "thomsen-post-b",
    name: "Chess Piece Render",
    client: "The Thomsen Company",
    genres: ["Chess Set"],
    slides: [
      {
        src: "/visual-branding/thomsen-post-b.webp",
        alt: "Chess Piece Render",
      },
    ],
    ratio: 1,
  },
  {
    id: "thomsen-post-c",
    name: "Coat of Arms Study",
    client: "The Thomsen Company",
    genres: ["Heraldry"],
    slides: [
      {
        src: "/visual-branding/thomsen-post-c.webp",
        alt: "Coat of Arms Study",
      },
    ],
    ratio: 1616 / 1584,
  },
  {
    id: "eon-crowly",
    name: "Eon — Aleister Crowley",
    client: "Eon Podcast",
    genres: ["Occult"],
    slides: [1, 2, 3, 4, 5].map((n) => ({
      src: `/visual-branding/eon-crowly-${n}.webp`,
      alt: `Eon Podcast Aleister Crowley carousel, slide ${n}`,
    })),
    ratio: 1,
  },
  {
    id: "shahs-curated-vault",
    name: "Shah’s Curated Vault logo",
    client: "Shah’s Curated Vault",
    genres: ["Collectibles", "Vintage"],
    slides: [
      {
        src: "/visual-branding/shahs-curated-vault.webp",
        alt: "Shah’s Curated Vault logo",
      },
    ],
    ratio: 976 / 1100,
  },
  {
    id: "thomsen-logo-animation",
    name: "Thomsen Company — Logo Animation",
    client: "The Thomsen Company",
    genres: ["Wealth Management", "Asset Protection", "Thought Leadership"],
    video: "/visual-branding/thomsen-logo-animation.mp4",
    slides: [
      {
        src: "/visual-branding/thomsen-logo-animation.jpg",
        alt: "The Thomsen Company logo animation",
      },
    ],
    ratio: 16 / 9,
  },
  {
    id: "music-video",
    name: "Music Video",
    client: "Music Video",
    genres: ["Music Video", "Blender"],
    video: "/visual-branding/music-video.mp4",
    slides: [
      {
        src: "/visual-branding/music-video.jpg",
        alt: "Music video",
      },
    ],
    ratio: 16 / 9,
  },
  {
    id: "toyo-render",
    name: "Music Video — Render",
    client: "Music Video",
    genres: ["Music Video", "Blender"],
    video: "/visual-branding/toyo-render.mp4",
    slides: [
      { src: "/visual-branding/toyo-render.jpg", alt: "Music video render" },
    ],
    ratio: 16 / 9,
  },
  {
    id: "eon-911",
    name: "Eon — What Really Happened on 9/11?",
    client: "Eon Podcast",
    genres: ["Conspiracy"],
    slides: [1, 2, 3, 4, 5].map((n) => ({
      src: `/visual-branding/eon-911-${n}.webp`,
      alt: `Eon Podcast 9/11 carousel, slide ${n}`,
    })),
    ratio: 1,
  },
  {
    id: "west-asia",
    name: "West Asia",
    client: "Dimitri Lascaris",
    genres: ["Political", "Middle East", "Journalism"],
    slides: [1, 2, 3, 4].map((n) => ({
      src: `/visual-branding/west-asia-${n}.webp`,
      alt: `West Asia carousel, slide ${n}`,
    })),
    ratio: 1,
  },
];
const CLIENTS = [...new Set(TILES.map((t) => t.client))];
const CATEGORIES = [...new Set(TILES.flatMap((t) => t.genres))];

const LABEL =
  "whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.08em]";

/**
 * Visual Branding index — scattered tiles scrolling past a fixed logo, with a grid/list toggle and
 * a click-to-open category filter (client's Claude Design handoff). Tiles are the real media from
 * `Visual Branding/ALL MEDIA/` (git-ignored), resized to `public/visual-branding/`. Tiles don't
 * navigate yet — no per-client subpage exists. The design's year / industry / views /
 * delivery-time columns are omitted — there's no real data for them (don't invent any).
 */
export default function VisualBrandingIndexPage() {
  const [view, setView] = useState<ViewMode>("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const place = (id: string): TileLayout =>
    VISUAL_BRANDING_LAYOUT[id] ?? { x: 5, y: 5, w: 16 };
  const pageHeight = Math.max(
    ...TILES.map((t) => place(t.id).y + place(t.id).w / t.ratio),
  );

  const dim = (t: Tile) => (active && !t.genres.includes(active) ? 0.12 : 1);

  return (
    <main
      className={`relative overflow-hidden ${mulish.className}`}
      style={{
        background: BLACK,
        color: CREAM,
        minHeight: `max(100dvh, ${round1(pageHeight + 8)}vw)`,
      }}
    >
      <Link
        href="/"
        aria-label="Back to Silly Billi Studio"
        className="fixed top-3 left-3 z-[7] flex size-9 items-center justify-center rounded-full border-2 bg-[#F1E5C7]"
        style={{ borderColor: INK }}
      >
        <Image
          src="/brand/mascot.png"
          alt=""
          width={22}
          height={22}
          className="size-[22px] rounded-full object-cover"
        />
      </Link>

      <h1 className="sr-only">Visual Branding</h1>

      <Image
        src="/brand/logo-silly-studio.png"
        alt="Silly Billi Studio"
        width={320}
        height={320}
        priority
        className="pointer-events-none fixed top-1/2 left-1/2 z-[1] h-auto w-[min(24vw,320px)] -translate-x-1/2 -translate-y-1/2"
      />

      {view === "grid" &&
        TILES.map((t) => (
          <TileCard
            key={t.id}
            tile={t}
            place={place(t.id)}
            accent={CLIENT_COLOR[t.client]}
            opacity={dim(t)}
          />
        ))}

      {view === "list" && (
        <div className="relative z-[2] mx-auto max-w-[1400px] px-12 pt-[120px] pb-40">
          {CLIENTS.map((client) => {
            const items = TILES.filter(
              (t) =>
                t.client === client && (!active || t.genres.includes(active)),
            );
            return (
              <div
                key={client}
                className="group border-b px-5 py-[18px] transition-[background,padding] duration-[140ms] hover:bg-[#F1E5C7] hover:py-[26px] hover:text-[#141414]"
                style={{
                  borderColor: "rgba(241,229,199,0.25)",
                  opacity: items.length ? 1 : 0.12,
                }}
              >
                <div className="flex items-center gap-5">
                  <div
                    className="size-2.5 shrink-0 opacity-0 group-hover:opacity-100"
                    style={{ background: CLIENT_COLOR[client] }}
                  />
                  <div className={`text-[22px] ${libreBaskerville.className}`}>
                    {client}
                  </div>
                </div>
                <div className="mt-0 hidden flex-wrap gap-4 pt-5 pl-[30px] group-hover:flex">
                  {items.map((t) => (
                    <div key={t.id} className="w-[110px]">
                      <div className="relative h-[120px] w-[110px]">
                        <Image
                          src={t.slides[0].src}
                          alt={t.name}
                          fill
                          sizes="110px"
                          className="object-contain"
                        />
                      </div>
                      <div className="mt-1.5 text-[12px] leading-tight opacity-65">
                        {t.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filterOpen && (
        <>
          <div
            className="fixed inset-0 z-[4] opacity-[0.88]"
            style={{ background: BLACK }}
            onClick={() => setFilterOpen(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-[5] flex flex-col items-center justify-center gap-7">
            <div className="pointer-events-auto flex max-w-[640px] flex-wrap justify-center gap-3.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setActive(active === c ? null : c);
                    setFilterOpen(false);
                  }}
                  className={`${LABEL} cursor-pointer border-2 px-[22px] py-3 hover:bg-[#F2A81D]`}
                  style={{ borderColor: INK, background: CREAM }}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              aria-label="Close filter"
              onClick={() => setFilterOpen(false)}
              className="pointer-events-auto flex size-11 cursor-pointer items-center justify-center rounded-full"
              style={{ background: MUSTARD }}
            >
              <X size={18} color={INK} />
            </button>
          </div>
        </>
      )}

      <div
        className="fixed bottom-7 left-1/2 z-[6] flex -translate-x-1/2 items-center overflow-hidden rounded-full border-2"
        style={{
          background: CREAM,
          borderColor: INK,
          boxShadow: `2px 2px 0 ${INK}`,
          color: INK,
        }}
      >
        <button
          onClick={() => setFilterOpen((o) => !o)}
          className="flex cursor-pointer items-center gap-2.5 border-r-2 px-5 py-2.5 transition-colors duration-[140ms]"
          style={{
            borderColor: INK,
            background: filterOpen ? INK : "transparent",
            color: filterOpen ? MUSTARD : INK,
          }}
        >
          <span
            className="flex size-7 items-center justify-center rounded-full"
            style={{ background: INK }}
          >
            <Plus size={14} color={MUSTARD} />
          </span>
          <span className={LABEL}>{active ?? "Filter works"}</span>
        </button>
        {(
          [
            ["grid", "Grid", LayoutGrid],
            ["list", "List", List],
          ] as const
        ).map(([mode, label, Icon], i) => (
          <button
            key={mode}
            onClick={() => setView(mode)}
            className={`flex cursor-pointer flex-col items-center gap-0.5 px-[18px] py-2.5 ${i === 0 ? "border-r-2" : ""}`}
            style={{ borderColor: INK }}
          >
            <span className="flex items-center gap-2">
              <Icon size={16} color={INK} />
              <span className={LABEL}>{label}</span>
            </span>
            <span
              className="h-[3px] w-3.5"
              style={{ background: view === mode ? MUSTARD : "transparent" }}
            />
          </button>
        ))}
      </div>
    </main>
  );
}

function TileCard({
  tile: t,
  place,
  accent,
  opacity,
}: {
  tile: Tile;
  place: TileLayout;
  accent: string;
  opacity: number;
}) {
  const [i, setI] = useState(0);
  const n = t.slides.length;
  const go = (d: number) => setI((i + d + n) % n);

  return (
    <div
      className={`group absolute z-[2] border-2 shadow-[4px_4px_0_var(--accent)] transition-[opacity,transform,box-shadow] duration-[220ms] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--accent)]`}
      style={
        {
          top: `${place.y}vw`,
          left: `${place.x}vw`,
          width: `${place.w}vw`,
          aspectRatio: t.ratio,
          borderColor: CREAM,
          background: t.background ?? INK,
          opacity,
          "--accent": accent,
        } as CSSProperties
      }
    >
      {t.video ? (
        <video
          src={t.video}
          poster={t.slides[0].src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-contain"
        />
      ) : (
        <Image
          src={t.slides[i].src}
          alt={t.slides[i].alt}
          fill
          sizes="40vw"
          className="object-contain"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-start justify-end gap-2 p-5 opacity-0 transition-opacity duration-[140ms] group-hover:opacity-[0.55]"
        style={{ background: INK }}
      >
        <div
          className="size-3.5 border-[1.5px]"
          style={{ background: accent, borderColor: CREAM }}
        />
        <div
          className="text-xl leading-[1.2] font-bold"
          style={{ color: CREAM }}
        >
          {n > 1 ? `${t.name} · ${i + 1}/${n}` : t.name}
        </div>
      </div>
      {n > 1 &&
        (
          [
            [-1, "Previous slide", ChevronLeft, "-left-[4vw]"],
            [1, "Next slide", ChevronRight, "-right-[4vw]"],
          ] as const
        ).map(([d, label, Icon, side]) => (
          <button
            key={d}
            aria-label={label}
            onClick={() => go(d)}
            className={`absolute top-1/2 ${side} z-[3] flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center border-2 hover:bg-[#F2A81D]`}
            style={{ background: CREAM, borderColor: INK }}
          >
            <Icon size={18} color={INK} />
          </button>
        ))}
    </div>
  );
}
