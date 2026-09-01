# Decision Log

Brief, dated notes on significant decisions made in this project. Newest first.

Format: `- YYYY-MM-DD — decision — one-line why.`

---

- 2026-09-01 — Replaced Inter + Inter Tight with Manrope as the single UI/editorial family while retaining JetBrains Mono for code — one family now provides a consistent typographic voice across display and body text.
- 2026-09-01 — Removed GitHub actions from homepage project presentations — cards now offer one clear internal path, while repository/live actions remain below the visual on detail pages.
- 2026-09-01 — Unified active and hover Navbar underlines on the same scale-based pseudo-element — navigation now uses one interaction language in every state.

- 2026-09-01 — Tightened homepage section rhythm to roughly 80–112px and removed stacked hero/section gaps — the previous 120–160px target created dead space in this lower-density composition.
- 2026-09-01 — Made the desktop Navbar a transparent borderless 72px three-column layout outside the reading-width constraint — navigation now has balanced horizontal spacing without visual chrome.

- 2026-09-01 — Increased the shared editorial rhythm to 120–160px desktop section spacing and 72–96px mobile spacing — whitespace now carries more hierarchy than rules or containers.
- 2026-09-01 — Added scroll-direction-aware Navbar visibility with a 120px top zone, 14px hysteresis, focus reveal, and CSS transform motion — navigation stays available without occupying the reading viewport continuously.
- 2026-09-01 — Reframed About as a narrative progression and replaced the utility footer with a large contact close — personal context and next actions now have deliberate hierarchy.
- 2026-09-01 — Added dedicated footer color tokens for a warm-charcoal closing section in both themes — avoids raw one-off colors while preserving one light/dark brand.

- 2026-09-01 — Added dependency-free build-time frontmatter validation with strict field, URL, diagram, and homepage-order checks — malformed MDX now fails with a file-specific error instead of leaking into UI through type assertions.
- 2026-09-01 — Added environment-based canonical metadata, sitemap, robots, and a static writing RSS feed — content remains filesystem-backed and fully prerendered.
- 2026-09-01 — Project cards now use declared `diagram.id` metadata rather than assuming diagram ids match filenames — content authors can choose the appropriate registered visual.
- 2026-09-01 — Removed Resume actions until a real `/public/resume.pdf` exists — broken external-facing CTAs are not rendered.

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

---

- 2026-08-23 — P0 bug fix: raw YAML frontmatter was rendering above MDX bodies (the `await import(...mdx)` path compiled the whole file while only gray-matter stripped frontmatter from the loader path). Fixed in the MDX pipeline itself via `remark-frontmatter` + `remark-mdx-frontmatter` in next.config.ts — never hide it with CSS.
- 2026-08-23 — P0 content fix: removed all placeholder `repoUrl: "https://github.com"` values; repoUrl is reserved for real, useful repository URLs only.
- 2026-08-23 — Header navigation locked to real routes (/projects, /writing, /about); GitHub removed from header (stays in hero + footer). Brand and nav links use 1px hover underline (offset 5px); active page keeps its underline via usePathname.
- 2026-08-23 — Hero "View projects" now navigates to /projects (words predict behavior; a scroll CTA would be named differently).
- 2026-08-23 — Homepage curation made explicit with `homeOrder` project frontmatter (1 = hero, 2-5 = secondary); homepage shows 1 primary + 3 secondary + "View all projects" link. Featured case studies are no longer silently excluded.
- 2026-08-23 — One BackLink component enforces the back hierarchy (index←Home, detail←section); PrevNextNav gives project/article pages bottom prev/next + all links.
- 2026-08-23 — Project detail: title/summary/meta first, then visual, then GitHub/Live actions below the visual (never in the header), then body.
- 2026-08-23 — About rebuilt as personal narrative (lead, bio, "What I'm focused on" using portfolio.focus, experience, education, tools) in a centered 47.5rem column.
- 2026-08-23 — Project cards show tags (passed through ContentEntry); /writing previews are fully clickable.

- 2026-08-23 — Backlog captured in docs/backlog.md: remaining agreed items are Zod build-time frontmatter validation (P2) and SEO/discovery — sitemap, robots, canonical URLs, OG images, RSS (P3). All other instructions.txt items were completed and are listed there as resolved.

- 2026-08-23 — Visual identity locked per instructions.txt (color pass): replaced purple accent `#6e56cf` with muted steel-blue (`#667f98` light / `#8ea1b4` dark); dark mode changed from OLED black + grid to warm charcoal (`#11110f` bg, `#171714` surface, `#ecece8` text); glow and grid toned to near-invisible; selection made monochrome (black-on-white / white-on-black inversion, never accent-colored); reading pages (project/article/about) opt out of grid/glow via `data-reading-page`; hover behavior is secondary→foreground with underline, not accent recoloring.

- 2026-08-23 — Motion grammar locked per instructions.txt: one system site-wide — single easing `cubic-bezier(0.22,1,0.36,1)`, 200ms hovers, arrows always visible at opacity-45 that clear + nudge max 4px on hover (never hidden-then-revealed), buttons stay put and animate only state, external links use ↗ / internal → / back ←, nav underlines grow from left (after: scale-x), no accent recoloring of titles on hover, no scroll-triggered animations. CSS only; no Framer Motion.

- 2026-08-23 — Performance pass per instructions.txt (Lighthouse): removed all hero entrance animations (H1/tagline/portrait/bio/actions no longer animate into existence — LCP renders immediately); JetBrains Mono set to `preload: false` so only Inter + Inter Tight compete at load. Explicitly not done, per guidance: image recompression (17 KB asset), architecture changes, service workers — TBT/CLS/FCP already healthy. Benchmarking rule recorded: production builds only, median of 3 runs.

<!--
Add future decisions here as one-liners when they change structure,
conventions, or standards. Brief is fine.
-->
