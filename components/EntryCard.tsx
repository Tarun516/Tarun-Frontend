import Link from "next/link";
import type { ContentEntry } from "@/data/portfolio";
import { kindLabel } from "@/data/portfolio";

type EntryCardProps = {
  entry: ContentEntry;
};

export function EntryCard({ entry }: EntryCardProps) {
  const meta = `${kindLabel(entry.kind)} · ${entry.year}`;

  const body = (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0">
        <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-foreground sm:text-xl">
          {entry.title}
        </h3>
        <p className="mt-1.5 font-mono text-[11px] text-muted">{meta}</p>
        <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-secondary">
          {entry.summary}
        </p>
        <p className="mt-3 text-sm text-muted transition-colors duration-200 ease-out group-hover:text-foreground">
          Read
          <span
            aria-hidden="true"
            className="ml-1 inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          >
            →
          </span>
        </p>
      </div>
    </div>
  );

  const className =
    "group block border-t border-border py-6 transition-colors duration-200 ease-out first:border-t-0 first:pt-0";

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
