import layoutData from "./visual-branding-layout.data.json";

/** A tile's place on the /visual-branding page, all in vw: `x`/`y` = left/top edge of the image
 *  (page-container relative), `w` = image width (height follows the tile's aspect ratio). */
export interface TileLayout {
  x: number;
  y: number;
  w: number;
}

export type VisualBrandingLayout = Record<string, TileLayout>;

export const VISUAL_BRANDING_LAYOUT: VisualBrandingLayout = layoutData;
