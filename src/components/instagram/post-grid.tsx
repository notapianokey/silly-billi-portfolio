"use client";

import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { EditPostDialog } from "@/components/instagram/edit-post-dialog";
import { CarouselIcon, ClipIcon } from "@/components/instagram/icons";
import { PostDetailDialog } from "@/components/instagram/post-detail-dialog";
import type { InstagramPost } from "@/lib/instagram";

/** Each tile carries its own upload shortcut (bottom-right "+") straight into EditPostDialog,
 *  replacing the single generic "Add post" button that used to sit above the grid — with the
 *  grid now pre-populated with placeholder tiles, the client needs to replace each one directly
 *  rather than only ever creating new posts. Viewing (click the tile itself) still opens
 *  PostDetailDialog, which has its own pencil-to-edit path too — this is just a faster shortcut
 *  straight to the upload dialog. */
export function PostGrid({ handle, posts }: { handle: string; posts: InstagramPost[] }) {
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);

  return (
    <>
      {posts.length === 0 ? (
        <div className="ig-text-shadow flex flex-col items-center gap-2 py-16 text-center text-white/80">
          <CarouselIcon className="size-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          <p className="text-sm font-medium">Posts coming soon</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 bg-transparent">
          {posts.map((post) => {
            const cover = post.media[0];
            return (
              <div key={post.id} className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                <button
                  type="button"
                  onClick={() => setActivePost(post)}
                  className="absolute inset-0"
                  aria-label="View post"
                >
                  {cover?.type === "image" ? (
                    <Image
                      src={cover.src}
                      alt=""
                      fill
                      sizes="(min-width: 470px) 156px, 33vw"
                      quality={90}
                      className="object-cover"
                    />
                  ) : cover ? (
                    <video src={cover.src} className="size-full object-cover" muted />
                  ) : null}
                </button>

                {post.isNew && (
                  <span className="pointer-events-none absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    New
                  </span>
                )}
                {post.type === "carousel" && (
                  <CarouselIcon className="pointer-events-none absolute right-1.5 top-1.5 size-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                )}
                {post.type === "video" && (
                  <ClipIcon className="pointer-events-none absolute right-1.5 top-1.5 size-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                )}

                <button
                  type="button"
                  onClick={() => setEditingPost(post)}
                  className="absolute bottom-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                  aria-label="Upload to this post"
                >
                  <PlusIcon className="size-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <PostDetailDialog
        handle={handle}
        post={activePost}
        onOpenChange={(open) => !open && setActivePost(null)}
      />
      <EditPostDialog
        handle={handle}
        post={editingPost ?? undefined}
        open={editingPost !== null}
        onOpenChange={(open) => !open && setEditingPost(null)}
      />
    </>
  );
}
