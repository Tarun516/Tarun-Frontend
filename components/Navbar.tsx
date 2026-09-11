"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolio } from "@/data/portfolio";

const growUnderline =
  "relative after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    document.body.style.overflow = "hidden";
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeDrawer = () => setOpen(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-52 flex-col border-r border-border bg-background lg:flex">
        <div className="flex min-h-0 flex-1 flex-col px-7 py-10 xl:py-12">
          <div>
            <Link
              href="/"
              className={`inline-block whitespace-nowrap font-display text-lg font-medium tracking-[-0.01em] text-foreground ${growUnderline}`}
            >
              {portfolio.name}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {portfolio.role} · {portfolio.location}
            </p>
          </div>

          <nav aria-label="Primary" className="mt-20 flex flex-col items-start gap-5">
            {portfolio.nav.map((item) => (
              <DesktopNavItem key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>
        </div>
      </aside>

      <ThemeToggle className="fixed top-6 right-6 z-40 hidden border border-border bg-background/90 backdrop-blur-sm lg:inline-flex xl:right-8" />

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-sm lg:hidden">
        <div className="flex h-[4.5rem] items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className={`truncate font-display text-sm font-medium tracking-tight text-foreground ${growUnderline}`}
          >
            {portfolio.name}
          </Link>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md text-secondary transition-colors duration-200 ease-out hover:bg-surface hover:text-foreground"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
        className={`fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[1px] transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
      />

      <div
        ref={drawerRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(20rem,86vw)] flex-col border-r border-border bg-background px-6 py-7 shadow-xl transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href="/"
              className="whitespace-nowrap font-display text-lg font-medium tracking-[-0.01em] text-foreground"
              onClick={closeDrawer}
            >
              {portfolio.name}
            </Link>
            <p className="mt-2 text-sm text-muted">
              {portfolio.role} · {portfolio.location}
            </p>
          </div>
          <button
            type="button"
            className="-mr-2 inline-flex size-9 shrink-0 items-center justify-center rounded-md text-secondary transition-colors duration-200 hover:bg-surface hover:text-foreground"
            aria-label="Close navigation"
            onClick={() => {
              closeDrawer();
              triggerRef.current?.focus();
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Primary" className="mt-16 flex flex-col gap-2">
          {portfolio.nav.map((item) => (
            <MobileNavItem
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={closeDrawer}
            />
          ))}
        </nav>

      </div>
    </>
  );
}

function isActive(item: (typeof portfolio.nav)[number], pathname: string) {
  return (
    !item.external &&
    (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
  );
}

function DesktopNavItem({
  item,
  pathname,
}: {
  item: (typeof portfolio.nav)[number];
  pathname: string;
}) {
  const active = isActive(item, pathname);
  const className = `relative py-1 pl-4 text-[15px] transition-colors duration-200 before:absolute before:top-1/2 before:left-0 before:h-4 before:w-px before:-translate-y-1/2 before:bg-accent before:transition-opacity before:duration-200 ${
    active
      ? "text-foreground before:opacity-100"
      : "text-secondary before:opacity-0 hover:text-foreground"
  }`;

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label} ↗
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} aria-current={active ? "page" : undefined}>
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
  const active = isActive(item, pathname);
  const className = `relative rounded-r-md py-3 pr-3 pl-4 text-base transition-colors duration-200 before:absolute before:top-1/2 before:left-0 before:h-5 before:w-px before:-translate-y-1/2 before:bg-accent ${
    active
      ? "bg-surface text-foreground before:opacity-100"
      : "text-secondary before:opacity-0 hover:bg-surface hover:text-foreground"
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
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
