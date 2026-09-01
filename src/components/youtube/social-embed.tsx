"use client";

import { useEffect, useRef } from "react";

import type { EmbedInfo } from "@/lib/videos";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const INSTAGRAM_EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";

interface SocialEmbedProps {
  info: EmbedInfo;
  className?: string;
}

/**
 * Renders a platform's own free public embed — YouTube's iframe player, or Instagram's
 * official embed.js widget. Both play the real posted video using the platform's own
 * hosting/CDN, so this needs no video hosting of our own and no API key.
 */
export function SocialEmbed({ info, className }: SocialEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (info.type !== "instagram") return;

    function process() {
      window.instgrm?.Embeds.process();
    }

    if (window.instgrm) {
      process();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${INSTAGRAM_EMBED_SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", process);
      return () => existing.removeEventListener("load", process);
    }

    const script = document.createElement("script");
    script.src = INSTAGRAM_EMBED_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", process);
    document.body.appendChild(script);
  }, [info]);

  if (info.type === "youtube") {
    return (
      <iframe
        src={info.embedUrl}
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="Video player"
      />
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={info.permalink}
        data-instgrm-version="14"
        style={{ margin: "0 auto", width: "100%" }}
      />
    </div>
  );
}
