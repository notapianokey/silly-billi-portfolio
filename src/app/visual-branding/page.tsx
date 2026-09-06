import { redirect } from "next/navigation";

/**
 * The Instagram-clone explore/index page is deferred (client's call — brand subpages come
 * first). Until it exists, land visitors straight on the first perfected template so the
 * sidebar's existing /visual-branding link keeps working.
 */
export default function VisualBrandingPage() {
  redirect("/visual-branding/evan-thomsen");
}
