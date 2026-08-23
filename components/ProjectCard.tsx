import Link from "next/link";
import { ContentDiagram, isDiagramId } from "@/components/diagrams";
import type { ContentEntry } from "@/lib/content/types";

type ProjectCardProps = {
  entry: ContentEntry;
  /** Featured cards render the project's registered diagram as the visual. */
  visual?: boolean;
};

/**
 * Editorial project presentation.
 *
 * - `visual` (featured): kicker, title, summary, then the project's
 *   diagram as a large visual, ending with a quiet "View" affordance.
 * - default (secondary): much lighter — year, title, summary. No card
 *   chrome, no repeated "project" label.
 */
export function ProjectCard({ entry, visual = false }: ProjectCardProps) {
  const slug = entry.id.replace(/^project-/, "");

  if (!visual) {
    return (
      <Link href={entry.href} className="group block">
        <p className="text-sm text-muted">{entry.year}</p>
        <h3 className="mt-2 font-display flex items-baseline justify-between gap-4 text-lg font-medium tracking-[-0.02em] text-foreground transition-colors duration-200 ease-out group-hover:text-accent sm:text-xl">
          <span>{entry.title}</span>
          <span
            aria-hidden="true"
            className="shrink-0 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100"
          >
            →
          </span>
        </h3>
        <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-secondary">
          {entry.summary}
        </p>
      </Link>
    );
  }

  return (
    <Link href={entry.href} className="group block">
      <p className="text-sm text-muted">
        {entry.year} ·{" "}
        {entry.kind === "case-study" ? "Case study" : "Project"}
      </p>

      <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] text-foreground transition-colors duration-200 ease-out group-hover:text-accent sm:text-[1.75rem]">
        {entry.title}
      </h3>

      <p className="mt-3 max-w-prose text-base leading-relaxed text-secondary sm:text-lg">
        {entry.summary}
      </p>

      {isDiagramId(slug) ? (
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface/60 p-4 transition-colors duration-200 ease-out group-hover:border-border-bright sm:p-6">
          <div className="text-secondary transition-opacity duration-300 ease-out [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full [&_svg]:opacity-80 group-hover:[&_svg]:opacity-100">
            <ContentDiagram id={slug} />
          </div>
        </div>
      ) : null}

      <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-secondary transition-colors duration-200 ease-out group-hover:text-foreground">
        View
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        >
          →
        </span>
      </p>
    </Link>
  );
}
