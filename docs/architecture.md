# Architecture

The portfolio is a static, content-driven Next.js site. There is no database, no backend, and no CMS. Everything is prerendered at build time.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- MDX via `@next/mdx` (+ `gray-matter` for frontmatter, `remark-gfm` for tables/strikethrough)
- pnpm

## Hybrid content model

Content is split by nature:

- **Global site facts** (identity, hero copy, about data, nav, experience) live in `data/portfolio.ts`.
- **Long-form content** (project case studies, articles) lives as MDX under `content/` and is loaded through `lib/content/`.

```
app/                      Routes only — thin pages that consume the content layer
├── page.tsx              Homepage (hero → projects → writing)
├── about/page.tsx
├── projects/page.tsx     Index
├── projects/[slug]/page.tsx   Case study: header chrome + MDX body
├── writing/page.tsx      Index
└── writing/[slug]/page.tsx    Article: header chrome + MDX body

content/
├── projects/*.mdx        Case studies & projects (frontmatter + markdown body)
└── writing/*.mdx         Articles (frontmatter + markdown body)

lib/content/
├── types.ts              ContentEntry / ProjectContent / ArticleContent types
├── fs.ts                 Server-only MDX reading (gray-matter)
├── reading-time.ts       Word-count → "N min" estimate
└── index.ts              Collection loaders used by all pages

data/portfolio.ts         Global site facts only

components/
├── mdx/                  Callout, CodeBlock — reusable blocks inside MDX
├── diagrams/             SVG architecture diagrams, keyed by id in frontmatter
└── ...                   Navbar, Footer, EntryCard, MetricCard, etc.

mdx-components.tsx        Required by @next/mdx; global MDX component map
```

## Core principle

**Store facts; derive everything derivable.**

- `slug` ← MDX filename
- `href` ← `/projects/<slug>` or `/writing/<slug>`
- `readingTime` ← computed from the body (~200 wpm)
- list entries ← mapped from content by the loaders

Never hand-maintain a value that can be computed.

## Data flow

```
content/**/*.mdx ──▶ lib/content loaders ──▶ typed metadata ──▶ pages / EntryCard
                 └──▶ dynamic MDX import ──▶ rendered body (styled by .mdx-body)
```

- Index pages and the homepage use `getAllProjects()`, `getPublishedArticles()`, `getAllEntries()`, `getHomeProjects()`, `getHomeWriting()` from `lib/content`.
- Detail pages render the body with `await import(`@/content/.../${slug}.mdx`)` and set `dynamicParams = false`, so unknown slugs 404 and every page is statically generated via `generateStaticParams`.

## Frontmatter contracts

Project (`content/projects/`): `kind` ("project" | "case-study"), `title`, `summary`, `role`, `year`, `tags`, `featured?`, `homeOrder?` (explicit homepage placement: 1 = hero project, 2-5 = secondary grid, absent = projects page only), `repoUrl?` (only a real, useful repo URL — never a placeholder), `liveUrl?`, `metrics?` (only genuinely measured numbers), `diagram?` (id + caption).

Article (`content/writing/`): `title`, `summary`, `date` (ISO), `tags`, `type` (`deep-dive` | `note` | `build-log`, defaults to `note`), `published?` (false = hidden draft), `featured?`, `diagram?`.

`diagram.id` must be a key in `components/diagrams` (validated by `isDiagramId`).

## Styling conventions

- Design tokens are CSS variables surfaced as Tailwind theme colors: `foreground`, `secondary`, `muted`, `border`, `border-bright`, `surface`, `accent`. Use these, never raw hex values.
- Rendered markdown is styled by the scoped `.mdx-body` rules in `app/globals.css` — site chrome keeps its own hand-tuned styling and must not be affected.
- Light/dark theming is class-based (`html.dark`) with a no-flash inline script (`components/theme-script.tsx`).

## Adding content

- New article: create `content/writing/<slug>.mdx`. It appears on `/writing`, the homepage (if `featured`), and is prerendered automatically.
- New project: create `content/projects/<slug>.mdx`.
- Section conventions for case-study bodies: `## Problem`, `## Architecture`, `## Tech choices`, `## Challenges`, `## Trade-offs`, `## What I learned`.

## Verification

- `pnpm run lint`
- `pnpm run build` (also type-checks and prerenders all pages)
