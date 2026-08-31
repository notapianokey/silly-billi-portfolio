@AGENTS.md

# Silly Billi Agency — Portfolio Website

## What this project is

A public GitHub portfolio site for a creative agency ("Silly Billi Agency") covering four
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

## Working style directive (for Claude)

Before scaffolding or writing non-trivial UI (a new page shell, a new interactive component),
do a quick search for existing open-source implementations or component registries first —
e.g. shadcn/ui, Tremor, fancycomponents.dev, ui-layouts.com, Tiptap/BlockNote/Plate.js, or
existing "X-clone-react" repos on GitHub for the platform being cloned. Reuse/adapt rather than
building from scratch, and prefer well-maintained, permissively-licensed sources. Skip this
research step for small, obvious edits (styling tweaks, copy changes, wiring props) — it's for
new components/pages, not every diff.

## Repo state

Phase 0 (Next.js scaffold) and Phase 1 (homepage) are done. See `BUILD_SEQUENCE.md` for the
full phased plan and current progress — keep its checkboxes up to date as phases complete.

Structure in use:
- `src/app/` — routes (App Router). `src/app/page.tsx` is the homepage.
- `src/components/` — shared React components (e.g. `cursor-trail.tsx`).
- `src/lib/` — non-component helper/data modules (e.g. `cats.ts`).
- `public/cats/` — source images for the homepage cursor trail array.
- `public/brand/` — real Silly Billi brand assets (`logo.png`, `mascot.png`) not yet wired
  into any page.

The original repo directory contained an unrelated generic HTML/CSS/JS portfolio template
("Colin Gridley") — that was discarded entirely except two real Silly Billi brand assets
(mascot illustration, wordmark logo), which were kept and moved into `public/brand/`.

## Homepage (`src/app/page.tsx`, `src/components/cursor-trail.tsx`) — done

- Centered, bold display-type headline reading "Silly Billi Agency" (Bricolage Grotesque via
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

## Video Editing page spec (`/video-editing`) — next up, current priority

Pixel-accurate clone of the YouTube desktop web UI, populated with this agency's video editing
work instead of real YouTube content.

- **Top header:** search bar, pre-loaded/suggested with tag filters relevant to the work
  (e.g. `#podcast`, `#documentary`, `#shorts`).
- **Category pills row** (sticky under header): All | Talking Head | Vlogs | Commercial |
  Short Form (adjust categories to match real portfolio content once known).
- **Main content — dual grid:**
  - 16:9 long-form video grid (thumbnail + title), matching YouTube's card grid layout.
  - A horizontal "Shorts" shelf of vertical 9:16 videos, styled like YouTube's Shorts shelf.
- Hover-to-play behavior on thumbnails where feasible (short muted preview loop or scrub).
- **Click action:** opens a YouTube-style "Watch" modal/overlay containing:
  - Video player, chapter markers, project description.
  - A toggle to switch between "Raw Footage" and "Final Cut" for that project.
- Reference repos for structure: `youtube-clone-react` (freeCodeCamp), `patel-viral/youtube-clone`,
  or similar — for the flexbox/grid structure, category pill bar, and video card components.
  Live YouTube.com desktop layout is the visual source of truth for spacing/chrome fidelity.

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
- Exact category taxonomy for the Video Editing page pills.
- Mobile layout approach per page (deferred).
