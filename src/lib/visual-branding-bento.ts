import bentoData from "./visual-branding-bento.data.json";

/**
 * `/visual-branding` bento wall — a single continuous mosaic mixing real brand-asset tiles
 * across every client brand (currently just The Thomsen Company), not one tile per brand. Every
 * tile links out to the brand's own Instagram-clone page (`linkedHandle`, a
 * `src/lib/instagram.ts` `InstagramProfile.handle`).
 *
 * `colStart`/`colEnd`/`rowStart`/`rowEnd` are explicit CSS Grid line numbers (1-indexed, out of
 * a 12-column grid), hand-placed and verified band-by-band so every row is exactly full — not
 * `grid-auto-flow: dense` span classes. Dense auto-placement is a greedy heuristic: handed 13
 * irregularly-sized tiles it reliably leaves visible holes (confirmed by trying it first — 32
 * empty cells before this rewrite), whereas partitioning the grid into row-bands that each sum
 * exactly to width × height in advance guarantees zero gaps.
 */
export interface BentoTile {
  id: string;
  imageSrc: string;
  alt: string;
  caption: string;
  subcaption?: string;
  /** Tile backdrop behind a transparent-PNG asset. "paper" and "dark" give the logo/heraldry
   *  cutouts a surface to sit on; "none" is for tiles whose image is already full-bleed
   *  (photos, illustrations with their own background). */
  background: "paper" | "dark" | "none";
  /** "contain" for logo/icon-style transparent assets (never crop a mark), "cover" for
   *  full-bleed photos/illustrations. */
  fit: "contain" | "cover";
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
  linkedHandle: string;
}

export const BENTO_TILES: BentoTile[] = bentoData as BentoTile[];
