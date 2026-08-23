import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { portfolio } from "@/data/portfolio";
import portrait from "@/assets/Tarun.jpeg";

export function WorkspaceHero() {
  const blurb = portfolio.about.bio.slice(0, 2);

  return (
    <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-16">
      <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
        <div className="order-2 min-w-0 lg:order-1">
          <h1 className="font-display text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-foreground motion-safe:animate-enter sm:text-4xl sm:leading-[1.05] lg:text-5xl">
            {portfolio.hero.greeting}
          </h1>

          <p className="mt-3 max-w-lg text-base leading-snug text-secondary motion-safe:animate-enter motion-safe:[animation-delay:50ms] sm:mt-4 sm:text-lg lg:text-xl">
            {portfolio.hero.tagline}
          </p>

          <div className="mt-6 max-w-prose space-y-4 text-[15px] leading-relaxed text-secondary motion-safe:animate-enter motion-safe:[animation-delay:90ms] sm:mt-8 sm:text-base">
            {blurb.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 space-y-4 motion-safe:animate-enter motion-safe:[animation-delay:120ms] sm:mt-9 sm:space-y-5">
            <Button href="/projects" variant="primary">
              View projects
            </Button>

            <nav
              aria-label="Profiles and resume"
              className="flex flex-wrap items-center gap-x-1 gap-y-2 text-[13px] text-muted"
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
                    <span
                      className="mx-2.5 text-border-bright"
                      aria-hidden="true"
                    >
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

        <div className="order-1 mx-auto w-full max-w-[200px] motion-safe:animate-enter motion-safe:[animation-delay:70ms] sm:max-w-[240px] lg:order-2 lg:mx-0 lg:max-w-none lg:justify-self-end">
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_0_0_1px_var(--photo-ring)] sm:rounded-2xl">
            <Image
              src={portrait}
              alt={portfolio.name}
              width={560}
              height={560}
              className="aspect-square w-full object-cover object-top brightness-[0.92] contrast-[1.05]"
              priority
              sizes="(max-width: 1024px) 240px, 280px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
