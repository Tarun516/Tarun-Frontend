import type { ReactNode } from "react";

/**
 * Styled wrapper around fenced code blocks rendered by MDX (`pre` element).
 * Keeps the monospace surface consistent with the rest of the site.
 */
export function CodeBlock({ children }: { children?: ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed text-secondary">
      {children}
    </pre>
  );
}
