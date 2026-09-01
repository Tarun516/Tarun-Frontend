import Image from "next/image";
import { Button } from "@/components/Button";
import { portfolio } from "@/data/portfolio";
import portrait from "@/assets/Tarun.jpeg";

/**
 * Performance rule (docs/design-system.md): above-the-fold content is
 * never animated into existence. Motion rewards interaction; it does
 * not delay the LCP element. No entrance animations here.
 */
export function WorkspaceHero() {
  return (
    <section className="pt-14 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14">
      <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
        <div className="order-2 min-w-0 lg:order-1">
          <h1 className="font-display text-[2.375rem] leading-[1.06] font-medium tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.5rem]">
            {portfolio.hero.greeting}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-[1.5] text-secondary sm:mt-6 sm:text-xl lg:text-[1.375rem]">
            {portfolio.hero.tagline}
          </p>

          <p className="mt-8 max-w-xl text-base leading-[1.7] text-secondary sm:mt-10 sm:text-[17px]">
            {portfolio.focus}
          </p>

          <div className="mt-9 space-y-5 sm:mt-10">
            <Button href="/projects" variant="primary">
              View projects
            </Button>

            <nav
              aria-label="Profiles"
              className="flex flex-wrap items-center gap-x-1 gap-y-2 text-[13px] text-muted"
            >
              {[
                { label: "GitHub ↗", href: portfolio.github },
                { label: "LinkedIn ↗", href: portfolio.linkedin },
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
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 ease-out hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </span>
              ))}
            </nav>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[200px] sm:max-w-[240px] lg:order-2 lg:mx-0 lg:max-w-none lg:justify-self-end">
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
