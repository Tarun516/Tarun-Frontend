# Content Authoring Guide

How to write and maintain the content that powers the site.

## Where content lives

| Type | Location | Notes |
| --- | --- | --- |
| Global site facts | `data/portfolio.ts` | Identity, hero, about, nav, experience |
| Projects / case studies | `content/projects/<slug>.mdx` | Frontmatter + markdown body |
| Articles | `content/writing/<slug>.mdx` | Frontmatter + markdown body |

## Rules

1. **Filename = slug = route.** `context-windows.mdx` is served at `/writing/context-windows`. Never store a slug or href in frontmatter.
2. **Reading time is computed**, never written. It comes from the body word count.
3. **Drafts**: set `published: false` in an article's frontmatter. Drafts are excluded from all lists, prerendering, and return 404.
4. **Diagrams** are referenced by id: `diagram: { id: "execution-engine", caption: "..." }`. The id must exist in `components/diagrams`.
5. **Case-study body sections** (convention, not enforced): `## Problem`, `## Architecture`, `## Tech choices` (one `###` per choice with a short "why"), `## Challenges`, `## Trade-offs`, `## What I learned`.
6. **Frontmatter is validated at build time.** Unknown fields and invalid types fail with the offending filename. Project `homeOrder` values must be unique.

## Project frontmatter

```yaml
kind: "case-study"        # or "project"
title: "..."
summary: "One or two sentences."
role: "What I did"
year: "2026"
tags: ["TypeScript", "Postgres"]
featured: true            # optional — homepage placement
homeOrder: 1              # optional, unique 1–5; explicit homepage order
repoUrl: "https://github.com/..."
liveUrl: "https://..."
metrics:                  # optional
  - label: "p95 latency"
    value: "90ms"
diagram:                  # optional
  id: "context-memory"
  caption: "Corpus → embed → rank → inject."
```

## Article frontmatter

```yaml
title: "..."
summary: "One-line summary."
date: "2026-08-23"        # ISO date; drives ordering + year grouping
type: "deep-dive"         # deep-dive | note | build-log (defaults to note)
tags: ["Systems"]
published: false          # omit for published posts
featured: true
diagram:
  id: "execution-engine"
  caption: "..."
```

## Available MDX components

Inside any `.mdx` file you can use:

- Standard markdown: headings, lists, tables (GFM), code fences, blockquotes, links, images.
- `<Callout tone="info|warn" title="Optional">...</Callout>` — inline emphasis block.

Code fences are automatically rendered through the styled `CodeBlock`.

## Writing style

- First person, plain prose. No buzzword stacking.
- Sentences should state a trade-off or a reason, not just a feature list.
- Summaries are one to two sentences and must make sense as a link preview.
