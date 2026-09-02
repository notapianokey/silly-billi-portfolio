"use client";

import { Loader2Icon, PencilIcon } from "lucide-react";
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
import { VIDEO_CATEGORIES, LANGUAGE_CATEGORIES, type LanguageId, type VideoCategoryId } from "@/lib/videos";

interface EditVideoDialogProps {
  id: string;
  kind: "video" | "short";
  title: string;
  description?: string;
  thumbnailSrc?: string;
  sourceUrl?: string;
  /** Unset only ever applies to long-form videos that don't fit any content-type pill. */
  category?: VideoCategoryId;
  language: LanguageId;
  /** Renders the trigger button; keeps this component usable inline in cards or the modal. */
  triggerClassName?: string;
}

export function EditVideoDialog({
  id,
  kind,
  title: initialTitle,
  description: initialDescription,
  thumbnailSrc,
  sourceUrl: initialSourceUrl,
  category: initialCategory,
  language: initialLanguage,
  triggerClassName,
}: EditVideoDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [sourceUrl, setSourceUrl] = useState(initialSourceUrl ?? "");
  const [category, setCategory] = useState<VideoCategoryId | "">(initialCategory ?? "");
  const [language, setLanguage] = useState<LanguageId>(initialLanguage);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(thumbnailSrc);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleThumbnailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    const formData = new FormData();
    formData.set("id", id);
    formData.set("kind", kind);
    formData.set("title", title);
    formData.set("sourceUrl", sourceUrl.trim());
    formData.set("description", description);
    formData.set("category", category);
    formData.set("language", language);
    if (thumbnailFile) formData.set("thumbnail", thumbnailFile);

    try {
      const res = await fetch("/api/dev/videos", { method: "PATCH", body: formData });
      const text = await res.text();
      let body: { error?: string } = {};
      try {
        body = text ? JSON.parse(text) : {};
      } catch {
        // Non-JSON response (e.g. an HTML error page) — fall through to the generic message below.
      }

      if (!res.ok) {
        throw new Error(
          body.error ??
            "Save failed with no details from the server — check that you're running the site locally (npm run dev).",
        );
      }

      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={triggerClassName}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
      >
        <PencilIcon className="size-4" />
      </Button>

      <DialogContent className="max-w-md" onClick={(event) => event.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Thumbnail</label>
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-secondary">
                {previewUrl && (
                  <Image src={previewUrl} alt="" fill className="object-cover" unoptimized />
                )}
              </div>
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleThumbnailChange}
                className="text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="edit-title" className="mb-1.5 block text-sm font-medium">
              Title
            </label>
            <input
              id="edit-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
            />
          </div>

          <div>
            <label htmlFor="edit-description" className="mb-1.5 block text-sm font-medium">
              Description
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              className="w-full resize-none rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label htmlFor="edit-category" className="mb-1.5 block text-sm font-medium">
                Category
              </label>
              <select
                id="edit-category"
                value={category}
                onChange={(event) => setCategory(event.target.value as VideoCategoryId | "")}
                className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-ring"
              >
                <option value="">None</option>
                {VIDEO_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="edit-language" className="mb-1.5 block text-sm font-medium">
                Language
              </label>
              <select
                id="edit-language"
                value={language}
                onChange={(event) => setLanguage(event.target.value as LanguageId)}
                className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-ring"
              >
                {LANGUAGE_CATEGORIES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="edit-source-url" className="mb-1.5 block text-sm font-medium">
              Link to the real posted video
            </label>
            <input
              id="edit-source-url"
              type="url"
              value={sourceUrl}
              onChange={(event) => setSourceUrl(event.target.value)}
              placeholder="https://youtube.com/watch?v=... or Instagram/TikTok link"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Powers the &quot;View on [Platform]&quot; button, and is what Claude will use to
              look up real view counts when you ask for a refresh.
            </p>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2Icon className="size-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
