# Backlog & Pending Work

Tracked from instructions.txt guidance (2026-08-23). Items here are agreed direction but not yet built. Pick these up before inventing new work.

## Open items

### Build-time frontmatter validation (P2)

The content loaders currently cast frontmatter with TypeScript assertions (`frontmatter as Omit<ProjectContent, ...>`), which validates nothing at runtime. Malformed content like `year: 2026` (number), `tags: "AI"` (string), or `featured: "yes"` slips through and produces broken UI.

Plan when implementing:

```
MDX → gray-matter → Zod schema → valid content → build
```

- Add `zod` dependency.
- Create schemas mirroring `ProjectFrontmatter` and `ArticleFrontmatter` in `lib/content/types.ts` (move types to be inferred from Zod via `z.infer`).
- Validate in `lib/content/fs.ts`/`index.ts` at load time so `pnpm run build` fails loudly with the offending slug and field.
- Log the change in docs/decisions.md when done.

### SEO / content discovery (P3)

Missing entirely today. When adding, follow Next.js file-based metadata conventions from the installed docs (`node_modules/next/dist/docs/`), not tutorials:

- `app/sitemap.ts` — all routes incl. project/article slugs
- `app/robots.ts`
- Canonical URLs (requires a production `metadataBase`)
- Per-project and per-article OG images (`opengraph-image.tsx`)
- RSS feed (worthwhile once publishing regularly)

## Resolved (do not redo)

Everything else from the same instructions was completed on 2026-08-23 — see docs/decisions.md entries: frontmatter rendering fix (remark-frontmatter pipeline), placeholder repoUrl removal, header nav to real routes, brand/nav underline states, hero CTA semantics, homeOrder homepage curation, BackLink hierarchy, project actions below visual, About narrative rebuild, prev/next bottom nav, project tags on cards, clickable writing previews.
