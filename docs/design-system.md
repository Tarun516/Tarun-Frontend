# Design System

The visual rules this site follows. Locked 2026-08-23 — deviate only with a logged decision in `docs/decisions.md`.

## Core principle

**Hierarchy comes from size, space, weight and position — before borders, boxes, uppercase or color.** Whitespace > lines.

## Fonts

| Purpose | Font |
| --- | --- |
| Hero / H1 / H2 / H3 / project & article titles | Inter Tight (`font-display`) |
| Body text, navigation, buttons, dates, metadata | Inter (`font-sans`) |
| Code blocks, inline code, technical values | JetBrains Mono (`font-mono`) |

JetBrains Mono is for actual code and technical data — never for section labels or metadata "because developer portfolio".

## Type scale

- Hero: 48–56px
- Page / project / article H1: 40–44px (mobile ~32px)
- H2: 26–28px
- H3: 19–20px
- Body: 16–17px, line-height ~1.75
- Metadata: 13–14px

Weights: regular 400 and medium 500. Semibold only occasionally; bold almost never.

No ALL-CAPS labels. Kickers read like `2026 · Systems design` — sentence case, Inter, muted color.

## Content widths

Columns are centered in the page shell (`mx-auto`) while text stays left-aligned:

- Homepage composition column: `max-w-[65rem]`
- Projects index: `max-w-[56rem]`
- Project detail + Writing index: `max-w-[47.5rem]`
- Article detail: `max-w-[44rem]`

Reading measures narrow as the reader goes deeper.

## Spacing

- Major sections: 96–120px (`mt-20`–`mt-24`+)
- Subsections: 56–72px
- Heading → body: 16–24px
- Paragraph rhythm: body line-height handles it; avoid extra margins

## MDX body styling

All rendered markdown is styled by the scoped `.mdx-body` rules in `app/globals.css`. Headings have no borders or numbering — separation is whitespace. One hairline rule separates a page header from its body; that's the exception, not the pattern.

## Content rules

- Metrics frontmatter is reserved for genuinely measured numbers. If it wasn't measured, it doesn't ship.
- Project bodies choose their own ~4–5 narrative headings per project; there is no fixed section template.
- Secondary project presentations are borderless rows (year, title, summary) with no repeated kind label and no trailing "Project →".
