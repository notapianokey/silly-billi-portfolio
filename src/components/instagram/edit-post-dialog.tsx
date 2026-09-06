"use client";

import { ChevronDownIcon, ChevronUpIcon, Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { InstagramPost } from "@/lib/instagram";

interface MediaRow {
  key: string;
  existingType?: "image" | "video";
  existingSrc?: string;
  file?: File;
  previewUrl?: string;
}

interface EditPostDialogProps {
  handle: string;
  post?: InstagramPost;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function toMediaRows(post?: InstagramPost): MediaRow[] {
  if (!post) return [];
  return post.media.map((m, i) => ({ key: `existing-${i}`, existingType: m.type, existingSrc: m.src }));
}

/** Shared create/edit dialog for a single Instagram post — image, video, or a multi-slide
 *  carousel mixing both, matching the "everything" upload requirement. Media order matters for
 *  carousels, so rows get real up/down reordering (unlike highlights, which don't need it). */
export function EditPostDialog({ handle, post, open, onOpenChange }: EditPostDialogProps) {
  const router = useRouter();
  const [caption, setCaption] = useState(post?.caption ?? "");
  const [isNew, setIsNew] = useState(post?.isNew ?? false);
  const [media, setMedia] = useState<MediaRow[]>(toMediaRows(post));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetTo(nextPost?: InstagramPost) {
    setCaption(nextPost?.caption ?? "");
    setIsNew(nextPost?.isNew ?? false);
    setMedia(toMediaRows(nextPost));
    setError(null);
  }

  function handleOpenChange(next: boolean) {
    if (next) resetTo(post);
    onOpenChange(next);
  }

  function addFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setMedia((current) => [
      ...current,
      { key: `new-${crypto.randomUUID()}`, file, previewUrl: URL.createObjectURL(file) },
    ]);
    event.target.value = "";
  }

  function removeRow(key: string) {
    setMedia((current) => current.filter((row) => row.key !== key));
  }

  function moveRow(index: number, direction: -1 | 1) {
    setMedia((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSave() {
    if (media.length === 0) {
      setError("Add at least one image or video.");
      return;
    }

    setSaving(true);
    setError(null);

    const formData = new FormData();
    formData.set("handle", handle);
    formData.set("action", "post");
    formData.set("postId", post?.id ?? "");
    formData.set("caption", caption);
    formData.set("isNew", String(isNew));
    formData.set(
      "media",
      JSON.stringify(
        media.map((row) =>
          row.file
            ? { pending: true }
            : { pending: false, type: row.existingType, src: row.existingSrc },
        ),
      ),
    );
    media.forEach((row, index) => {
      if (row.file) formData.set(`mediaFile_${index}`, row.file);
    });

    try {
      const res = await fetch("/api/dev/instagram", { method: "PATCH", body: formData });
      const text = await res.text();
      let body: { error?: string } = {};
      try {
        body = text ? JSON.parse(text) : {};
      } catch {
        // Non-JSON response — fall through to the generic message below.
      }

      if (!res.ok) {
        throw new Error(
          body.error ??
            "Save failed with no details from the server — check that you're running the site locally (npm run dev).",
        );
      }

      onOpenChange(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!post) return;
    setDeleting(true);
    setError(null);

    const formData = new FormData();
    formData.set("handle", handle);
    formData.set("action", "deletePost");
    formData.set("postId", post.id);

    try {
      const res = await fetch("/api/dev/instagram", { method: "PATCH", body: formData });
      if (!res.ok) throw new Error("Delete failed.");
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeleting(false);
    }
  }

  const busy = saving || deleting;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{post ? "Edit post" : "Add post"}</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Media {media.length > 1 && <span className="text-muted-foreground">(carousel)</span>}
            </label>
            <div className="flex flex-col gap-2">
              {media.map((row, index) => (
                <div key={row.key} className="flex items-center gap-2">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    {row.previewUrl ? (
                      row.file?.type.startsWith("video") ? (
                        <video src={row.previewUrl} className="size-full object-cover" muted />
                      ) : (
                        <Image src={row.previewUrl} alt="" fill className="object-cover" unoptimized />
                      )
                    ) : row.existingSrc && row.existingType === "video" ? (
                      <video src={row.existingSrc} className="size-full object-cover" muted />
                    ) : row.existingSrc ? (
                      <Image src={row.existingSrc} alt="" fill className="object-cover" unoptimized />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={index === 0}
                      onClick={() => moveRow(index, -1)}
                    >
                      <ChevronUpIcon className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={index === media.length - 1}
                      onClick={() => moveRow(index, 1)}
                    >
                      <ChevronDownIcon className="size-4" />
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => removeRow(row.key)}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
              ))}
              <label className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm hover:bg-accent">
                <PlusIcon className="size-4" />
                Add image or video
                <input type="file" accept="image/png,image/jpeg,video/mp4,video/quicktime" onChange={addFile} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="ig-post-caption" className="mb-1.5 block text-sm font-medium">
              Caption
            </label>
            <textarea
              id="ig-post-caption"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isNew} onChange={(event) => setIsNew(event.target.checked)} />
            Show &quot;New&quot; badge
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          {post && (
            <Button variant="destructive" onClick={handleDelete} disabled={busy} className="sm:mr-auto">
              {deleting && <Loader2Icon className="size-4 animate-spin" />}
              Delete post
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={busy}>
            {saving && <Loader2Icon className="size-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
