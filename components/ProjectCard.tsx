import Link from "next/link";
import { ContentDiagram, isDiagramId } from "@/components/diagrams";
import type { ContentEntry } from "@/lib/content/types";

type ProjectCardProps = {
  entry: ContentEntry;
  /** Featured cards render the project's registered diagram as the visual. */
  visual?: boolean;
};

/**
 * Editorial project presentation — deliberately not a SaaS-style card.
 * Kicker (year / kind), display title over a hairline rule, summary,
 * then an optional diagram visual for featured entries.
 */
export function ProjectCard({ entry, visual = false }: ProjectCardProps) {
  const kicker = `${entry.year} / ${entry.kind === "case-study" ? "CASE STUDY" : "PROJECT"}`;
  const slug = entry.id.replace(/^project-/, "");

  return (
    <Link href={entry.href} className="group block">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {kicker}
      </p>

      <h3 className="mt-3 border-b border-border pb-4 font-display text-xl font-medium tracking-[-0.02em] text-foreground transition-colors duration-200 ease-out group-hover:text-accent sm:text-2xl">
        {entry.title}
        <span
          aria-hidden="true"
          className="ml-2 inline-block opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100"
        >
          →
        </span>
      </h3>

      <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-secondary sm:text-base">
        {entry.summary}
      </p>

      {visual && isDiagramId(slug) ? (
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-surface/60 p-4 transition-colors duration-200 ease-out group-hover:border-border-bright sm:p-6">
          <div className="text-secondary transition-opacity duration-300 ease-out [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full [&_svg]:opacity-80 group-hover:[&_svg]:opacity-100">
            <ContentDiagram id={slug} />
          </div>
        </div>
      ) : null}

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-200 ease-out group-hover:text-foreground">
        {entry.kind === "case-study" ? "Case study" : "Project"} →
      </p>
    </Link>
  );
}
