# Build Sequence — Silly Billi Agency Portfolio

Phased plan, most important work first. Each phase has a goal, concrete tasks, and a
"done when" check. See `CLAUDE.md` for full UI specs and constraints — this doc is
sequencing only, not spec detail.

---

## Phase 0 — Project setup

**Goal:** replace the current plain HTML/CSS/JS starter with a real Next.js foundation.

- [x] Scaffold Next.js (App Router, TypeScript, Tailwind) in the project root.
- [x] Remove/retire the existing `index.html`, `css/style.css`, `js/script.js` (throwaway
      static starter — not part of the Next.js build). Two real brand assets (mascot, logo)
      were kept and moved to `public/brand/`; everything else discarded.
- [ ] Set up `src/config/portfolio.ts` (or similar) as the single static data source pattern
      to be used by every page — deferred until the Video Editing page needs real data (Phase 2).
- [x] Basic repo hygiene for a *public* repo: real README added. (License left out —
      revisit if desired.)
- [x] Pushed to GitHub: [notapianokey/silly-billi-portfolio](https://github.com/notapianokey/silly-billi-portfolio)
      (public). Connected to Vercel (Hobby tier) — every push to `main` auto-deploys.
      **Live at https://sillybillistudio.vercel.app.**

**Done when:** `next dev` runs, a blank page deploys successfully to Vercel Hobby, TypeScript
strict mode is on with no errors.

---

## Phase 1 — Homepage

**Goal:** hero headline + working Cursor Image Trail, desktop-first, touch-capable.

- [x] Build hero section: centered "Silly Billi Agency" display headline.
- [x] Source cat images into `/public/cats/` — 18 real cat photos provided and wired in.
- [x] Implement/adapt the Cursor Image Trail component using the Pointer Events API so it
      works on both mouse and touch (hand-rolled, no extra dependency — see
      `src/components/cursor-trail.tsx`).
- [x] Tune spawn distance (30–50px), rotation range (-12°/12°), scale-down + fade timing
      (~0.8s) to match spec.
- [x] Sanity-check performance: capped at 40 concurrent spawned images.
- [x] Verified in-browser: trail spawns correctly on pointer movement (rotation, scale-down,
      fade all match spec), layout holds at a mobile viewport width. Since the Pointer Events
      API is what makes this touch-compatible in the first place, this should carry over to
      real touch devices — but it's still worth a quick check on an actual phone before launch.
- [x] No nav pills yet — homepage is just headline + trail for this phase.

**Done when:** homepage is deployed, cursor trail feels good on desktop and works on touch,
no console errors, no major layout shift.

---

## Phase 2 — Video Editing page (`/video-editing`) — flagship page

**Goal:** pixel-accurate YouTube UI clone, populated with placeholder or real editing work.

- [ ] Research/pull structure from `youtube-clone-react` or similar reference repos before
      hand-building the grid/pill/card components.
- [ ] Build top header: search bar with tag-filter styling.
- [ ] Build sticky category pills row.
- [ ] Build long-form 16:9 video grid (thumbnail, title, card hover states).
- [ ] Build horizontal Shorts shelf (vertical 9:16 cards).
- [ ] Implement hover-to-play preview behavior on thumbnails.
- [ ] Build the Watch modal/overlay: player, chapter markers, description, Raw Footage vs.
      Final Cut toggle.
- [ ] Populate with placeholder project data via the static data layer (`config/portfolio.ts`).
- [ ] Visual QA against live YouTube.com desktop layout side-by-side for spacing/chrome fidelity.

**Done when:** page is indistinguishable from YouTube at a glance on desktop, all click
interactions (thumbnail → modal, raw/cut toggle) work, deployed and linkable at
`/video-editing`.

---

## Phase 3 — Homepage nav pills

**Goal:** wire the homepage to the service pages.

- [ ] Add the 4 nav pill buttons below the hero, styled per original spec.
- [ ] Link to `/video-editing`, `/visual-branding`, `/editorial-direction`, `/marketing-ads`
      (the latter three can 404 or be stubbed until their phases land).

**Done when:** all 4 pills render and route correctly (even if some destinations are stubs).

---

## Phase 4 — Visual Branding page (`/visual-branding`) — Instagram clone

- [ ] Research `instagram-web-clone-react` or similar before building.
- [ ] Profile header: avatar, handle, bio, follower/post stats.
- [ ] Tab bar: Posts / Reels / Tagged.
- [ ] 3-column post grid.
- [ ] Carousel post modal (multi-slide) — build out "The Thomsen Company" chess-set case
      study as the first real example (final piece → sketches → inspiration cards →
      manufacturing, with deep-dive caption).
- [ ] Reel/video post type for transformation case studies (e.g. thumbnail overhauls).

**Done when:** at least one full client profile (Thomsen Company) is browsable end-to-end
with a working carousel modal.

---

## Phase 5 — Marketing & Ads page (`/marketing-ads`) — analytics dashboard clone

- [ ] Research shadcn/ui dashboard example, shadcn-admin, or Tremor before building.
- [ ] Date range picker + campaign filter.
- [ ] KPI cards row (impressions, CTR, conversion multiplier, with delta indicators).
- [ ] Campaign performance table with expandable rows (audience breakdown, ad copy
      variations, creative sets, funnel strategy).

**Done when:** table expand/collapse works, KPI cards and table populated from static data.

---

## Phase 6 — Editorial Direction page (`/editorial-direction`) — Google Docs clone

- [ ] Evaluate Tiptap / BlockNote / Plate.js and pick one rather than building a rich-text
      canvas from scratch.
- [ ] App bar (File/Edit/View/Tools, doc title, Share button).
- [ ] Collapsible left outline drawer (Strategy / Two-Column Script / Set Specs sections).
- [ ] Centered document canvas.
- [ ] Interactive right-margin comments — click highlighted text → popover with embedded
      shot samples.

**Done when:** outline navigation scrolls/jumps to sections, at least one margin comment
popover is wired with a real shot sample.

---

## Phase 7 — Mobile-responsive pass

**Goal:** simplified mobile layouts across all pages (homepage, YouTube clone, Instagram
clone, dashboard clone, Docs clone). Deferred until all desktop pages are done — do this
pass in one dedicated phase rather than piecemeal.

- [ ] Define per-page mobile layout strategy (what collapses, what stacks, what's hidden).
- [ ] Confirm Cursor Image Trail touch behavior still feels right on small screens.
- [ ] Cross-device QA pass.

---

## Phase 8 — Polish & public-repo readiness

- [ ] Real client content pass (replace remaining placeholders).
- [ ] SEO basics (metadata, OG images, favicon).
- [ ] README worthy of a public agency-portfolio repo (what it is, stack, how to run).
- [ ] Final Lighthouse/perf pass given the "0ms load time" positioning in the brief.
- [ ] Final deploy + domain hookup if applicable.
