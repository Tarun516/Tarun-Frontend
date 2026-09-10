# Design System

The visual rules this site follows. Locked 2026-08-23 — deviate only with a logged decision in `docs/decisions.md`.

## Core principle

**Hierarchy comes from size, space, weight and position — before borders, boxes, uppercase or color.** Whitespace > lines.

## Color identity

One brand across both modes: light = warm paper, dark = warm charcoal. Never OLED black, never neon accents.

| Token | Light | Dark |
| --- | --- | --- |
| background | `#f7f7f5` | `#11110f` |
| surface | `#ffffff` | `#171714` |
| border / border-bright | `#e6e6e2` / `#d4d4d0` | `#262622` / `#343430` |
| foreground | `#141414` | `#ecece8` |
| secondary | `#525252` | `#b2b2aa` |
| muted | `#6f6f6b` | `#7e7e76` |
| accent (steel blue) | `#526d87` | `#8ea1b4` |

Accent rules:

- The single accent is a **muted steel-blue**, used sparingly: links/hover states, diagram highlights, focus rings, interactive details.
- Never use bright purple, neon green, orange, pink, or gradients as accents. Purple reads "generic AI SaaS" and is banned.

## Selection (locked)

Selection is utility feedback — monochrome, never accent-colored:

```css
::selection        { background: #1a1a1a; color: #ffffff; }
.dark ::selection  { background: #eeeeee; color: #111111; }
```

## Backgrounds & surfaces

- Glow is nearly invisible (`--glow` at 0.03–0.05 alpha).
- Both light and dark modes use a flat background. No grid, no permanent developer-grid background.
- `--surface` is for real containers only: code blocks, diagrams, callouts, demos. Page content sits directly on `--background`. Don't wrap everything in bordered surface cards.
- Hover behavior: text moves secondary → foreground with an underline where applicable; do not recolor body/nav text to the accent on hover.


## Fonts

| Purpose | Font |
| --- | --- |
| Hero / H1 / H2 / H3 / project & article titles | Manrope (`font-display`) |
| Body text, navigation, buttons, dates, metadata | Manrope (`font-sans`) |
| Code blocks, inline code, technical values | JetBrains Mono (`font-mono`) |

JetBrains Mono is for actual code and technical data — never for section labels or metadata "because developer portfolio".

## Type scale

- Hero: 48–56px, weight 500, tracking -0.015em to -0.02em
- Page / project / article H1: 40–48px desktop, 32–36px mobile, tracking -0.015em
- H2: 27–30px, tracking -0.01em
- H3: 19–21px, tracking normal to -0.01em
- Body: 16–17px, weight 400, line-height 1.7–1.75, tracking normal
- Metadata: 13–14px, weight 400, tracking normal
- Navbar: 14–15px, weight 400/500, tracking normal

Weights: regular 400 and medium 500. Semibold only occasionally; bold almost never.

No ALL-CAPS labels. Kickers read like `2026 · Systems design` — sentence case, Manrope, muted color.

## Content widths

Columns are centered in the page shell (`mx-auto`) while text stays left-aligned.
The homepage hero shares the 65rem composition column with Projects and Writing,
and its heading, copy, and profile actions align to that column's left edge.

- Homepage composition column: `max-w-[65rem]`
- Projects index: `max-w-[56rem]`
- Project detail + Writing index: `max-w-[47.5rem]`
- About: `max-w-[47.5rem]`
- Article detail: `max-w-[44rem]`

Reading measures narrow as the reader goes deeper.

## Spacing

Desktop:
- Major homepage boundary: 144–160px
- Major narrative/page chapters: 88–104px
- Content groups: 40–56px
- Heading → copy: 20–32px
- Paragraph rhythm: 20–24px

Mobile:
- Major homepage boundary: 88–96px
- Page chapters: 64–72px
- Content groups: 32–40px
- Heading → copy: 16–24px

Do not achieve spacing by randomly stacking `pb-14 + pt-12 + mt-20`. Define/reuse understandable spacing tokens or consistent utilities.

