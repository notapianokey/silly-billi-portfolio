"use client";

import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditPostDialog } from "@/components/instagram/edit-post-dialog";
import { CommentIcon, LikeIcon, SaveIcon, ShareIcon } from "@/components/instagram/icons";
import type { InstagramMedia, InstagramPost } from "@/lib/instagram";
import { shareLink } from "@/lib/share";

interface PostDetailDialogProps {
  handle: string;
  post: InstagramPost | null;
  onOpenChange: (open: boolean) => void;
}

export function PostDetailDialog({ handle, post, onOpenChange }: PostDetailDialogProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Dialog open={post !== null && !editOpen} onOpenChange={onOpenChange}>
        {post && (
          <DialogContent
            key={post.id}
            showCloseButton
            className="max-w-lg overflow-hidden border-neutral-800 bg-black p-0 text-white sm:max-w-lg"
          >
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="absolute top-2 left-2 z-10 rounded-full bg-black/60 p-1.5 hover:bg-black/80"
            >
              <PencilIcon className="size-4" />
            </button>

            {post.media.length > 1 ? (
              <Carousel>
                <CarouselContent className="ml-0">
                  {post.media.map((media, index) => (
                    <CarouselItem key={index} className="pl-0">
                      <MediaView media={media} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 border-none bg-black/60 text-white hover:bg-black/80" />
                <CarouselNext className="right-2 border-none bg-black/60 text-white hover:bg-black/80" />
              </Carousel>
            ) : (
              <MediaView media={post.media[0]} />
            )}

            <ActionRow handle={handle} post={post} />

            {post.caption && <p className="whitespace-pre-wrap px-4 pb-4 text-sm">{post.caption}</p>}
          </DialogContent>
        )}
      </Dialog>

      {post && (
        <EditPostDialog
          handle={handle}
          post={post}
          open={editOpen}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (!open) onOpenChange(false);
          }}
        />
      )}
    </>
  );
}

/** Like/Save are real local toggles (same "no decorative dead buttons" convention used
 *  elsewhere on this site — Subscribe, Like/Dislike on the watch pages). Share reuses the same
 *  shareLink() utility as the video watch pages, sharing this profile's link since there's no
 *  dedicated per-post URL. Comment has no functionality behind it — there's no comment system
 *  on this site — so it's left as chrome, matching how Reels/Reposts/Tagged are also chrome. */
function ActionRow({ handle, post }: { handle: string; post: InstagramPost }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied">("idle");

  async function handleShare() {
    const result = await shareLink(`/visual-branding/${handle}`, post.caption ?? "Instagram post");
    if (result === "shared" || result === "copied") {
      setShareState(result);
      setTimeout(() => setShareState("idle"), 2000);
    }
  }

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => setLiked((current) => !current)} aria-pressed={liked}>
          <LikeIcon className="size-6" filled={liked} />
        </button>
        <button type="button">
          <CommentIcon className="size-6" />
        </button>
        <button type="button" onClick={handleShare} aria-label="Share">
          <ShareIcon className={shareState === "idle" ? "size-6" : "size-6 text-sky-400"} />
        </button>
      </div>
      <button type="button" onClick={() => setSaved((current) => !current)} aria-pressed={saved}>
        <SaveIcon className="size-6" filled={saved} />
      </button>
    </div>
  );
}

function MediaView({ media }: { media?: InstagramMedia }) {
  if (!media) return null;
  return (
    <div className="relative aspect-square w-full bg-neutral-900">
      {media.type === "image" ? (
        <Image src={media.src} alt="" fill sizes="512px" className="object-contain" />
      ) : (
        <video src={media.src} controls playsInline className="size-full object-contain" />
      )}
    </div>
  );
}
