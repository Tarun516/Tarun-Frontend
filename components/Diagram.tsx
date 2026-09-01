import type { ReactNode } from "react";

type DiagramProps = {
  children: ReactNode;
  caption?: string;
  className?: string;
};

/** Theme-aware figure for inline SVG / vector diagrams. */
export function Diagram({ children, caption, className = "" }: DiagramProps) {
  return (
    <figure className={`my-2 ${className}`}>
      <div className="overflow-hidden rounded-xl border border-border bg-surface/60 p-4 sm:p-6">
        <div className="text-secondary [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full">
          {children}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 font-sans text-[13px] leading-[1.6] text-muted sm:text-left">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
