import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 restricts optimized image quality to [75] by default — thumbnails were getting
    // silently coerced back to 75 even when a higher `quality` prop was passed, adding a second
    // layer of lossy re-encoding on top of whatever the client already uploaded.
    qualities: [75, 90, 100],
    // Real YouTube CDN hosts — needed for the Channels We've Monetized page, which hotlinks
    // real channel avatars and video/short thumbnails rather than downloading/hosting copies
    // (these are other channels' content, not ours to mirror).
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
