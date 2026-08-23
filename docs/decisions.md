# Decision Log

Brief, dated notes on significant decisions made in this project. Newest first.

Format: `- YYYY-MM-DD — decision — one-line why.`

---

- 2026-08-23 — Adopted hybrid content architecture (`data/portfolio.ts` for site facts + `content/**/*.mdx` for long-form content) instead of migrating to Astro, adding a CMS, or a database. Existing Next.js App Router setup was already structurally sound; only the content layer needed to change.
- 2026-08-23 — Chose MDX via `@next/mdx` (with `gray-matter` + `remark-gfm`) over MDX-in-page-routes. Content files live outside `app/` so routes stay thin and slugs are derived from filenames.
- 2026-08-23 — Removed hand-written `readingTime` and stored `href`s; both are now derived (word count / filename). Rule: store facts, derive everything derivable.
- 2026-08-23 — Kept `/writing` as the section name rather than renaming to `/articles`; navigation and positioning ("Engineering notes and systems deep dives") already fit.
- 2026-08-23 — Kept structured frontmatter fields (`metrics`, `techChoices`-style data) for card/list UIs while moving narrative body text into markdown — structured data feeds components, prose belongs in MDX.
- 2026-08-23 — Styled rendered markdown via scoped `.mdx-body` CSS rules in `globals.css` instead of the Tailwind typography plugin; keeps full control of tokens and avoids adding a dependency.
- 2026-08-23 — Detail pages use dynamic `import()` of MDX with `dynamicParams = false`: unknown slugs hard-404 and everything stays statically generated.

<!--
Add future decisions here as one-liners when they change structure,
conventions, or standards. Brief is fine.
-->
