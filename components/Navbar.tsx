"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolio } from "@/data/portfolio";

/**
 * Underline that grows from left to right (after: scale-x-0 → 100).
 * Active page keeps a full underline. Motion grammar: 200ms, soft ease.
 */
const growUnderline =
  "relative after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const revealNearTop = 120;
    const directionThreshold = 14;

    const onScroll = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (currentY <= revealNearTop || open) {
        scrollDelta.current = 0;
        setHidden(false);
        return;
      }

      if (
        (delta > 0 && scrollDelta.current < 0) ||
        (delta < 0 && scrollDelta.current > 0)
      ) {
        scrollDelta.current = 0;
      }
      scrollDelta.current += delta;

      if (scrollDelta.current > directionThreshold) {
        setHidden(true);
        scrollDelta.current = 0;
      } else if (scrollDelta.current < -directionThreshold) {
        setHidden(false);
        scrollDelta.current = 0;
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur-sm transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      onFocusCapture={() => setHidden(false)}
    >
      <Container className="grid h-[4.5rem] grid-cols-[1fr_auto] items-center gap-3 md:max-w-none md:grid-cols-[1fr_auto_1fr] md:px-10 lg:px-14 xl:px-20">
        <Link
          href="/"
          className={`min-w-0 justify-self-start truncate font-display text-sm font-medium tracking-tight text-foreground ${growUnderline}`}
        >
          {portfolio.name}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 md:flex lg:gap-10"
        >
          {portfolio.nav.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              pathname={pathname}
              growUnderline={growUnderline}
            />
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-1 sm:gap-2">
          <ThemeToggle />

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-secondary transition-colors duration-200 ease-out hover:bg-surface hover:text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background md:hidden"
        >
          <Container className="flex flex-col gap-1 py-3">
            {portfolio.nav.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function NavItem({
  item,
  pathname,
  growUnderline,
}: {
  item: (typeof portfolio.nav)[number];
  pathname: string;
  growUnderline: string;
}) {
  const active =
    !item.external &&
    (item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href));

  // Active pages keep a persistent full underline; others animate it in.
  const className = `text-sm transition-colors duration-200 hover:text-foreground ${growUnderline} ${
    active ? "text-foreground after:scale-x-100" : "text-secondary"
  }`;

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label} ↗
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

function MobileNavItem({
  item,
  pathname,
  onNavigate,
}: {
  item: (typeof portfolio.nav)[number];
  pathname: string;
  onNavigate: () => void;
}) {
  const active =
    !item.external &&
    (item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href));

  const className = `rounded-md px-3 py-3 text-base transition-colors duration-200 ease-out hover:bg-surface hover:text-foreground ${
    active ? "text-foreground" : "text-secondary"
  }`;

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {item.label} ↗
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
