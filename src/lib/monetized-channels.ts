import monetizedChannelsData from "./monetized-channels.data.json";

export interface MonetizedResultItem {
  title: string;
  /** Real YouTube link — always opens in a new tab. */
  url: string;
  thumbnailSrc?: string;
  viewsLabel?: string;
  durationLabel?: string;
}

export interface MonetizedChannel {
  id: string;
  name: string;
  handle?: string;
  /** Real channel link — always opens in a new tab. */
  url: string;
  avatarSrc?: string;
  subscriberLabel?: string;
  description?: string;
  topVideos: MonetizedResultItem[];
  topShorts: MonetizedResultItem[];
}

export const MONETIZED_CHANNELS: MonetizedChannel[] = monetizedChannelsData as MonetizedChannel[];
