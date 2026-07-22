# ethanzhang.dev - personal portfolio

Single-page portfolio for Ethan Zhang - UC Berkeley CS + Applied Math '28,
built to put shipped work and measurable impact front and center.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP +
ScrollTrigger · Lenis (smooth scroll) · OGL (WebGL hero).
Fully static - no backend, no client data fetching.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (static)
npm run start      # serve the production build
npm run lint       # eslint
```

## Editing content

All copy - roles, stories, metrics, projects, skills, links - lives in one
typed file: **`src/data/content.ts`**. Components only render what it exports,
so you never need to touch a component to update the resume story.

Two conventions inside that file:

- Wrap a phrase in `**double asterisks**` inside a story or outcome to render
  it highlighted in the accent color.
- Each role has a `stats` array - the big monospace numbers shown next to it.

## Placeholders to fill in

| What | Where |
| --- | --- |
| Resume PDF | Drop your file at `public/resume.pdf` (linked as "View resume") |
| Deployed domain | `site.url` in `src/data/content.ts` (used by sitemap + Open Graph) |
| Project demo/repo links | `links` arrays on each project in `src/data/content.ts` |

## Project structure

```
src/
  data/content.ts        # single source of truth for all copy
  lib/motion.ts          # GSAP/ScrollTrigger setup, reveal constants, Lenis
  app/
    layout.tsx           # fonts (next/font), metadata, theme init script
    page.tsx             # section assembly
    globals.css          # theme tokens (light/dark) + Tailwind setup
    opengraph-image.tsx  # OG/Twitter card, generated at build time
    sitemap.ts, robots.ts, icon.svg
  components/
    motion/              # SmoothScroll (Lenis), Cursor, Magnetic, Parallax
    HeroCanvas.tsx       # OGL/WebGL shader backdrop (code-split)
    ...                  # Nav, Hero, Experience, SelectedWork, Skills,
                         # About, Footer, Reveal, Stat, shared pieces
```

Design notes: dark mode is the default with a persisted light-mode toggle
(`ThemeToggle` flips a `.dark` class set pre-hydration to avoid a flash).

The motion system has two layers: GSAP + ScrollTrigger orchestrate all
sequencing and scroll choreography (one reveal convention site-wide, count-up
metrics, drawn dividers, scrubbed parallax), while an OGL/WebGL shader renders
the cursor-reactive hero backdrop on the GPU. Lenis provides inertia scrolling,
and a custom cursor + magnetic elements round out the micro-interactions. Only
`transform` and `opacity` are ever animated on DOM elements.

Scroll is authored: a top progress bar scrubs with the page, the hero hands
off with a scrubbed lift/blur/fade, and on desktop the experience section
plays as a pinned scroll story - a sticky rail crossfades the active role and
draws a progress line while the cards scroll by, active card in focus. The
story is JS-gated (`.story-on`), so mobile, reduced motion, and no-JS read
the same content as clean stacked cards.

Guardrails: everything collapses under `prefers-reduced-motion` (content is
server-rendered visible, so no-JS users see the full site); the WebGL layer is
code-split, capped at 2× pixel ratio, paused offscreen, skipped on mobile, and
falls back to a static CSS gradient if a context can't be created.

## Deploying to Vercel

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo. Vercel detects
   Next.js; the defaults are correct - no env vars needed.
3. Every push to `main` deploys automatically; PRs get preview URLs.
4. After the first deploy, set `site.url` in `src/data/content.ts` to the
   production domain so the sitemap and social cards point at the right place.

Or from the CLI: `npx vercel` (preview) / `npx vercel --prod`.
