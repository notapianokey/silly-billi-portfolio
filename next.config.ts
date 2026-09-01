import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 restricts optimized image quality to [75] by default — thumbnails were getting
    // silently coerced back to 75 even when a higher `quality` prop was passed, adding a second
    // layer of lossy re-encoding on top of whatever the client already uploaded.
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
