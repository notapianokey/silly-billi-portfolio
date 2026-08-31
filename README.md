# Silly Billi Agency

**Live:** https://sillybillistudio.vercel.app

Agency portfolio site. Each service lives inside a pixel-accurate clone of the platform its
work is actually consumed on — video edits inside a YouTube shell, visual branding inside an
Instagram profile, marketing results inside an analytics dashboard, editorial/scripting work
inside a Google Docs workspace.

## Stack

- [Next.js](https://nextjs.org) — App Router, Static Site Generation
- TypeScript, strict mode
- Tailwind CSS v4
- Hosted on [Vercel](https://vercel.com) (Hobby tier) — zero server-side database, all content
  served from static data

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/app/          routes (App Router)
src/components/   shared React components
src/lib/          data/helper modules
public/cats/      source images for the homepage cursor trail
public/brand/     brand assets (logo, mascot)
```

See [`CLAUDE.md`](./CLAUDE.md) for the full project brief and [`BUILD_SEQUENCE.md`](./BUILD_SEQUENCE.md)
for the phased build plan.
