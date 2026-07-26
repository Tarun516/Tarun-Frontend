import type { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "ghost",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200 ease-out";

  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:opacity-90"
      : "border border-border bg-transparent text-foreground hover:border-border-bright";

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="translate-x-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
      >
        →
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
