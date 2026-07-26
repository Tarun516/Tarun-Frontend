import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { portfolio } from "@/data/portfolio";
import portrait from "@/assets/Tarun.jpeg";

export function WorkspaceHero() {
  const blurb = portfolio.about.bio.slice(0, 2);

  return (
    <section className="pt-12 pb-14 sm:pt-16 sm:pb-16">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
        <div className="min-w-0">
          <h1 className="font-display text-4xl font-medium tracking-[-0.04em] text-foreground motion-safe:animate-enter sm:text-5xl sm:leading-[1.05]">
            {portfolio.hero.greeting}
          </h1>

          <p className="mt-4 max-w-lg text-lg leading-snug text-secondary motion-safe:animate-enter motion-safe:[animation-delay:50ms] sm:text-xl">
            {portfolio.hero.tagline}
          </p>

          <div className="mt-8 max-w-prose space-y-4 text-[15px] leading-relaxed text-secondary motion-safe:animate-enter motion-safe:[animation-delay:90ms] sm:text-base">
            {blurb.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-9 space-y-5 motion-safe:animate-enter motion-safe:[animation-delay:120ms]">
            <Button href="#projects" variant="primary">
              View projects
            </Button>

            <nav
              aria-label="Profiles and resume"
              className="flex flex-wrap items-center gap-x-1 text-[13px] text-muted"
            >
              {[
                { label: "GitHub", href: portfolio.github, external: true },
                { label: "LinkedIn", href: portfolio.linkedin, external: true },
                { label: "X", href: portfolio.twitter, external: true },
                { label: "Resume", href: portfolio.resumeUrl, external: true },
                { label: "About", href: "/about", external: false },
              ].map((item, index) => (
                <span key={item.label} className="inline-flex items-center">
                  {index > 0 ? (
                    <span className="mx-2.5 text-border-bright" aria-hidden="true">
                      ·
                    </span>
                  ) : null}
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-200 ease-out hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition-colors duration-200 ease-out hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        <div className="motion-safe:animate-enter motion-safe:[animation-delay:70ms] lg:justify-self-end">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_0_0_1px_rgb(255_255_255/0.03)]">
            <Image
              src={portrait}
              alt={portfolio.name}
              width={560}
              height={560}
              className="aspect-square w-full max-w-[240px] object-cover object-top brightness-[0.92] contrast-[1.05] sm:max-w-[280px] lg:max-w-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
