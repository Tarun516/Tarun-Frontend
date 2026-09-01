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
| muted | `#737373` | `#7e7e76` |
| accent (steel blue) | `#667f98` | `#8ea1b4` |

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
- The dark-mode 48px grid exists only on home and index pages, at near-invisible alpha (`--grid-line` ≤ 0.008). Reading pages — project detail, article detail, about — opt out entirely via the `data-reading-page` attribute on their root div (CSS: `.dark body:has([data-reading-page]) { background-image: none; }`). Any new reading-focused page must set this attribute.
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

- Hero: 48–56px
- Page / project / article H1: 40–44px (mobile ~32px)
- H2: 26–28px
- H3: 19–20px
- Body: 16–17px, line-height ~1.75
- Metadata: 13–14px

Weights: regular 400 and medium 500. Semibold only occasionally; bold almost never.

No ALL-CAPS labels. Kickers read like `2026 · Systems design` — sentence case, Manrope, muted color.

## Content widths

Columns are centered in the page shell (`mx-auto`) while text stays left-aligned:

- Homepage composition column: `max-w-[65rem]`
- Projects index: `max-w-[56rem]`
- Project detail + Writing index: `max-w-[47.5rem]`
- Article detail: `max-w-[44rem]`

Reading measures narrow as the reader goes deeper.

## Spacing

- Major homepage sections: 80–112px desktop, 64–80px mobile
- Hero vertical padding: 64–80px desktop, 56–64px mobile
- Subsections: 48–72px, with narrative page chapters up to 80–96px
- Heading → body: 24–40px
- Paragraph rhythm: body line-height handles it; avoid extra margins

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
| Page entrance | once on load, fade + 6–8px rise (`animate-enter`, hero only) |

Arrow rules:

- Arrows are **always visible** at `opacity-45`; hover clears them to full opacity and nudges 4px. Never hide an arrow and reveal it on hover — it's an affordance, especially for touch devices.
- Movement is at most `translate-x-1` (4px). No long arrow travel.
- Direction language: internal navigation `→`, external destination `↗`, back navigation `←`.

Hover color rules:

- Titles/text stay foreground (or shift to secondary at most). Do not recolor titles to accent on hover.
- The accent appears in focus rings, diagram highlights, and quiet underlines — not as a title hover color.

Nav links and brand use a grow-from-left underline (`after:` pseudo-element, `origin-left scale-x-0 → scale-x-100`, 200ms); the active page keeps a persistent full underline.

The sticky navbar is direction-aware after 120px of scroll. It accumulates 14px
of movement before reacting, translates upward while scrolling down, and returns
while scrolling up or receiving keyboard focus. It never leaves layout flow and
reduced-motion rules collapse the transition.

The desktop header is transparent, borderless, and 72px tall. Its wide
three-column composition keeps the brand left, primary navigation truly
centered, and theme control right; it does not inherit the narrower page shell.

## Footer

The footer is a full contact section, not a utility strip. Light mode closes on
warm charcoal; dark mode uses the elevated charcoal surface. It uses generous
64–112px vertical padding, a single email CTA, internal route links with `→`, and
external profile links with `↗`.

Banned motion: scale pop, bounce/spring, rotation, glowing buttons, large parallax, scroll-triggered fade-ins on sections/cards/headlines. A reader should never wait for the website.

## Performance rules (locked)

From Lighthouse guidance (2026-08-23): FCP 0.9s / TBT 50ms / CLS 0 were already good; the target was LCP < 2.5s and Speed Index. These rules protect that:

1. **Never animate above-the-fold content into existence.** No `animate-enter` (or any opacity/transform entrance) on the hero H1, tagline, portrait, bio, or CTAs — the LCP element must be immediately visible. Motion rewards interaction; it does not delay content.
2. **Font loading**: Manrope is the single preloaded editorial/UI family; `JetBrains_Mono({ preload: false })` in app/layout.tsx because code font is not needed above the fold.
3. **Images**: keep `next/image` with explicit width/height, `priority` only for the true LCP image, and responsive `sizes`. Below-fold imagery defaults to lazy loading.
4. **Always benchmark production builds** (`pnpm run build && pnpm start`), never `next dev`, and run Lighthouse 3× taking the median.

Do NOT "optimize" further without evidence: no React/MDX architecture changes, dynamic imports everywhere, service workers, custom caching, or CDN hacks for this site's scale. TBT and CLS being healthy means JS execution and layout are not the problem area.


## Content rules

- Metrics frontmatter is reserved for genuinely measured numbers. If it wasn't measured, it doesn't ship.
- Project bodies choose their own ~4–5 narrative headings per project; there is no fixed section template.
- Secondary project presentations are borderless rows (year, title, summary) with no repeated kind label and no trailing "Project →".
- Homepage project presentations contain no repository actions. They expose one internal path into the project; GitHub and live actions belong on detail pages below the main visual.
