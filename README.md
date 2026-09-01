# Tarun-Frontend

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. No database, no backend — everything is statically generated.

## Content architecture

The site uses a **hybrid content model**:

- `data/portfolio.ts` — global site facts only: identity, links, hero copy, about data, navigation, experience.
- `content/projects/*.mdx` — long-form project case studies (frontmatter + markdown body).
- `content/writing/*.mdx` — articles (frontmatter + markdown body).
- `lib/content/` — typed content layer that loads the MDX collections, derives slugs/hrefs, and computes reading time.

Rule of thumb: **store facts; derive everything derivable.** A file's filename becomes its slug, its route, and (for articles) the source of its reading-time estimate.

### Writing a new article

1. Create `content/writing/my-post.mdx` with frontmatter:

   ```mdx
   ---
   title: "My post"
   summary: "One-line summary."
   date: "2026-08-23"
   tags: ["Systems"]
   ---

   Body in markdown. Headings, code blocks, lists, tables, quotes,
   and <Callout> components all work.
   ```

2. That's it. The article appears on `/writing`, the homepage, and gets statically prerendered at `/writing/my-post`.

Set `published: false` in frontmatter to keep a draft out of the site entirely.

### Writing a new project / case study

Create `content/projects/my-project.mdx`. Frontmatter supports `kind` (`project` or `case-study`), `title`, `summary`, `role`, `year`, `tags`, `homeOrder` (homepage placement: 1 = hero, 2-5 = secondary), `repoUrl`, `liveUrl`, `metrics`, and `diagram` (id keyed in `components/diagrams`). The body is free-form markdown rendered below the page header — content determines the story, there is no fixed section template.

### MDX components

Global MDX component mappings live in `mdx-components.tsx`; reusable blocks (`Callout`, `CodeBlock`) live in `components/mdx/`. Typography for rendered markdown is scoped under `.mdx-body` in `app/globals.css`.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm run lint   # eslint
pnpm run build  # production build (also type-checks)
```
