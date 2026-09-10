"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { BENTO_TILES, type BentoTile } from "@/lib/visual-branding-bento";

import styles from "./page.module.css";

/** Explicit CSS Grid line numbers, not Tailwind span classes — see the "why explicit lines, not
 *  dense auto-flow" note in visual-branding-bento.ts. `gridColumn`/`gridRow` are harmless no-ops
 *  on the mobile flex-column layout (page.module.css only makes `.wall` a grid at lg), so this
 *  can apply unconditionally without a separate mobile style path. */
function getGridPlacementStyle(tile: BentoTile): CSSProperties {
  return {
    gridColumn: `${tile.colStart} / ${tile.colEnd}`,
    gridRow: `${tile.rowStart} / ${tile.rowEnd}`,
  };
}

const BACKGROUND_CLASSES: Record<BentoTile["background"], string> = {
  paper: "bg-[#EDE7D8]",
  dark: "bg-black",
  none: "bg-neutral-900",
};

/**
 * The Visual Branding index — a single continuous "brand book" bento wall, not one tile per
 * client brand. Client's explicit call, after seeing a reference brand-book layout (12-column
 * grid, mixed image/caption tiles, tile-shadow + hover-lift, generously-but-not-excessively
 * rounded corners): every tile is a real asset from one brand's actual delivered work — right
 * now that's The Thomsen Company's coat of arms, chess-set concept, and workshop photography
 * (`src/lib/visual-branding-bento.ts`) — and every tile still links out to that brand's own
 * Instagram-clone profile page, same as the old one-tile-per-brand grid did. As more brands'
 * real content lands, their tiles join this same wall rather than getting a separate index card.
 *
 * Captions are short and purely descriptive of what's actually depicted (a rook labeled "Julius
 * Caesar — King's Rook", not an invented production narrative) — the reference file included
 * specific unverifiable claims (exact sketch counts, fabrication methods, philosophy copy) that
 * aren't something to fabricate here just to match the reference's density.
 */
export default function VisualBrandingIndexPage() {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <header className="flex items-center gap-3 px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-black">
            <div className="size-3 rounded-full bg-[#A8151E]" />
          </div>
          <span className="text-[13px] font-semibold tracking-[0.18em]">VISUAL BRANDING</span>
        </Link>
      </header>

      <main className="px-4 pb-10 lg:px-6">
        <div className={styles.wall}>
          {BENTO_TILES.map((tile) => (
            <Link
              key={tile.id}
              href={`/visual-branding/${tile.linkedHandle}`}
              style={getGridPlacementStyle(tile)}
              className={`group relative overflow-hidden rounded-[24px] lg:rounded-[28px] ${BACKGROUND_CLASSES[tile.background]} ${styles.tile}`}
            >
              <div
                className={
                  tile.fit === "contain"
                    ? "relative h-56 w-full p-8 lg:h-full lg:p-10"
                    : "relative h-56 w-full lg:h-full"
                }
              >
                <Image
                  src={tile.imageSrc}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={
                    tile.fit === "contain"
                      ? "object-contain transition-transform duration-500 group-hover:scale-105"
                      : "object-cover transition-transform duration-500 group-hover:scale-105"
                  }
                />
              </div>

              {tile.fit === "cover" && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.1em] ${
                    tile.background === "paper" ? "text-[#A8151E]" : "text-[#C8A87A]"
                  }`}
                >
                  {tile.caption}
                </p>
                {tile.subcaption && (
                  <p
                    className={`mt-0.5 text-xs ${
                      tile.background === "paper" ? "text-black/60" : "text-white/70"
                    }`}
                  >
                    {tile.subcaption}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
