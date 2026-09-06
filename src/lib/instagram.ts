import instagramData from "./instagram.data.json";

export interface InstagramHighlight {
  id: string;
  label: string;
  coverSrc?: string;
}

export interface InstagramMedia {
  type: "image" | "video";
  src: string;
}

export interface InstagramPost {
  id: string;
  type: "image" | "video" | "carousel";
  /** One entry for "image"/"video", two or more for "carousel". */
  media: InstagramMedia[];
  caption?: string;
  isNew?: boolean;
}

export interface InstagramProfile {
  /** Also the `/visual-branding/[handle]` route param. */
  handle: string;
  displayName: string;
  avatarSrc?: string;
  /** Full-bleed brand photo behind the transparent/outline UI chrome — every profile gets its
   *  own, per the client's design pivot away from a literal Instagram clone toward a stylized
   *  branding-showcase mockup treatment. Unset falls back to a plain dark background. */
  backgroundSrc?: string;
  bio?: string;
  externalLinks: { label: string; url: string }[];
  /** Free-text display labels (e.g. "551K") — not computed, and left blank until the client
   *  provides real numbers. Post count is derived from `posts.length` instead of stored here. */
  followers?: string;
  following?: string;
  /** The exact "Followed by X, Y and N others" line — free text the client writes herself
   *  (mirrors the mutual-followers row on real profiles), never fabricated names. Unset hides
   *  the row entirely. */
  followedByLabel?: string;
  /** Small rounded chips under the bio (e.g. real profiles' pinned-link/guide row) — freeform
   *  strings, same "no enforced enum" convention as video tags. */
  pills: string[];
  highlights: InstagramHighlight[];
  posts: InstagramPost[];
}

export const INSTAGRAM_PROFILES: InstagramProfile[] = instagramData as InstagramProfile[];

export function getInstagramProfile(handle: string): InstagramProfile | undefined {
  return INSTAGRAM_PROFILES.find((profile) => profile.handle === handle);
}
