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

---

- 2026-08-23 — Editorial visual redesign of homepage/projects/writing per new instructions.txt: featured project gets a large visual card with its diagram, remaining projects render in a compact kicker+rule grid; articles get a restrained date/title/tags/reading-time feed. Two modes: projects visual, writing reading-first.
- 2026-08-23 — Added article `type` frontmatter (`deep-dive` | `note` | `build-log`, default `note`); /writing groups by type so short notes can accumulate alongside deep dives.
- 2026-08-23 — Project detail bodies render with `.mdx-story`, which CSS-counters each `##` heading into numbered storytelling sections (01, 02, ...).
- 2026-08-23 — Article detail measure narrowed to `max-w-[44rem]` (~70ch) for readability; article header shows type/date/reading-time meta line instead of a raw tag dump.

---

- 2026-08-23 — Design-system lock per instructions.txt v3: hierarchy now comes from size/space/weight/composition, not borders/boxes/uppercase/mono. Removed numbered story sections, ALL-CAPS mono labels, and heading underlines. Fonts: Inter Tight = display, Inter = body/metadata, JetBrains Mono = code only.
- 2026-08-23 — Centered content columns (`mx-auto`) while keeping text left-aligned: homepage 65rem, /projects 56rem, project detail + /writing 47.5rem, article detail 44rem.
- 2026-08-23 — Removed fabricated metrics from all project frontmatter; `metrics` is reserved for genuinely measured numbers only.
- 2026-08-23 — Project bodies no longer follow a fixed section template; each MDX file chooses its own ~4–5 narrative headings (template provides visual primitives, content determines the story).
- 2026-08-23 — Secondary homepage projects render as borderless year/title/summary rows; ProjectCard has two modes (visual featured / light secondary).
- 2026-08-23 — /writing switched from type-grouped headings to a single chronological feed with per-article meta line; type filters deferred until 15–20+ articles exist.

<!--
Add future decisions here as one-liners when they change structure,
conventions, or standards. Brief is fine.
-->
