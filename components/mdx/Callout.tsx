"use client";

import type { ReactNode } from "react";

type CalloutProps = {
  tone?: "info" | "warn";
  title?: string;
  children: ReactNode;
};

/** Inline emphasis block for use inside MDX articles and case studies. */
export function Callout({ tone = "info", title, children }: CalloutProps) {
  const accent =
    tone === "warn"
      ? "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400"
      : "border-accent/30 bg-accent/5";

  return (
    <aside className={`my-6 rounded-lg border px-4 py-3 text-sm leading-relaxed ${accent}`}>
      {title ? (
        <p className="font-display mb-1 font-medium tracking-tight">{title}</p>
      ) : null}
      <div className="text-secondary">{children}</div>
    </aside>
  );
}
