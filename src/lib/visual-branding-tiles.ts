// Tile data for the /visual-branding index page: what each piece is, its tags, and how it's shown.
// Where a tile sits and how big it is lives in `visual-branding-layout.data.json`.

// Shadow colour per client (brand palette: orange is the palette's red).
export const CLIENT_COLOR: Record<string, string> = {
  "Dimitri Lascaris": "#7C5DA8",
  "The Thomsen Company": "#E24A1E",
  "Eon Podcast": "#F2A81D",
  "Shah’s Curated Vault": "#1E4FA0",
  "Music Video": "#1C9A5A",
};
// Each client's Instagram-style profile page (`/visual-branding/[handle]`, data in
// `src/lib/instagram.data.json`). "Music Video" has none, so its tiles don't link.
export const CLIENT_HANDLE: Record<string, string> = {
  "Dimitri Lascaris": "dimitri-lascaris",
  "The Thomsen Company": "evan-thomsen",
  "Eon Podcast": "eon-podcast",
  "Shah’s Curated Vault": "shahs-curated-vault",
};

export const profileHref = (client: string) =>
  CLIENT_HANDLE[client]
    ? `/visual-branding/${CLIENT_HANDLE[client]}`
    : undefined;

export interface Tile {
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

// Where each tile sits and how big it is lives in `visual-branding-layout.data.json` (vw units).
// Each tile's `ratio` is its content's natural width/height: nothing is cropped (object-contain).
// Carousel arrows hang 4vw outside the image, so keep those tiles off the page edge.
export const TILES: Tile[] = [
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
    genres: ["Chess Set", "Thought Leadership"],
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
    genres: ["Heraldry", "Thought Leadership"],
    slides: [
      { src: "/visual-branding/thomsen-post-a.webp", alt: "Embossed Rose" },
    ],
    ratio: 1,
  },
  {
    id: "thomsen-post-b",
    name: "Chess Piece Render",
    client: "The Thomsen Company",
    genres: ["Chess Set", "Thought Leadership"],
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
    genres: ["Heraldry", "Thought Leadership"],
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
  {
    id: "dimitri-video",
    name: "Dimitri Lascaris — On-the-Ground Journalism",
    client: "Dimitri Lascaris",
    genres: ["Political", "Journalism"],
    video: "/visual-branding/dimitri-video.mp4",
    slides: [
      {
        src: "/visual-branding/dimitri-video.jpg",
        alt: "Dimitri Lascaris on-the-ground journalism video",
      },
    ],
    ratio: 1,
  },
];
