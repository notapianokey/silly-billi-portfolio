import channelData from "./channel.data.json";

export interface SocialLink {
  label: string;
  url: string;
}

export interface ChannelProfile {
  description: string;
  bannerSrc?: string;
  socialLinks: SocialLink[];
}

export const CHANNEL_PROFILE: ChannelProfile = channelData as ChannelProfile;
