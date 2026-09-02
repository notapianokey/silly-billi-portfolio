@AGENTS.md

# Silly Billi Studio — Portfolio Website

## What this project is

A public GitHub portfolio site for a creative agency ("Silly Billi Studio" — renamed from
"Silly Billi Agency" partway through the build; the brand text was updated site-wide, this repo
title included) covering four
disciplines: Video Editing, Visual Branding, Editorial Direction, and Marketing & Ads. The
repo is public and doubles as an engineering showcase — code must read as clean, typed,
modular, and intentional, not a prototype.

**Core creative concept:** each discipline's work is not shown on a generic portfolio grid.
It's shown *inside a pixel-accurate clone of the real platform UI* where that kind of work is
actually consumed — video edits inside a YouTube shell, visual branding inside an Instagram
profile shell, marketing results inside an analytics dashboard shell, editorial/scripting work
inside a Google Docs shell. The clones should be as visually faithful as reasonably achievable
(exact-feeling layout, spacing, iconography, chrome) — this is a deliberate creative choice,
confirmed by the client, not a placeholder to be softened. Do not water this down into a
"YouTube-inspired" card layout — the point is that it reads as the real thing at first glance.

## Tech stack & constraints

- **Framework:** Next.js (App Router, `src/` directory), Static Site Generation (SSG).
- **Language:** TypeScript, strictly typed, no `any` unless truly unavoidable.
- **Styling:** Tailwind CSS v4 (already configured via `@import "tailwindcss"` in
  `src/app/globals.css`) — the expected default unless a specific clone target makes another
  approach clearly better.
- **Hosting:** Vercel Hobby tier — must stay $0/month. No paid add-ons, no server-side DB.
- **Data layer:** all content (video metadata, client profiles, campaign stats, doc content)
  lives in local static TS/JSON files (e.g. `src/config/portfolio.ts`, created when the first
  page that needs it is built), imported at build time. No live database calls, no runtime API
  fetches for content. This is what keeps load time near-instant and cost at $0 — don't
  introduce a CMS or database later without discussing it.
- **Important:** this Next.js version may postdate this model's training data — breaking API
  changes are possible. `AGENTS.md` (imported above, auto-maintained by `next dev`) points at
  `node_modules/next/dist/docs/` for the version-matched docs. Check there before assuming an
  API/convention from memory, especially for anything App-Router-routing-related.
- **Real client content stays out of git entirely** — client's explicit call. Raw folders the
  client drops into the project root (video masters, brand kits, PDFs, carousels) are
  git-ignored (see `.gitignore`) and must stay that way. When a page needs something from one
  of these folders, generate/copy a *derived, web-ready* asset into `public/` (e.g. a small
  extracted thumbnail via `ffmpeg`) — never move or delete the source folder itself. The client
  needs these folders to stay exactly where they put them, visible, after you're done using
  them.
- **Don't process a newly-dropped content folder on your own initiative.** When the client
  drops a new folder into the project root, leave it alone until they explicitly say what it's
  for and what to do with it — noticing it and asking is fine, building against it isn't.

## Working style directive (for Claude)

Before scaffolding or writing non-trivial UI (a new page shell, a new interactive component),
do a quick search for existing open-source implementations or component registries first —
e.g. shadcn/ui, Tremor, fancycomponents.dev, ui-layouts.com, Tiptap/BlockNote/Plate.js, or
existing "X-clone-react" repos on GitHub for the platform being cloned. Reuse/adapt rather than
building from scratch, and prefer well-maintained, permissively-licensed sources. Skip this
research step for small, obvious edits (styling tweaks, copy changes, wiring props) — it's for
new components/pages, not every diff.

## Repo state

Phase 0 (Next.js scaffold), Phase 1 (homepage), and Phase 2 (Video Editing page) are done. See
`BUILD_SEQUENCE.md` for the full phased plan and current progress — keep its checkboxes up to
date as phases complete.

Structure in use:
- `src/app/` — routes (App Router). `src/app/page.tsx` is the homepage,
  `src/app/video-editing/page.tsx` is the YouTube clone.
