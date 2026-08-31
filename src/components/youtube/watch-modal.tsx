"use client";

import { ChevronDownIcon, ChevronUpIcon, PlayIcon } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  formatDuration,
  formatViews,
  THUMBNAIL_PALETTE,
  type VideoProject,
} from "@/lib/videos";

interface WatchModalProps {
  video: VideoProject | null;
  onClose: () => void;
}

export function WatchModal({ video, onClose }: WatchModalProps) {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  return (
    <Dialog open={video !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto p-0 sm:rounded-xl">
        {video && (
          <div className="flex flex-col">
            <DialogTitle className="sr-only">{video.title}</DialogTitle>

            <Tabs defaultValue="final-cut">
              <div className="relative aspect-video overflow-hidden rounded-t-xl bg-black">
                <TabsContent value="final-cut" className="m-0 h-full">
                  <PlaceholderPlayer
                    label="Final Cut"
                    paletteIndex={video.paletteIndex}
                  />
                </TabsContent>
                <TabsContent value="raw-footage" className="m-0 h-full">
                  <PlaceholderPlayer label="Raw Footage" paletteIndex={video.paletteIndex} muted />
                </TabsContent>
              </div>

              <div className="flex items-center justify-between border-b px-4 py-2">
                <TabsList>
                  <TabsTrigger value="final-cut">Final Cut</TabsTrigger>
                  <TabsTrigger value="raw-footage">Raw Footage</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>

            <div className="flex flex-col gap-4 p-4">
              <div>
                <h2 className="text-lg font-semibold leading-snug">{video.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Silly Billi Agency · {formatViews(video.views)} · {video.publishedLabel}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {video.chapters.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold">Chapters</h3>
                  <ul className="flex flex-col gap-1">
                    {video.chapters.map((chapter) => (
                      <li key={chapter.timestamp}>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm hover:bg-accent"
                        >
                          <span>{chapter.label}</span>
                          <span className="tabular-nums text-muted-foreground">
                            {chapter.timestamp}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div
                onClick={() => setDescriptionExpanded((current) => !current)}
                className="cursor-pointer rounded-xl bg-secondary/50 p-3 transition hover:bg-secondary/70"
              >
                <p className="mb-2 text-sm font-medium">
                  {formatDuration(video.durationSeconds)} runtime
                </p>
                <p
                  className={cn(
                    "whitespace-pre-wrap text-sm",
                    !descriptionExpanded && "line-clamp-2",
                  )}
                >
                  {video.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium">
                  {descriptionExpanded ? (
                    <>
                      Show less <ChevronUpIcon className="size-4" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDownIcon className="size-4" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PlaceholderPlayer({
  label,
  paletteIndex,
  muted,
}: {
  label: string;
  paletteIndex: number;
  muted?: boolean;
}) {
  const gradient = THUMBNAIL_PALETTE[paletteIndex % THUMBNAIL_PALETTE.length];

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br",
        gradient,
        muted && "grayscale",
      )}
    >
      <div className="flex flex-col items-center gap-2 text-white/90">
        <PlayIcon className="size-12 fill-white/90" />
        <span className="text-sm font-medium">{label} preview</span>
      </div>
    </div>
  );
}
