import type { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

/**
 * Motion grammar (see docs/design-system.md):
 * - the button itself stays put; only its state animates
 * - arrow nudges 4px max, 200ms, single soft easing curve
 * - external destinations use ↗, internal use →
 */
export function Button({
  href,
  children,
  variant = "ghost",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-[background-color,border-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]";

  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:opacity-90"
      : "border border-border bg-transparent text-foreground hover:border-border-bright hover:bg-surface";

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      >
        {external ? "↗" : "→"}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles} ${className}`}
      >
        {content}
      </a>
    );
  }

  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
}
