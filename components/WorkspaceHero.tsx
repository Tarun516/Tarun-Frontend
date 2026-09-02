import { portfolio } from "@/data/portfolio";

const socialLinks = [
  {
    href: portfolio.github,
    label: "GitHub",
    icon: (
      <svg className="size-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    href: portfolio.linkedin,
    label: "LinkedIn",
    icon: (
      <svg className="size-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: portfolio.twitter,
    label: "X",
    icon: (
      <svg className="size-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

/**
 * Performance rule (docs/design-system.md): above-the-fold content is
 * never animated into existence. Motion rewards interaction; it does
 * not delay the LCP element. No entrance animations here.
 */
export function WorkspaceHero() {
  return (
    <section className="pt-14 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14">
      <div className="grid items-start gap-8 sm:gap-10">
        <div className="min-w-0">
          <h1 className="font-display text-[2.375rem] leading-[1.06] font-medium tracking-[-0.015em] text-foreground sm:text-5xl lg:text-[3.5rem]">
            {portfolio.hero.greeting}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-[1.5] text-secondary sm:mt-6 sm:text-xl lg:text-[1.375rem]">
            {portfolio.hero.tagline}
          </p>

          <p className="mt-8 max-w-xl text-base leading-[1.7] text-secondary sm:mt-10 sm:text-[17px]">
            {portfolio.focus}
          </p>

          <div className="mt-9 space-y-5 sm:mt-10">
            <nav
              aria-label="Profiles"
              className="flex items-center gap-3"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group relative flex size-8 items-center justify-center rounded-lg border border-border text-muted transition-colors duration-200 ease-out hover:border-border-bright hover:text-foreground"
                >
                  {link.icon}
                  <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {link.label}
                  </span>
                </a>
              ))}
              {portfolio.resumeUrl ? (
                <a
                  href={portfolio.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Resume"
                  className="group relative flex size-8 items-center justify-center rounded-lg border border-border text-muted transition-colors duration-200 ease-out hover:border-border-bright hover:text-foreground"
                >
                  <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Resume
                  </span>
                </a>
              ) : null}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
