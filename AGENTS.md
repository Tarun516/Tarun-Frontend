# Agent Rules

<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## Project documentation — read first

Before making changes, read `docs/architecture.md` and `docs/content-authoring.md`. They describe the hybrid content model (`data/portfolio.ts` + `content/**/*.mdx` + `lib/content/`), the frontmatter contracts, and the styling conventions. Follow them; do not invent parallel patterns.

## Decision logging (required)

Whenever a change affects the project's structure, architecture, conventions, or standards, append a brief one-line note to `docs/decisions.md`.

- Format: `- YYYY-MM-DD — decision — one-line why.` (newest first)
- Brief is fine — one line, not an essay.
- Log it in the same change that introduces the decision. Do not leave it for later.
- Examples of what to log: new content-layer rules, changes to frontmatter contracts, new dependencies, renamed routes or sections, changed styling approach, altered build/verification workflow.
- Do NOT log routine content edits (adding a project MDX file, fixing a typo) or mechanical refactors with no architectural impact.
