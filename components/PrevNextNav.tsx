import Link from "next/link";

type PrevNextNavProps = {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
  allHref: string;
  allLabel: string;
};

/**
 * Bottom-of-page navigation so detail pages never dead-end into the
 * footer. Renders `← Previous · All X · Next →` as one quiet row.
 */
export function PrevNextNav({ prev, next, allHref, allLabel }: PrevNextNavProps) {
  return (
    <nav
      aria-label="More content"
      className="mt-20 flex flex-col gap-4 border-t border-border pt-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-x-8"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group inline-flex min-w-0 items-center gap-2 text-secondary transition-colors duration-200 ease-out hover:text-foreground"
        >
          <span
            aria-hidden="true"
            className="inline-block opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 group-hover:opacity-100"
          >
            ←
          </span>
          <span className="truncate">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}

      <Link
        href={allHref}
        className="text-muted transition-colors duration-200 ease-out hover:text-foreground sm:order-none"
      >
        {allLabel}
      </Link>

      {next ? (
        <Link
          href={next.href}
          className="group inline-flex min-w-0 items-center justify-end gap-2 text-secondary transition-colors duration-200 ease-out hover:text-foreground"
        >
          <span className="truncate">{next.label}</span>
          <span
            aria-hidden="true"
            className="inline-block opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100"
          >
            →
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
