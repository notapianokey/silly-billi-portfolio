"use client";

import { Loader2Icon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
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
import type { SocialLink } from "@/lib/channel";

interface EditChannelDialogProps {
  description: string;
  bannerSrc?: string;
  socialLinks: SocialLink[];
  triggerClassName?: string;
}

export function EditChannelDialog({
  description: initialDescription,
  bannerSrc,
  socialLinks: initialSocialLinks,
  triggerClassName,
}: EditChannelDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(bannerSrc);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleBannerChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function updateLink(index: number, field: keyof SocialLink, value: string) {
    setSocialLinks((current) =>
      current.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    );
  }

  function removeLink(index: number) {
    setSocialLinks((current) => current.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    const formData = new FormData();
    formData.set("description", description);
    formData.set(
      "socialLinks",
      JSON.stringify(socialLinks.filter((link) => link.label.trim() && link.url.trim())),
    );
    if (bannerFile) formData.set("banner", bannerFile);

    try {
      const res = await fetch("/api/dev/channel", { method: "PATCH", body: formData });
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
        onClick={() => setOpen(true)}
      >
        <PencilIcon className="size-4" />
      </Button>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit channel</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Banner</label>
            <div className="flex flex-col gap-2">
              <div className="relative h-20 w-full overflow-hidden rounded-lg bg-secondary">
                {previewUrl && (
                  <Image src={previewUrl} alt="" fill className="object-cover" unoptimized />
                )}
              </div>
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleBannerChange}
                className="text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="edit-channel-description" className="mb-1.5 block text-sm font-medium">
              Channel description
            </label>
            <textarea
              id="edit-channel-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              className="w-full resize-none rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Social links</label>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    value={link.label}
                    onChange={(event) => updateLink(index, "label", event.target.value)}
                    placeholder="Label (e.g. Instagram)"
                    className="w-28 shrink-0 rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:border-ring"
                  />
                  <input
                    value={link.url}
                    onChange={(event) => updateLink(index, "url", event.target.value)}
                    placeholder="https://..."
                    className="flex-1 rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:border-ring"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => removeLink(index)}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="self-start"
                onClick={() => setSocialLinks((current) => [...current, { label: "", url: "" }])}
              >
                <PlusIcon className="size-4" />
                Add link
              </Button>
            </div>
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
