# Navigation & Information Design Rules

How visitors move through this site. Locked 2026-08-23 — deviate only with a logged decision in `docs/decisions.md`.

## Site map

```
HOME
 ├── Projects (/projects)  → Project detail (/projects/[slug])
 ├── Writing (/writing)    → Article detail (/writing/[slug])
 └── About (/about)
```

## Site navigation

- Brand (`C V Tarun`) is always a Home link, and Home → `/` is also an explicit
  first navigation item. The remaining links are About → `/about`, Projects →
  `/projects`, and Writing → `/writing`; they are real routes, never
  `/#section` anchors.
- At `lg` and above, navigation is a fixed 208px (`w-52`) full-height left
  rail. Identity sits at the top, primary routes form a vertical list, and the
  theme control sits at the bottom. The root layout offsets the full page region
  by the same width, so content never passes beneath the rail. The identity link
  is kept on one line.
- Desktop active routes use a short steel-blue hairline to the left of the
  label. Detail pages count as active for their parent section. Inactive items
  move from secondary to foreground on hover.
- Below `lg`, the rail becomes a sticky 72px header with brand, theme control,
  and menu trigger. The trigger opens a left drawer sized to
  `min(20rem, 86vw)` over a quiet backdrop.
- The mobile drawer locks body scrolling, traps keyboard focus, closes with
  Escape, backdrop click, its close control, or route selection, and restores
  focus to the menu trigger when explicitly dismissed.
- No external links appear in primary navigation. GitHub, LinkedIn, and contact
  actions live in the homepage hero. Resume returns only when a real
  `public/resume.pdf` is present.

## Back navigation — one rule

A single reusable `BackLink` component (components/BackLink.tsx) is used on every non-home page:

```
/projects/[slug]     ← Projects
/writing/[slug]      ← Writing
```

Index pages do not show a redundant `← Home` because the persistent rail brand
and mobile header brand always provide that route. Detail pages use the shared
`BackLink`; never hand-roll an ad-hoc back link.

## Bottom navigation

Detail pages must not dead-end. Every project/article detail page ends with `PrevNextNav` (components/PrevNextNav.tsx): `← Previous title · All projects/writing · Next title →`, ordered consistently with its index page (projects by year desc, articles by date desc). On mobile, the nav stacks vertically to avoid awkward wrapping.

## CTA semantics

Words must predict behavior: "View projects" navigates to `/projects`. A scroll-to-section CTA would be named "See selected work ↓".

## Homepage curation

Homepage placement is explicit via `homeOrder` frontmatter on projects:

- `homeOrder: 1` → primary/hero project (large visual card)
- `homeOrder: 2–5` → secondary grid (borderless rows: year, title, summary, tags)
- no `homeOrder` → /projects page only

Never rely on filesystem or year sorting to decide what recruiters see first.
The homepage always ends its sections with "View all projects →" / "All
writing →" links and reserves 80–112px of bottom space after the final link.

## Project detail layout order

1. Back link
2. Title, summary, meta line (year · role · tags)
3. Architecture visual + caption
4. GitHub ↗ / Live ↗ actions (below the visual — see it work first, then the code; omit entirely if there is no real repo URL)
5. Metrics (only genuinely measured numbers)
6. MDX body
7. PrevNextNav

## About page

Personal narrative, not résumé data: intro lead paragraph, bio, "Today" (uses
`portfolio.focus`), Experience, Education, Beyond the current build, Tools and
technologies. Its 47.5rem reading column remains centered like other deep
reading pages. Contact actions remain on the homepage rather than being
duplicated here.

## Content correctness rules

- Never ship placeholder URLs (`https://github.com` with no repo path). If the repo isn't public/useful, omit `repoUrl`.
- Never ship unmeasured metrics. If it wasn't measured, it doesn't render.
- Frontmatter must never appear in rendered output — it's stripped at compile time by remark-frontmatter in next.config.ts and parsed separately by gray-matter in lib/content. If frontmatter text becomes visible on a page, that is a build bug, not a design choice.