## MDX body styling

All rendered markdown is styled by the scoped `.mdx-body` rules in `app/globals.css`. Headings have no borders or numbering — separation is whitespace. One hairline rule separates a page header from its body; that's the exception, not the pattern.

## Motion grammar (locked)

One system for the whole site. Personality: **quiet, precise, fast, intentional.** CSS only — no Framer Motion.

Timings (single easing curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`, already `--ease-out-soft`):

| Interaction | Duration |
| --- | ---: |
| Text/nav hover | 150–200ms (`duration-200`) |
| Arrow movement | 200ms, max 4px (`group-hover:translate-x-1`) |
| Button background/border | 200ms; the button itself never moves or scales — only its state changes |
| Card/image hover | 200–280ms, subtle border/opacity response only |

Arrow rules:

- Arrows are **always visible** at `opacity-45`; hover clears them to full opacity and nudges 4px. Never hide an arrow and reveal it on hover — it's an affordance, especially for touch devices.
- Movement is at most `translate-x-1` (4px). No long arrow travel.
- Direction language: internal navigation `→`, external destination `↗`, back navigation `←`.

Hover color rules:

- Titles/text stay foreground (or shift to secondary at most). Do not recolor titles to accent on hover.
- The accent appears in focus rings, diagram highlights, and quiet underlines — not as a title hover color.

The desktop brand retains the grow-from-left underline (`after:` pseudo-element,
`origin-left scale-x-0 → scale-x-100`, 200ms). Vertical nav items use a short
steel-blue left hairline for the active route and secondary → foreground text
for hover. Do not introduce filled desktop nav pills or route icons.

Desktop navigation is a fixed, full-height 208px editorial rail with one subtle
right border. Identity sits at the top, routes below it, and the theme control
at the bottom. Below `lg`, use a 72px sticky header and an off-canvas left drawer;
the drawer moves for no more than 240ms on the standard soft easing. The page
content does not animate when opening the drawer.

## Page endings

There is no global footer. Index and About pages end with their content and
deliberate bottom spacing. The homepage reserves 80px mobile / 96px tablet /
112px desktop after its final “All writing” link so the action never sits against
the viewport edge. Project and article detail pages end with the shared
`PrevNextNav`, so readers retain a clear next action without a heavy closing
surface.

Banned motion: scale pop, bounce/spring, rotation, glowing buttons, large parallax, scroll-triggered fade-ins on sections/cards/headlines. A reader should never wait for the website.

## Performance rules (locked)

From Lighthouse guidance (2026-08-23): FCP 0.9s / TBT 50ms / CLS 0 were already good; the target was LCP < 2.5s and Speed Index. These rules protect that:

1. **Never animate above-the-fold content into existence.** No opacity/transform entrance animations on the hero H1, tagline, bio, or CTAs — the LCP element must be immediately visible. Motion rewards interaction; it does not delay content.
2. **Font loading**: Manrope is the single preloaded editorial/UI family; `JetBrains_Mono({ preload: false })` in app/layout.tsx because code font is not needed above the fold.
3. **Images**: keep `next/image` with explicit width/height, `priority` only for the true LCP image, and responsive `sizes`. Below-fold imagery defaults to lazy loading.
4. **Always benchmark production builds** (`pnpm run build && pnpm start`), never `next dev`, and run Lighthouse 3× taking the median.

Do NOT "optimize" further without evidence: no React/MDX architecture changes, dynamic imports everywhere, service workers, custom caching, or CDN hacks for this site's scale. TBT and CLS being healthy means JS execution and layout are not the problem area.


## Content rules

- Metrics frontmatter is reserved for genuinely measured numbers. If it wasn't measured, it doesn't ship.
- Project bodies choose their own ~4–5 narrative headings per project; there is no fixed section template.
- Secondary project presentations are borderless rows (year, title, summary) with no repeated kind label and no trailing "Project →".
- Homepage project presentations contain no repository actions. They expose one internal path into the project; GitHub and live actions belong on detail pages below the main visual.
