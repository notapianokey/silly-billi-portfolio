"use client";

import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { EditPostDialog } from "@/components/instagram/edit-post-dialog";
import { CarouselIcon, ClipIcon } from "@/components/instagram/icons";
import { PostDetailDialog } from "@/components/instagram/post-detail-dialog";
import type { InstagramPost } from "@/lib/instagram";

export function PostGrid({ handle, posts }: { handle: string; posts: InstagramPost[] }) {
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <div className="flex shrink-0 items-center justify-end px-2 py-1">
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex size-8 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white"
          aria-label="Add post"
        >
          <PlusIcon className="size-4" />
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center text-neutral-500">
          <CarouselIcon className="size-6" />
          <p className="text-sm font-medium">Posts coming soon</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-px bg-neutral-800">
          {posts.map((post) => {
            const cover = post.media[0];
            return (
              <button
                key={post.id}
                type="button"
                onClick={() => setActivePost(post)}
                className="relative aspect-[3/4] overflow-hidden bg-neutral-900"
              >
                {cover?.type === "image" ? (
                  <Image src={cover.src} alt="" fill sizes="200px" className="object-cover" />
                ) : cover ? (
                  <video src={cover.src} className="size-full object-cover" muted />
                ) : null}
                {post.isNew && (
                  <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    New
                  </span>
                )}
                {post.type === "carousel" && (
                  <CarouselIcon className="absolute right-1.5 top-1.5 size-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                )}
                {post.type === "video" && (
                  <ClipIcon className="absolute right-1.5 top-1.5 size-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      )}

      <PostDetailDialog
        handle={handle}
        post={activePost}
        onOpenChange={(open) => !open && setActivePost(null)}
      />
      <EditPostDialog handle={handle} open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
