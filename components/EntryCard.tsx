import Link from "next/link";
import type { ContentEntry } from "@/lib/content/types";
import { kindLabel } from "@/lib/content/types";

type EntryCardProps = {
  entry: ContentEntry;
};

/**
 * Article entry row. Motion grammar: arrow always visible at 45%,
 * clears and nudges 4px on hover; title stays foreground.
 */
export function EntryCard({ entry }: EntryCardProps) {
  const meta = `${kindLabel(entry.kind)} · ${entry.year}`;

  const body = (
    <div className="flex items-start justify-between gap-4 sm:gap-6">
      <div className="min-w-0">
        <h3 className="font-display text-base font-medium tracking-[-0.02em] text-foreground sm:text-xl">
          {entry.title}
        </h3>
        <p className="mt-1.5 font-mono text-[11px] text-muted">{meta}</p>
        <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-secondary">
          {entry.summary}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="mt-1 shrink-0 opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100"
      >
        →
      </span>
    </div>
  );

  const className =
    "group block border-t border-border py-5 transition-colors duration-200 ease-out first:border-t-0 first:pt-0 sm:py-6";

  if (entry.href.startsWith("http") || entry.href.startsWith("mailto:")) {
    return (
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={entry.href} className={className}>
      {body}
    </Link>
  );
}
