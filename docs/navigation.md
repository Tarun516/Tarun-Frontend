# Navigation & Information Design Rules

How visitors move through this site. Locked 2026-08-23 — deviate only with a logged decision in `docs/decisions.md`.

## Site map

```
HOME
 ├── Projects (/projects)  → Project detail (/projects/[slug])
 ├── Writing (/writing)    → Article detail (/writing/[slug])
 └── About (/about)
```

## Header

- Brand (`C V Tarun`) is the Home link, with a thin hover underline.
- Nav links: Projects → `/projects`, Writing → `/writing`, About → `/about`. Real routes, never `/#section` anchors.
- No external links in the header. GitHub/LinkedIn/X/Resume live in the hero and footer only. The header answers "where can I go inside the site?"
- Hover affordance: 1px underline with `underline-offset-[5px]` (via Tailwind `underline-offset-[5px] hover:underline`). The currently active page keeps the underline (computed from `usePathname()`; detail pages count as active for their section).
- Scroll behavior: always visible within 120px of the top; after that, 14px of accumulated downward movement hides it with `translateY(-100%)`, while upward movement reveals it. Keyboard focus and an open mobile menu always reveal it.
- Desktop composition is a transparent, borderless 72px three-column header with wider viewport padding: brand left, primary routes centered, theme control right.

## Back navigation — one rule

A single reusable `BackLink` component (components/BackLink.tsx) is used on every non-home page:

```
/projects            ← Home
/projects/[slug]     ← Projects
/writing             ← Home
/writing/[slug]      ← Writing
/about               ← Home
```

Never hand-roll an ad-hoc back link.

## Bottom navigation

Detail pages must not dead-end into the footer. Every project/article detail page ends with `PrevNextNav` (components/PrevNextNav.tsx): `← Previous title · All projects/writing · Next title →`, ordered consistently with its index page (projects by year desc, articles by date desc).

## CTA semantics

Words must predict behavior: "View projects" navigates to `/projects`. A scroll-to-section CTA would be named "See selected work ↓".

## Homepage curation

Homepage placement is explicit via `homeOrder` frontmatter on projects:

- `homeOrder: 1` → primary/hero project (large visual card)
- `homeOrder: 2–5` → secondary grid (borderless rows: year, title, summary, tags)
- no `homeOrder` → /projects page only

Never rely on filesystem or year sorting to decide what recruiters see first. The homepage always ends its sections with "View all projects →" / "All writing →" links.

## Project detail layout order

1. Back link
2. Title, summary, meta line (year · role · tags)
3. Architecture visual + caption
4. GitHub ↗ / Live ↗ actions (below the visual — see it work first, then the code; omit entirely if there is no real repo URL)
5. Metrics (only genuinely measured numbers)
6. MDX body
7. PrevNextNav

## About page

Personal narrative, not résumé data: intro lead paragraph, bio, "What I'm focused on" (uses `portfolio.focus`), Experience, Education, Things I work with, then Email/Resume buttons. Centered at 47.5rem like other reading pages.

## Content correctness rules

- Never ship placeholder URLs (`https://github.com` with no repo path). If the repo isn't public/useful, omit `repoUrl`.
- Never ship unmeasured metrics. If it wasn't measured, it doesn't render.
- Frontmatter must never appear in rendered output — it's stripped at compile time by remark-frontmatter in next.config.ts and parsed separately by gray-matter in lib/content. If frontmatter text becomes visible on a page, that is a build bug, not a design choice.
