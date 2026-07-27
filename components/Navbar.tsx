"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolio } from "@/data/portfolio";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

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

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-3">
        <Link
          href="/"
          className="min-w-0 truncate font-display text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 ease-out hover:text-secondary"
        >
          {portfolio.name}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 md:flex lg:gap-8"
          >
            {portfolio.nav.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </nav>

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
}: {
  item: (typeof portfolio.nav)[number];
}) {
  const className =
    "text-[13px] text-secondary transition-colors duration-200 ease-out hover:text-foreground sm:text-sm";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: (typeof portfolio.nav)[number];
  onNavigate: () => void;
}) {
  const className =
    "rounded-md px-3 py-3 text-base text-secondary transition-colors duration-200 ease-out hover:bg-surface hover:text-foreground";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
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