- `src/components/` — shared React components (e.g. `cursor-trail.tsx`).
- `src/components/ui/` — shadcn/ui primitives (Badge, Dialog, Tabs, Button, Skeleton, Scroll
  Area, `lib/utils.ts`'s `cn` helper). Initialized because the reference repos for platform
  clones are themselves typically shadcn-based — add more via `npx shadcn@latest add <name>`
  rather than hand-rolling primitives shadcn already covers well (dropdowns, tooltips, etc.).
- `src/components/youtube/` — Video Editing page components (top header, category pills,
  video/short cards, thumbnail, watch modal).
- `src/lib/` — non-component helper/data modules (e.g. `cats.ts`, `videos.ts`).
- `public/cats/` — source images for the homepage cursor trail array.
- `public/brand/` — real Silly Billi brand assets (`logo.png`, `mascot.png`) not yet wired
  into any page.

**Theme note:** `globals.css`'s dark-mode tokens apply via `@media (prefers-color-scheme:
dark)`, not a manual `.dark` class toggle — there's no theme switcher UI in this project.
Follow that pattern (don't add a `dark` class toggle without discussing it first).

**Reference-repo workflow:** when the brief names example repos for a clone target, verify
they actually exist before relying on them — the ones named for the YouTube clone
(`youtube-clone-react`, `patel-viral/youtube-clone`) turned out not to exist. Search GitHub
for real, well-matched repos (same stack ideally: Next.js + TypeScript + Tailwind/shadcn),
clone into the scratchpad to read for structure/patterns, and build our own version informed
by them — don't copy wholesale (reference repos are typically full apps with auth/DB/backend
we don't want).

The original repo directory contained an unrelated generic HTML/CSS/JS portfolio template
("Colin Gridley") — that was discarded entirely except two real Silly Billi brand assets
(mascot illustration, wordmark logo), which were kept and moved into `public/brand/`.

## Homepage (`src/app/page.tsx`, `src/components/cursor-trail.tsx`) — done

- Centered, bold display-type headline reading "Silly Billi Studio" (Bricolage Grotesque via
  `next/font/google`, exposed as the `--font-display` CSS variable / `font-display` Tailwind
  font family).
- Cursor Image Trail: tracks pointer position via a single `pointermove` listener on `window`
  (Pointer Events API — unifies mouse/touch/pen, no separate touch handling needed). Every
  30–50px (randomized per spawn) of movement, spawns a cat image from `CAT_IMAGES`
  (`src/lib/cats.ts`) at the pointer position with random rotation (-12°/12°), which then
  scales down and fades out over 0.8s via the `cat-trail-fade` keyframe in `globals.css`, then
  unmounts. Capped at 40 concurrent images.
- Touch: works the same way — `pointermove` fires during touch-drag. The homepage `<main>` has
  `touch-none` (touch-action: none) so the browser doesn't hijack the drag as a scroll gesture
  instead of firing pointer events. If a future page needs to scroll on touch, don't apply
  `touch-none` globally — scope it to whatever region actually needs the trail.
- `CAT_IMAGES` (`src/lib/cats.ts`) holds 18 real cat photos (`public/cats/cat-01.jpg` …
  `cat-18.jpg`), picked at random per spawn. More can be added by dropping a file in and
  adding one import + array entry — no other code changes needed.
- No nav pills yet (deferred to Phase 3, once the Video Editing page exists to link to).

## Video Editing page (`/video-editing`) — done

Clone of the YouTube desktop web UI, populated with placeholder editing-work data (real
client content still needed — see Open decisions).

- **Top header** (`top-header.tsx`): logo, split rounded search bar with a tag-suggestion
  dropdown (`#podcast`, `#documentary`, `#shorts`, etc. from `SEARCH_TAG_SUGGESTIONS`).
- **Category pills row** (`category-pills.tsx`, sticky under header): All | Talking Head |
  Vlogs | Commercial | Short Form, shadcn Badge with default/secondary variant swap for
  selected state.
- **Main content — dual grid:**
  - 16:9 long-form video grid (`video-card.tsx` + `video-thumbnail.tsx`), duration badge,
    hover play-icon overlay.
  - Horizontal "Shorts" shelf (`shorts-shelf.tsx`) of vertical 9:16 cards, scrolls independently.
- **Click action** navigates to a real watch page (see "Dedicated watch page" below) — player,
  chapter list, tag chips, expandable description panel. **No Raw Footage / Final Cut
  toggle** — client's explicit call: every project is a final cut, there's no raw-footage
  concept in this portfolio, so don't reintroduce that tab split.
- Data lives in `src/lib/videos.ts` + `src/lib/videos.data.json` (`VIDEO_PROJECTS`,
  `SHORT_PROJECTS`, category/tag constants, `formatDuration`/`formatViews` helpers).
