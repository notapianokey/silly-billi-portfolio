/**
 * Shares a page on this site: the native share sheet where supported (mobile browsers, some
 * desktop ones), falling back to copying the link to the clipboard everywhere else. Never falls
 * back to the clipboard after a user-initiated cancel of the native share sheet — that's a
 * deliberate choice, not a missed case, so cancelling doesn't silently also copy the link.
 */
export type ShareResult = "shared" | "copied" | "cancelled" | "unsupported";

export async function shareLink(path: string, title: string): Promise<ShareResult> {
  const url = new URL(path, window.location.origin).toString();

  if (navigator.share) {
    try {
      await navigator.share({ url, title });
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
      // Real failure (not a user cancel) — fall through to the clipboard as a backup.
    }
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return "copied";
    } catch {
      // Permission denied, insecure context, unfocused document, etc. — nothing more we can do.
    }
  }

  return "unsupported";
}
