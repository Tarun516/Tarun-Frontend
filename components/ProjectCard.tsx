import Link from "next/link";
import { ContentDiagram, isDiagramId } from "@/components/diagrams";
import type { ContentEntry } from "@/lib/content/types";

type ProjectCardProps = {
  entry: ContentEntry;
  /** Featured cards render the project's registered diagram as the visual. */
  visual?: boolean;
};

/**
 * Motion grammar (docs/design-system.md):
 * - arrows are always visible at 45% opacity; on hover they clear and
 *   nudge 4px max — they never appear from nothing
 * - titles stay foreground on hover (no accent recoloring)
 * - external links use ↗
 */
const arrowClass =
  "opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100";

const githubLinkClass =
  "text-sm font-medium text-secondary underline decoration-border-bright underline-offset-4 transition-colors duration-200 ease-out hover:text-foreground hover:decoration-accent";

export function ProjectCard({ entry, visual = false }: ProjectCardProps) {
  const diagramId = entry.diagram?.id;

  if (!visual) {
    return (
      <div className="group">
        <p className="text-sm text-muted">{entry.year}</p>
        <h3 className="mt-2 flex items-baseline justify-between gap-4 font-display text-lg font-medium tracking-[-0.02em] text-foreground sm:text-xl">
          <Link
            href={entry.href}
            className="transition-colors duration-200 hover:text-secondary"
          >
            {entry.title}
          </Link>
          <span className="flex shrink-0 items-center gap-4">
            <span aria-hidden="true" className={arrowClass}>
              →
            </span>
            {entry.repoUrl ? (
              <a
                href={entry.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-secondary underline decoration-border-bright underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-accent"
              >
                GitHub ↗
              </a>
            ) : null}
          </span>
        </h3>
        <p className="mt-3 max-w-prose text-[15px] leading-[1.7] text-secondary">
          {entry.summary}
        </p>
        {entry.tags?.length ? (
          <p className="mt-2 text-[13px] text-muted">
            {entry.tags.join(" · ")}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="group">
      <p className="text-sm text-muted">
        {entry.year} ·{" "}
        {entry.kind === "case-study" ? "Case study" : "Project"}
      </p>

      <h3 className="mt-3 flex items-baseline justify-between gap-4 font-display text-2xl font-medium tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
        <Link
          href={entry.href}
          className="transition-colors duration-200 hover:text-secondary"
        >
          {entry.title}
        </Link>
        <span aria-hidden="true" className={`shrink-0 ${arrowClass}`}>
          →
        </span>
      </h3>

      <p className="mt-4 max-w-prose text-base leading-[1.7] text-secondary sm:text-lg">
        {entry.summary}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
        {entry.tags?.length ? (
          <p className="text-sm text-muted">{entry.tags.join(" · ")}</p>
        ) : null}
        {entry.repoUrl ? (
          <a
            href={entry.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={githubLinkClass}
          >
            GitHub ↗
          </a>
        ) : null}
      </div>

      {diagramId && isDiagramId(diagramId) ? (
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface/60 p-4 transition-[border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-border-bright sm:p-6">
          <div className="text-secondary [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full [&_svg]:opacity-80 transition-opacity duration-200 group-hover:[&_svg]:opacity-100">
            <ContentDiagram id={diagramId} />
          </div>
        </div>
      ) : null}

      <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-secondary">
        <Link href={entry.href} className="underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-current">
          View {entry.kind === "case-study" ? "case study" : "project"}
        </Link>
        <span aria-hidden="true" className={arrowClass}>
          →
        </span>
      </p>
    </div>
  );
}