- Thumbnails and playback are populated per-project as real content and links land (see "Real
  content + local edit UI" and "Real playback" below) — `VideoThumbnail` falls back to a
  gradient placeholder, and the watch pages fall back to a static poster, only when a given
  project genuinely has neither a thumbnail nor any playable source yet.
- Built after cloning `code-with-antonio/next15-youtube-clone` (real Next.js + shadcn YouTube
  clone) into the scratchpad for reference — see "Reference-repo workflow" above.
- **Second fidelity pass:** after the first build, compared directly against live
  youtube.com (Home/Discover feed and a watch page, at real desktop width) and closed the
  gaps found:
  - Added the persistent left icon sidebar (`sidebar-rail.tsx`, 240px, Home/Shorts/
    Subscriptions/You/History — only Home and Shorts actually navigate, the rest are
    decorative chrome since there's no real destination for them in a portfolio site).
  - Header now has the full chrome: hamburger icon, mic button beside search, "⋮" more icon,
    sign-in pill (all decorative except the layout/spacing, which is real).
  - Video cards now show a 36px channel avatar (the Silly Billi mascot — literally the
    agency's own "channel" branding) next to title/channel-name/views, with a separate
    hover-revealed "⋮" button, matching real YouTube's card hierarchy instead of cramming
    everything into two lines of plain text.
  - Shorts cards are full-bleed now with the title bottom-anchored in bold white over a
    gradient scrim (matches real Shorts thumbnails), not centered on a flat gradient.
  - Watch modal now separates title → (avatar + channel name + subscriber count + Subscribe)
    row → (like/dislike pill + Share) row, instead of one merged meta line, and the player
    placeholder has a decorative control-bar (progress bar, pause/volume icons, time,
    settings/fullscreen) for chrome fidelity even without real playback.
  - Measured real values used for fidelity: 56px header height (`h-14`), 240px sidebar
    (`w-60`), 36px card avatars — pulled via live DOM inspection of youtube.com, not guessed.
- **Third fidelity pass:** more gaps found by comparing again, this time also catching a
  shadcn/Tailwind trap:
  - **shadcn's `--radius` scale silently changes what `rounded-lg`/`rounded-xl` mean.**
    `globals.css` defines `--radius-lg: var(--radius)` (10px here) and
    `--radius-xl: calc(var(--radius) * 1.4)` (14px), not Tailwind's stock 8px/12px. Real
    YouTube uses exactly 8px (Shorts thumbnails) and 12px (grid thumbnails) — close enough to
    fool the eye into "something's off" without explaining why. Fixed by using arbitrary
    values (`rounded-[8px]`, `rounded-[12px]`) for these two specific cases rather than the
    semantic classes. **Lesson: when matching a measured pixel value from a live site in this
    project, verify the computed value in-browser — don't assume `rounded-lg`/`-xl` map to
    Tailwind's defaults, since shadcn's init already remapped them.**
  - Real Shorts cards are **2:3** aspect ratio, not 9:16 — and the title sits in a normal text
    block *below* the thumbnail (font-weight 500), not overlaid on the image with a gradient
    scrim. The overlay treatment was an invented placeholder-era design that never got
    corrected once real thumbnails landed; removed it.
  - Header rebranded to "Silly Tube" (was "Silly Billi Video") with the Silly Billi mascot as
    the icon mark, replacing the red YouTube play-icon square — client's explicit brand call,
    not a fidelity fix.
  - The `ditto` website-cloning MCP tool was tried for this pass (per client request) but its
    job queue appears globally stuck (jobs for youtube.com sat "queued" for the whole
    session, alongside many other users' also-queued jobs) — fell back to direct live-browser
    DOM inspection (computed styles, bounding rects, outerHTML) via the Browser pane, which is
    what actually produced the precise pixel values above.
- **Dedicated watch page, not a modal.** Original brief spec said "Watch modal/overlay" and
  that's what was built first — but the client's actual priority ("from day one") was a real
  YouTube-style watch *page*: its own URL, player, title/description, and an "Up next"
  recommended sidebar of the other videos. Rebuilt around `src/app/video-editing/watch/[id]/
  page.tsx` (`VideoCard` now `<Link>`s here instead of opening a dialog); `watch-modal.tsx` was
  deleted, superseded by this page.
  - **Shorts get their own dedicated page too** (`src/app/video-editing/shorts/[id]/page.tsx`,
    matching real YouTube's `/shorts/{id}`) — confirmed by live-inspecting an actual YouTube
    Shorts page rather than assuming: it's a *different* layout from the long-form watch page,
    not a smaller version of it. Centered vertical card (embed or thumbnail-as-poster), a
    right-side circular action rail (Like/Share/View-on-X/Edit), prev/next chevrons instead of
    an "Up next" sidebar, and channel+caption overlaid on the video itself via a bottom scrim
    rather than laid out below it. The original `short-watch-dialog.tsx` (a small popup) was
    wrong and got replaced by this — don't reintroduce a modal for Shorts.
- **Real content + local edit UI:** the client dropped real footage into
  `VIDEO EDITING PAGE CONTENT/` (13 files, 11GB — git-ignored, see above). Ran `ffprobe`/
  `ffmpeg` once to pull duration + a representative frame (resized, ~20-100KB JPG) per video
  into `public/videos/thumbnails/`, and rebuilt `VIDEO_PROJECTS`/`SHORT_PROJECTS` around those
  13 real projects (2 landscape → long-form grid, 11 portrait → Shorts shelf) instead of the
  earlier 6 fabricated placeholder entries.
  - Video content data now lives in `src/lib/videos.data.json` (plain JSON, not hardcoded in
    `videos.ts`) specifically so it's editable — `videos.ts` just imports and re-exports it
    typed.
  - **Edit UI** (`edit-video-dialog.tsx`, a pencil-icon button on every card and in the Watch
    modal): lets the client set title/description and replace the thumbnail without touching
    code. Saves via `PATCH /api/dev/videos` (`src/app/api/dev/videos/route.ts`), which writes
    directly to `videos.data.json` and `public/videos/thumbnails/` on disk.
  - **This only works when running `npm run dev` locally** — there's no database by design
    (see Tech stack), and Vercel's deployed filesystem is read-only, so the route fails
    gracefully there with a clear message. This is a local content-authoring tool, not a live
    CMS: the client edits locally, then the resulting `videos.data.json`/thumbnail changes get
    committed and pushed like any other change (they're just small JSON/JPGs, not the raw
    client media itself, so this doesn't conflict with the "no real content in git" rule
    above).
  - **Real playback — solved for every project.** Two possible sources, and **`videoUrl` (self-
    hosted) always wins over `sourceUrl` (platform embed) when both exist** — the client
    explicitly wants the native player, not a platform-branded embed widget, whenever we
    actually have the footage. `getEmbedInfo(sourceUrl)`/embeds are the fallback for when there's
    a public link but no local source file at all.
    - **`videoUrl` (preferred):** self-hosted via **Vercel Blob** (a store named
      `sillybillistudio-blob`, Public access, connected to this project — client set it up
      through the Vercel dashboard, not something to recreate). `scripts/upload-video-clips.mjs`
      compresses each source file with `ffmpeg` (H.264, scaled to cap 720px / 640px for the
      longest pieces, ~CRF 28-30, AAC audio, faststart) and uploads it with `@vercel/blob`,
      writing the resulting public URL into that entry's `videoUrl`. The watch pages render a
      plain `<video src={videoUrl} controls>` first, before ever checking for an embed. Free
      tier is 1GB storage — compression settings were chosen to fit well within that even as
      more local content gets added (23 clips so far, ~160MB total); re-check the budget before
      adding a lot more.
    - **`sourceUrl` (fallback only):** `src/components/youtube/social-embed.tsx` renders the
      platform's own free public embed (YouTube iframe, or Instagram's official embed.js
      widget) — only actually shown in the player when there's no local source file to
      self-host instead. Regardless of which one plays, `sourceUrl` (if set) still always
      drives the separate "View on [Platform]" link/button.
    - Run the script locally: `node --env-file=.env.local scripts/upload-video-clips.mjs` (needs
      `BLOB_READ_WRITE_TOKEN` in `.env.local`, from `vercel env pull .env.local` — the token is
      scoped to Production/Preview/**Development** on purpose, since local runs use the
      Development scope). Its `FILES` map lists every entry that has a local source file
      regardless of whether it also has a `sourceUrl`; it skips entries that already have a
      `videoUrl` (idempotent reruns), not entries that have a `sourceUrl`. Add new entries to
      `FILES` as new local-only content shows up.
- **`sourceUrl` — link to the real posted video, and the periodic view-count refresh
  workflow.** Every `VideoProject`/`ShortProject` has an optional `sourceUrl` (editable via the
  same local edit UI, next to title/description). Two things it drives:
  - **"View on [Platform]" button** (`getPlatformLabel()` in `videos.ts` detects YouTube/
    Instagram/TikTok/etc from the URL's host): on the Watch modal for long-form, and directly
    on the card for Shorts (which have no detail view to put it in). Renders nothing when
    `sourceUrl` is unset.
  - **View counts are refreshed manually, on request only — never live-fetched.** Explicit
    client decision: no client-side calls to YouTube/Instagram/TikTok on page load (works
    against the site's speed priority, and there's no backend to proxy it through anyway).
    Instead: whenever the client asks (expected cadence: roughly every 2-3 months), go look up
    the current view count at each entry's `sourceUrl` (YouTube's oEmbed/page data is
    scrapeable without an API key; Instagram/TikTok are harder and may need manual entry) and
    write the refreshed number directly into `views` in `videos.data.json`, then commit+push.
    Do not build this as an automated/scheduled job — it's a manual, client-triggered action.
- **Zero-view display labels — `getViewsLabel()` in `videos.ts`.** A real "0 views" reads as a
  flop; for most zero-view entries the real story is "we have no way to trace this back to a
  live public post" (no `sourceUrl`), so the UI shows **"No longer publicly posted"** instead,
  everywhere views are rendered (video/short cards, the shorts shelf, both watch pages). Once a
  `sourceUrl` is added and a real view count fetched, the entry falls back to the normal
  `formatViews()` count automatically — the label is purely a function of `(views, sourceUrl)`,
  not a stored flag, so there's nothing to "undo" when a link gets added later. One hardcoded
  exception: the `main` long-form entry ("Intros for Live Podcasts") is a compilation of many
  different podcast intros, not a single posted piece, so a views count (real or "not posted")
  doesn't make sense for it — it always shows **"Varied Views"** instead, keyed off
  `video.id === "main"` at each of the 3 render sites (not worth a schema field for one entry).
- **Long-form "runtime" text removed** from the watch page's meta line (was
  `{views} · {duration} runtime`) — client's call: the duration is already visible live in the
  `<video>` control bar, so repeating it as text was redundant. Views label alone remains.
- **Shorts caption fully reworked to match the real youtube.com/shorts feed**, after live-DOM-
  inspecting it (not guessing): real Shorts show **only the title** in the overlay — clamped to
  **one line**, regular weight (not bold/medium), 14px, over a much fainter single-stop gradient
  (`black/40 → transparent`, not a heavy multi-stop scrim) — **no description text inline at
  all**. `src/app/video-editing/shorts/[id]/page.tsx` now matches this: title is a clamped
  single line with a chevron-down toggle (only rendered when `short.description` is set) that
  expands to reveal the full description on click, mirroring real YouTube's tap-to-expand
  behavior rather than always showing 2 lines of description under the title (the old,
  incorrect behavior).

## Site-wide navigation — sidebar rail (`sidebar-rail.tsx`)

The YouTube-clone's left sidebar (`src/components/youtube/sidebar-rail.tsx`, used across all
`/video-editing*` pages) doubles as the site's primary navigation, not just YouTube-shell
chrome — client's explicit call, matching the real YouTube sidebar's role as its actual nav
rather than decoration. Current structure, top to bottom:

- Home → `/video-editing` (the video feed itself — matches real YouTube's own "Home" meaning
  the content feed, not a marketing homepage; do not point this at `/`, that was already
  corrected once this session for the header logo for the same reason).
- Shorts → `/video-editing#shorts`, Long Form → `/video-editing#long-form` (both anchor into
  sections on the same page; `id="long-form"` wraps the long-form grid in
  `src/app/video-editing/page.tsx`, mirroring the pre-existing `id="shorts"` on `ShortsShelf`).
- Channels We've Monetized → `/channels-we-monetized` (renamed from "Channels We Managed" /
  `/channels-we-managed` — client's copy call, and the route moved to match). Real design now
  — see below — not a `ComingSoon` stub.
- About Us → `/about`.
- Our Services → an expand/collapse dropdown (local `useState`, chevron rotates open), not a
  link itself, containing: Video Editing (→ `/video-editing`, the only one of these four that's
  actually built), Visual Branding (→ `/visual-branding`), Editorial Direction (→
  `/editorial-direction`), Marketing & Ads (→ `/marketing-ads`) — the other three service pages
  are speced in full further down this file but not yet built.
- Hire Us → `/hire-us`, Join Us → `/join-us`.

**The remaining 3 not-yet-built destinations render a shared placeholder**,
`src/components/coming-soon.tsx` (mascot image, page title in the display font, "coming soon"
copy, a link back to `/`) — used by `src/app/{visual-branding,editorial-direction,
marketing-ads}/page.tsx`. This exists purely so the new nav doesn't 404; swap each one out for
its real design/content as that phase actually gets built — don't leave a page on `ComingSoon`
once there's real content to put there instead. (`/about`, `/channels-we-monetized`, `/hire-us`,
and `/join-us` have real designs now — see below — the three discipline pages are still
pending.)

## Hire Us / Join Us pages (`/hire-us`, `/join-us`)

Real designed pages, not `ComingSoon` stubs — client asked for both to be designed considering
"common info usually mentioned in such pages," in the site's own brand voice (not a platform
clone — these aren't modeled after any specific site, unlike the YouTube-shell pages). Both
keep the persistent `TopHeader`/`SidebarRail` chrome for nav consistency with the rest of the
site, matching the established "sidebar is the site's real nav, not just decoration" rule.

- **Hire Us:** hero + real stats (4000+ videos delivered, 6 channels monetized, 4 disciplines —
  reused from elsewhere, not re-invented), a services grid linking to the 4 discipline pages, a
  4-step "how it works" process (generic, editable), and a CTA.
- **Join Us:** hero, a "what it's like here" values grid, a "what we look for" list, and an
  **honest empty state for Open Roles** ("No open roles right now — check back soon", same
  pattern as the About page's "Show Reel will be uploaded soon") — there are no real job
  postings to show, so don't invent any.
- **Neither page has a real contact mechanism yet** (`/contact` — see below — isn't built, and
  there's no confirmed public email to publish). Both CTAs are honest about this ("A dedicated
  contact form is on its way") and link to `/about`, where the client's real social links will
  eventually live via `CHANNEL_PROFILE.socialLinks`. Don't invent a placeholder email address —
  wait for the real contact page or real social links.
- **About page's tab row now reads Home | Hire Us | Join Us**, not Home | Videos | Shorts —
  client's explicit call, repurposing the tab row as quick links to these two pages rather than
  mirroring real YouTube's Videos/Shorts sub-navigation (which was redundant with the sidebar's
  own Shorts/Long Form links anyway). The Videos grid and Shorts shelf *content* further down
  the About page are unchanged — only the tab row's links changed.
- **About page header stat is now "4000+ videos delivered"** (was "200+") — client's updated
  marketing copy, still intentionally decoupled from the actual portfolio count.

## Channels We've Monetized page (`/channels-we-monetized`) — YouTube search-results clone

Client-managed channels she's monetized for other creators, showcased as a mix of real channel
links, their top videos, and their top Shorts — styled like an actual YouTube search results
page (channel result card, video result rows, Shorts shelf), live-inspected against
youtube.com/results for structure (136px channel avatar, 16:9 video thumbnail rows with a
description snippet, Shorts shelf reusing the same fixed non-scrolling grid as the rest of the
site). **Every result is a real external link** (`target="_blank" rel="noopener noreferrer"`)
straight to the actual YouTube channel/video/short — clicking anything on this page leaves the
site entirely, by design; there's no internal watch page for this content.

- **Data:** `src/lib/monetized-channels.data.json` (+ `.ts` for types/export) — an array of
  `{id, name, handle, url, avatarSrc, subscriberLabel, description, topVideos[], topShorts[]}`.
  Currently **empty** (`[]`) — client said she'll provide the real channel links; do not invent
  channels, names, or stats. When she does, the intended workflow mirrors the view-count-refresh
  pattern elsewhere in this file: fetch real title/thumbnail/view-count data from each channel's
  actual YouTube page (manually, on request) rather than live API calls, and add entries to the
  JSON directly — no local edit UI was built for this page, since it's a one-time/occasional
  content population task rather than something the client edits piecemeal like video titles.
- **Empty state:** a dashed placeholder ("Channel links coming soon") renders when the array is
  empty, instead of 404-ing or falling back to the generic `ComingSoon` component.
- Components live in `src/components/monetized/` (`channel-result-card.tsx`,
  `video-result-row.tsx`, `shorts-result-shelf.tsx`) — kept separate from `src/components/youtube/`
  since this content isn't part of the Silly Billi Studio "channel" (our own video-editing
  portfolio), it's a directory of *other* channels.

## About Us page (`/about`) — YouTube channel-profile clone

Built as an actual YouTube channel page (banner, avatar, description, tabs, featured video,
video grid) rather than a generic "about" page — fits the site's core creative concept
directly, and the client asked for it explicitly. Live-inspected a real channel page (MrBeast's,
later cross-checked against Brooklyn Nine-Nine's and MKBHD's) for structure before building,
same practice as the other clones.

- **Second fidelity pass (client flagged it against a live screenshot):** the first build had
  the banner full-bleed with no border-radius, based on an earlier live-DOM measurement that
  turned out to only hold at narrow/mid viewport widths. Re-measured at a wide desktop viewport
  (1860px) and the banner is actually **inset from the page edges with 16px rounded corners**,
  holding a fixed **~6.2:1 aspect ratio** (`aspect-[31/5]`), capped at a max height — not
  full-bleed at all at realistic desktop widths. The inset is proportional (~8-10% padding on
  each side, scaling with viewport) and applies to the *entire* header column (banner, avatar,
  name, description, tabs), not just the banner — implemented as `px-[6%] lg:px-[8%]` on the
  page's `<main>`. Avatar bumped from 96–128px to a real-scale 160px (`sm:size-36 md:size-40`).
  **Lesson: a single live-DOM measurement at one viewport width isn't enough for a fluid layout
  — re-verify at multiple widths, especially after a client screenshot contradicts it.**
- Confirmed via live inspection that the red ring some channel avatars show is a **"LIVE"
  broadcast indicator only** (`ytSpecAvatarShapeLiveRing`), not a permanent avatar border style
  — checked a non-live channel (MKBHD) and its avatar has zero border/outline. Don't add a fake
  border to our own avatar chasing that; we're never "live."
- 160px circular avatar sits *below* the banner (not overlapping it).

- **Content:** featured video is the current highest-`views` entry from `VIDEO_PROJECTS`
  (currently the heroin-addiction documentary at 113K) computed at render time, not hardcoded —
  it'll naturally change as real view counts get refreshed. Every other long-form video renders
  below in a "More from Silly Billi Studio" grid via the existing `VideoCard` component (no
  Shorts on this page — kept deliberately separate from `/video-editing` rather than duplicating
  its full content).
- **No fabricated subscriber count.** Real YouTube shows "X subscribers"; this page
  intentionally omits it (shows only "@sillybillistudio · N videos") rather than inventing a
  vanity number — every other metric on this site is either real or an honest placeholder label
  (`getViewsLabel`), and a fake subscriber count would break that.
- **Local edit UI, same pattern as the video-editing content:** `src/lib/channel.data.json` (+
  `channel.ts` for types/export) holds `description`, `bannerSrc`, and `socialLinks: {label,
  url}[]`. `src/components/channel/edit-channel-dialog.tsx` + `src/app/api/dev/channel/route.ts`
  (PATCH, same local-only/try-catch-everything shape as `/api/dev/videos`) let the client edit
  all three herself, banner included, without touching code — same "no live CMS, edits happen
  locally then get committed" model documented above. Social links render as a full row of
  labeled pill buttons (not YouTube's real truncated "and N more links" popover) — deliberate
  deviation, since the whole point here is showcasing every link to a prospective client, not
  hiding most of them behind a click.
- Currently empty (`bannerSrc: ""`, `socialLinks: []`, default placeholder description) — client
  hasn't provided a real banner image or her actual social links yet. Do not invent them; wait
  for her to add them through the edit UI or ask for them directly, same as the "don't process
  new folders" / "don't invent monetized-channel content" rules elsewhere in this file.
- Featured-video slot is intentionally **empty** (dashed placeholder, "Show Reel will be
  uploaded soon") rather than auto-picking a video — client's explicit call, since a real edited
  show reel doesn't exist yet. All long-form videos (including whichever would've been
  "featured") live together in one `Videos` grid below it; don't reintroduce
  highest-views-wins auto-featuring without asking first.
- Header stat line reads a fixed **"4000+ videos delivered"** (updated from "200+" — see the
  Hire Us / Join Us section below), not a computed `VIDEO_PROJECTS.length` — client's explicit
  marketing copy, intentionally decoupled from the actual (much smaller) portfolio count.

## Shorts shelf — no horizontal scroll (`shorts-shelf.tsx`)

`ShortsShelf` (used on `/video-editing` and `/about`) originally had `overflow-x-auto` — client
called this "hideous" repeatedly and asked for a proper check against live youtube.com. Verified
via direct DOM inspection (through Claude in Chrome, on the client's own logged-in session,
since the sandboxed Browser pane kept landing on the wrong page): real YouTube's Shorts shelf
has **`display: flex; overflow-x: clip`** — literally no scroll mechanism. It shows a fixed
"shelf" of Shorts sized to whatever fits the row (not a draggable strip), and multiple such
shelves are interspersed between rows of regular videos throughout the same vertical feed, not
bundled into one shelf at the very bottom.

- `ShortsShelf` now renders a **wrapping CSS grid** (`grid-cols-3 sm:grid-cols-4 lg:grid-cols-5`,
  no `overflow-x`) instead of a horizontal-scroll flex row, and takes an optional `shorts` prop
  (defaults to all of `SHORT_PROJECTS`) plus an `anchor` prop so only one instance per page
  carries the `#shorts` id.
- `/video-editing` (`src/app/video-editing/page.tsx`) interleaves the feed to match the real
  pattern: `buildInterleavedFeed()` chunks `VIDEO_PROJECTS` into groups of 3 and
  `SHORT_PROJECTS` into groups of 5, alternating video-grid rows and Shorts shelves. Only
  applies to the unfiltered view (no category/search active) — filtering falls back to the
  plain flat video grid, same as before. Once one content type runs out (we only have 5
  long-form videos vs. ~17 Shorts) the remaining shelves of the other type just continue
  back-to-back — an honest reflection of the smaller content library, not a bug.
- **Shorts shelf heading icon is the mascot, not YouTube's red play-square** — same branding
  call as the "Silly Tube" header logo swap. `ShortsShelf`'s heading renders `/brand/mascot.png`
  in a small rounded-square badge with a white play-triangle overlaid for the "play button"
  affordance, instead of the generic red YouTube Shorts glyph.

## Thumbnail image quality (`next.config.ts`, `video-thumbnail.tsx`)

Client reported a documentary thumbnail looking blurry. The source file itself was sharp
(1600×900, verified directly) — the actual cause: **Next.js 16 changed the default
`images.qualities` allowlist to `[75]` only**, so a component-level `quality={90}` was being
silently coerced back down to 75 (confirmed via the installed version's own docs in
`node_modules/next/dist/docs/`, per the versioning note at the top of this file — this is
exactly the kind of breaking change that note warns about). Fixed by adding
`images: { qualities: [75, 90, 100] }` to `next.config.ts` and setting `quality={90}` on the
`<Image>` in `video-thumbnail.tsx` (the shared component behind every video/short card site-wide,
so this fixes it everywhere, not just the one thumbnail that got reported). A `next.config.ts`
change needs a full dev server restart (not just HMR) to take effect.

## Search — tags-driven, covers Shorts too (`video-editing/page.tsx`, `edit-video-dialog.tsx`)

Original search only matched a video's title/tags substring, and never touched Shorts at all —
weak, since `tags` was empty on almost everything. Reworked:

- **`matchesQuery()`** splits the search box into words (whitespace-separated, leading `#`
  stripped) and requires every word to appear somewhere in the title or tags array — so
  multi-word searches like "split screen podcast" work even if the words aren't adjacent or in
  that order in the title.
- **Shorts are now searched too** (`ShortProject.tags: string[]` added), not just filtered by
  category/language. `filteredShorts` in `video-editing/page.tsx` applies the same
  category-or-language check *and* the same query match as `filteredVideos`.
- **Tags are editable per-project** via `EditVideoDialog` (pencil icon) — a comma-separated
  input plus a row of clickable suggestion chips from `SUGGESTED_TAGS` in `videos.ts` (a
  starting vocabulary of edit-type/style tags — freeform, not an enforced enum, so any tag can
  still be typed by hand). Persisted through the same `/api/dev/videos` PATCH route as
  everything else. Tags currently sit mostly empty — the client is populating them herself
  using this vocabulary; don't invent tags for her.
- **`EditVideoDialog`'s body needed `max-h-[70vh] overflow-y-auto`** once the Category/
  Language/Tags fields were added — before that fix the dialog could grow taller than the
  viewport with no way to scroll, making Save/Cancel unreachable. Same pattern as
  `EditChannelDialog` already used.
- **Removed the non-functional mic button** from `TopHeader` — real YouTube chrome, but there
  was no speech-to-search wired up behind it, so it was dead decoration.

## Contact page (`/contact`) — planned, not yet built

- **Book a call:** a plain link/button to Calendly (or a free alternative like Cal.com) that
  opens in a new tab. Deliberately **not** an embedded/inline widget — an embed loads a
  third-party iframe/script on every page view, and the client's top priority for this site is
  raw speed. A link costs nothing until clicked. Revisit only if explicitly asked for the
  inline embedded experience instead.
- **Contact form → Google Sheet, no database:** the form posts to a Next.js Route Handler
  (`src/app/api/contact/route.ts`, a serverless function that only runs on submit — zero
  impact on page load/SSG) which forwards the payload to a **Google Apps Script Web App**
  bound to a Google Sheet in the client's own Google account. This is the standard free,
  no-backend way to get form data into Sheets: no paid service, no database, no API key
  baked into the codebase (the client deploys the Apps Script themselves and provides the
  resulting webhook URL, stored as a Vercel env var, e.g. `CONTACT_SHEET_WEBHOOK_URL`).
- Client explicitly prioritizes site speed above all else for this page and the site
  generally — don't introduce anything (eager third-party embeds, client-side SDKs loaded on
  every route, etc.) that adds to initial page weight without a clear ask.

## Future: campaign landing pages & live A/B testing — reserved, not built yet

Client's stated goal: later run paid + organic acquisition campaigns with dedicated landing
pages, and live-split traffic across variants (real A/B testing, not just "look at a few
designs"). They want this to be possible later **without any rework of what's built now** —
this section exists so that plan is captured and consistent, not because anything below needs
building today.

- **Routing convention (reserved):** campaign/landing-page variants will live under
  `/lp/[slug]` (or similar dedicated namespace) — kept separate from the 4 real service pages
  and homepage so there's zero collision risk whenever this starts.
- **Live traffic-splitting mechanism (when needed):** Vercel Edge Middleware
  (`middleware.ts`) with a `matcher` scoped to `/lp/:path*` only — buckets a visitor into a
  variant via cookie, then rewrites (not redirects, to keep the URL stable for ad
  tracking/UTMs) to the chosen variant. Because the matcher is scoped, this cannot affect the
  performance or behavior of any existing page (homepage, the 4 service pages, contact) when
  it's added — it's additive, not a restructure.
- **Not needed now:** no routes, middleware, or analytics wiring for this exist yet. Don't
  scaffold `/lp/` or `middleware.ts` speculatively — build it when there's an actual campaign
  to run.

## Other service pages (later phases — full spec for reference)

### Visual Branding (`/visual-branding`) — Instagram profile clone
Client profiles (e.g. "The Thomsen Company") with avatar, bio, follower/post stats, tab bar
(Posts / Reels / Tagged), and a 3-column post grid. Carousel posts for tactile/physical asset
breakdowns (e.g. a multi-slide chess-set project: final piece → concept sketches → inspiration
cards → manufacturing process, with deep-dive caption). Reel/video posts for transformations
like thumbnail overhauls. Click opens an Instagram-style modal with multi-slide carousel +
caption. Reference: `instagram-web-clone-react` or similar Tailwind Instagram clones.

### Marketing & Ads (`/marketing-ads`) — Analytics dashboard clone
Resembles Meta Ads Manager / Google Analytics. Date range picker, filter dropdown, KPI cards
up top (impressions, CTR, conversion multiplier — with % change indicators), and a campaign
performance table below. Clicking a row expands to show audience breakdowns, ad copy
variations, creative sets, and funnel strategies. Reference: shadcn/ui dashboard example,
shadcn-admin, or Tremor (tremor.so) for metric cards, expandable data tables, date pickers.

### Editorial Direction (`/editorial-direction`) — Google Docs workspace clone
File/app bar (File, Edit, View, Tools, doc title, blue Share button). Collapsible left outline
drawer navigating sections (Strategy, Two-Column Script, Set Specs). Centered "paper" document
canvas. Interactive right-margin comments — clicking highlighted script text opens a
proof-of-work popover with embedded shot samples. Reference editor frameworks: Tiptap
(tiptap.dev), BlockNote, or Plate.js — these provide the Docs-style canvas, sticky outline,
floating toolbar, and margin comment threads largely out of the box; don't build a rich-text
engine from scratch.

## Deferred / explicitly not-now

- **Mobile responsiveness:** desktop is the current priority. A simplified mobile view is
  wanted, but not yet — don't spend time on responsive breakpoints until asked, but don't
  write markup that would be painful to make responsive later either.
- **Nav pills** (4 buttons homepage → service pages): deferred to Phase 3.

## Open decisions / not yet specified

- Real client content beyond "The Thomsen Company" example (needed for Visual Branding and
  others) — placeholder/lorem content is fine until real assets are provided.
- Mobile layout approach per page (deferred).

## Category pills — content-type + language, one flat list (`videos.ts`, `category-pills.tsx`)

Client-specified taxonomy, replacing the earlier placeholder categories (Commercial and Short
Form are gone — Short Form was a dead filter that never navigated anywhere, redundant with the
sidebar's real Shorts link):

- **Content-type** (`VideoCategoryId`): `talking-head` | `vlogs` | `documentary`. Client's exact
  classification: **Vlogs = only** the football-challenge video. **Documentary = only** the
  heroin-addiction piece. **Talking Head = everything else, including every Short** — all 18
  Shorts are tagged `talking-head`. The `main` entry ("Intros for Live Podcasts") intentionally
  has **no** `category` (optional field) since it's a compilation that doesn't fit any of the
  three — it only shows under "All".
- **Language** (`LanguageId`): `english` | `other-languages`. Best-effort classification from
  available evidence (burned-in captions visible in thumbnails/clips, description text, source
  channel context) — **not verified against every clip**, since that would mean re-watching all
  22 pieces. The `EditVideoDialog` now has Category/Language `<select>` fields (persisted via
  the same `/api/dev/videos` route) specifically so the client can correct any she disagrees
  with — check with her before assuming these are all correct.
- **One flat pill list, single-select**, mixing both dimensions (`PILL_CATEGORIES` in
  `videos.ts` = content-type pills + language pills, in that order) — a Talking Head English
  short can only be found under one pill at a time, same as real YouTube's own category pills
  (also a flat, non-faceted tag list). `matchesPill()` in `video-editing/page.tsx` checks a
  pill id against either `.category` or `.language`.
- **Pills filter Shorts too, not just long-form videos** — this is the reason Shorts needed
  `category`/`language` fields added at all. Selecting a pill shows matching long-form videos
  in the grid *and* matching Shorts in a `ShortsShelf` below (not interleaved — interleaving is
  only for the fully-unfiltered "All" view). The search box still only filters long-form videos
  (unchanged behavior) — Shorts either show unfiltered (search empty) or not at all (search
  active), same as before this change.
- **The `#shorts`/`#long-form` sidebar anchors must always resolve to *something*** regardless
  of filter/search state, or the sidebar Shorts/Long Form links silently do nothing (this was
  reported as "broken"). `video-editing/page.tsx` guarantees this: `id="long-form"` always
  wraps the main content area, and an empty `<section id="shorts">` renders as a fallback
  whenever there's no actual Shorts content to show (a filter with zero matches, or an active
  search) — don't remove that fallback even though it looks like dead markup.
