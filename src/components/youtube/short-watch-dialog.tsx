"use client";

import { ExternalLinkIcon } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getEmbedInfo, getPlatformLabel, type ShortProject } from "@/lib/videos";

import { SocialEmbed } from "./social-embed";

interface ShortWatchDialogProps {
  short: ShortProject;
  children: React.ReactNode;
}

/**
 * Wraps a Shorts card thumbnail: click opens the real embedded Reel/video when sourceUrl
 * resolves to one, otherwise renders the trigger inert (no dialog, no false promise of
 * playback for shorts that don't have a link yet).
 */
export function ShortWatchDialog({ short, children }: ShortWatchDialogProps) {
  const [open, setOpen] = useState(false);
  const embedInfo = short.sourceUrl ? getEmbedInfo(short.sourceUrl) : null;

  if (!embedInfo) {
    return <>{children}</>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button type="button" onClick={() => setOpen(true)} className="block w-full text-left">
        {children}
      </button>

      <DialogContent className="max-w-sm">
        <DialogTitle className="text-sm font-semibold leading-snug">{short.title}</DialogTitle>
        <div className="flex justify-center">
          <SocialEmbed info={embedInfo} className="w-full" />
        </div>
        <a
          href={short.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLinkIcon className="size-3.5" />
          View on {getPlatformLabel(short.sourceUrl!)}
        </a>
      </DialogContent>
    </Dialog>
  );
}
