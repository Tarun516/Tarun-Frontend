import Link from "next/link";

type BackLinkProps = {
  href: string;
  label: string;
};

/**
 * Consistent back navigation. One rule everywhere:
 *
 *   /projects            ← Home
 *   /projects/[slug]     ← Projects
 *   /writing             ← Home
 *   /writing/[slug]      ← Writing
 *   /about               ← Home
 */
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors duration-200 ease-out hover:text-foreground"
    >
      <span
        aria-hidden="true"
        className="inline-block opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 group-hover:opacity-100"
      >
        ←
      </span>
      {label}
    </Link>
  );
}
