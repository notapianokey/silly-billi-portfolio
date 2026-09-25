import type { NextConfig } from "next";

// The one Vercel Blob store hosting this site's media. Pinned to the exact host: a
// `*.public.blob.vercel-storage.com` wildcard would let anyone push images from *their own* Blob
// store through this site's image optimizer (quota abuse). Add a new host here if a second store
// is ever created.
const BLOB_HOST = "6pfetlxlrz2r9k7y.public.blob.vercel-storage.com";

// Static (SSG) site, so no nonces: a nonce needs per-request rendering, which would undo static
// generation and the $0 hosting plan. 'unsafe-inline' is what Next's inline hydration scripts and
// React `style` props need — see "Without Nonces" in
// node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md.
// Any NEW third-party origin (embed, script, image/media host, API) must be added below or the
// browser will block it — and update the Cookies/Privacy Policy pages when that happens.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.instagram.com", // instagram: embed.js in social-embed.tsx
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://${BLOB_HOST} https://i.ytimg.com https://yt3.googleusercontent.com`,
  `media-src 'self' blob: https://${BLOB_HOST}`,
  "font-src 'self'", // next/font self-hosts every font at build time
  "connect-src 'self'", // the only fetch is the contact form -> /api/contact
  "frame-src https://www.youtube-nocookie.com https://www.instagram.com", // social-embed.tsx
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

// Strict-Transport-Security is intentionally absent: Vercel already sends it on every response.
const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Not `no-referrer`: YouTube's embedded player needs the referring origin to load.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // don't advertise the framework in every response
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
      // Vercel Blob — Instagram post/highlight/avatar media is self-hosted here (same store as
      // the video-editing clips), unlike video files which stay off next/image entirely.
      { protocol: "https", hostname: BLOB_HOST },
    ],
  },
  async headers() {
    // Deployed site only: dev needs 'unsafe-eval' (React debugging) and gains nothing from these.
    if (process.env.NODE_ENV !== "production") return [];
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
