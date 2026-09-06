"use client";

import { Loader2Icon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { InstagramProfile } from "@/lib/instagram";

interface HighlightRow {
  id: string;
  label: string;
  coverSrc?: string;
  coverFile?: File;
  previewUrl?: string;
}

interface LinkRow {
  label: string;
  url: string;
}

interface EditProfileDialogProps {
  profile: InstagramProfile;
  triggerClassName?: string;
  /** Overrides the default pencil-icon trigger — used to open this same dialog from the
   *  highlights row's empty-state "+ New" circle. */
  trigger?: ReactNode;
}

export function EditProfileDialog({ profile, triggerClassName, trigger }: EditProfileDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio ?? "");
  const [followers, setFollowers] = useState(profile.followers ?? "");
  const [following, setFollowing] = useState(profile.following ?? "");
  const [followedByLabel, setFollowedByLabel] = useState(profile.followedByLabel ?? "");
  const [externalLinks, setExternalLinks] = useState<LinkRow[]>(profile.externalLinks);
  const [pills, setPills] = useState<string[]>(profile.pills);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(profile.avatarSrc);
  const [highlights, setHighlights] = useState<HighlightRow[]>(
    profile.highlights.map((h) => ({ id: h.id, label: h.label, coverSrc: h.coverSrc })),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateLink(index: number, field: keyof LinkRow, value: string) {
    setExternalLinks((current) => current.map((link, i) => (i === index ? { ...link, [field]: value } : link)));
  }

  function removeLink(index: number) {
    setExternalLinks((current) => current.filter((_, i) => i !== index));
  }

  function updatePill(index: number, value: string) {
    setPills((current) => current.map((pill, i) => (i === index ? value : pill)));
  }

  function removePill(index: number) {
    setPills((current) => current.filter((_, i) => i !== index));
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function updateHighlight(id: string, label: string) {
    setHighlights((current) => current.map((h) => (h.id === id ? { ...h, label } : h)));
  }

  function handleHighlightCoverChange(id: string, event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setHighlights((current) =>
      current.map((h) => (h.id === id ? { ...h, coverFile: file, previewUrl: URL.createObjectURL(file) } : h)),
    );
  }

  function removeHighlight(id: string) {
    setHighlights((current) => current.filter((h) => h.id !== id));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    const formData = new FormData();
    formData.set("handle", profile.handle);
    formData.set("action", "profile");
    formData.set("displayName", displayName);
    formData.set("bio", bio);
    formData.set("followers", followers);
    formData.set("following", following);
    formData.set("followedByLabel", followedByLabel);
    formData.set(
      "externalLinks",
      JSON.stringify(externalLinks.filter((link) => link.label.trim() && link.url.trim())),
    );
    formData.set("pills", JSON.stringify(pills.map((p) => p.trim()).filter(Boolean)));
    if (avatarFile) formData.set("avatar", avatarFile);
    formData.set(
      "highlights",
      JSON.stringify(highlights.filter((h) => h.label.trim()).map((h) => ({ id: h.id, label: h.label }))),
    );
    for (const highlight of highlights) {
      if (highlight.coverFile) formData.set(`highlightCover_${highlight.id}`, highlight.coverFile);
    }

    try {
      const res = await fetch("/api/dev/instagram", { method: "PATCH", body: formData });
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
      {trigger ? (
        <button type="button" onClick={() => setOpen(true)} className="contents">
          {trigger}
        </button>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={triggerClassName}
          onClick={() => setOpen(true)}
        >
          <PencilIcon className="size-4" />
        </Button>
      )}

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Avatar</label>
            <div className="flex items-center gap-3">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-secondary">
                {avatarPreview && (
                  <Image src={avatarPreview} alt="" fill className="object-cover" unoptimized />
                )}
              </div>
              <input type="file" accept="image/png,image/jpeg" onChange={handleAvatarChange} className="text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="ig-display-name" className="mb-1.5 block text-sm font-medium">
              Display name
            </label>
            <input
              id="ig-display-name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
            />
          </div>

          <div>
            <label htmlFor="ig-bio" className="mb-1.5 block text-sm font-medium">
              Bio
            </label>
            <textarea
              id="ig-bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label htmlFor="ig-followers" className="mb-1.5 block text-sm font-medium">
                Followers
              </label>
              <input
                id="ig-followers"
                value={followers}
                onChange={(event) => setFollowers(event.target.value)}
                placeholder="e.g. 12.4K"
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="ig-following" className="mb-1.5 block text-sm font-medium">
                Following
              </label>
              <input
                id="ig-following"
                value={following}
                onChange={(event) => setFollowing(event.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ig-followed-by" className="mb-1.5 block text-sm font-medium">
              &quot;Followed by&quot; line
            </label>
            <input
              id="ig-followed-by"
              value={followedByLabel}
              onChange={(event) => setFollowedByLabel(event.target.value)}
              placeholder="e.g. Followed by creativestudioxyz and 12 others"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-ring"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Free text — write the exact line, same as real Instagram&apos;s mutual-followers row.
              Leave blank to hide it.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">External links</label>
            <div className="flex flex-col gap-2">
              {externalLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    value={link.label}
                    onChange={(event) => updateLink(index, "label", event.target.value)}
                    placeholder="Label (e.g. Book a shoot)"
                    className="w-32 shrink-0 rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:border-ring"
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
                onClick={() => setExternalLinks((current) => [...current, { label: "", url: "" }])}
              >
                <PlusIcon className="size-4" />
                Add link
              </Button>
            </div>
            {externalLinks.length > 1 && (
              <p className="mt-1 text-xs text-muted-foreground">
                Only the first link shows in full — the rest are summarized as &quot;and N more&quot;,
                same as real Instagram.
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Bio pills</label>
            <div className="flex flex-col gap-2">
              {pills.map((pill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    value={pill}
                    onChange={(event) => updatePill(index, event.target.value)}
                    placeholder="e.g. 🔍 in real time"
                    className="flex-1 rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:border-ring"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => removePill(index)}
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
                onClick={() => setPills((current) => [...current, ""])}
              >
                <PlusIcon className="size-4" />
                Add pill
              </Button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Highlights</label>
            <div className="flex flex-col gap-2">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="flex items-center gap-2">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-secondary">
                    {(highlight.previewUrl ?? highlight.coverSrc) && (
                      <Image
                        src={highlight.previewUrl ?? highlight.coverSrc!}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                  <input
                    value={highlight.label}
                    onChange={(event) => updateHighlight(highlight.id, event.target.value)}
                    placeholder="Label"
                    className="w-24 shrink-0 rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:border-ring"
                  />
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(event) => handleHighlightCoverChange(highlight.id, event)}
                    className="flex-1 text-xs"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => removeHighlight(highlight.id)}
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
                onClick={() =>
                  setHighlights((current) => [...current, { id: crypto.randomUUID(), label: "" }])
                }
              >
                <PlusIcon className="size-4" />
                Add highlight
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
