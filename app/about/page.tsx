import type { Metadata } from "next";
import Image from "next/image";
import { BackLink } from "@/components/BackLink";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { portfolio } from "@/data/portfolio";
import portrait from "@/assets/Tarun.jpeg";

export const metadata: Metadata = {
  title: "About",
  description: `About ${portfolio.name}`,
};

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col" data-reading-page>
      <Navbar />
      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          {/* Personal-narrative reading column, centered. */}
          <div className="mx-auto max-w-[47.5rem]">
            <BackLink href="/" label="Home" />

            <header className="mt-10 flex items-start gap-4 sm:mt-12 sm:gap-5">
              <Image
                src={portrait}
                alt={portfolio.name}
                width={80}
                height={80}
                className="size-14 shrink-0 rounded-full object-cover object-top sm:size-20"
                priority
              />
              <div className="min-w-0 pt-1">
                <h1 className="font-display text-[2rem] font-medium tracking-[-0.03em] text-foreground sm:text-4xl">
                  About me
                </h1>
                <p className="mt-2 text-sm text-muted">
                  {portfolio.role} · {portfolio.location}
                </p>
              </div>
            </header>

            <p className="mt-8 font-display text-lg leading-relaxed tracking-[-0.01em] text-foreground sm:text-xl">
              {portfolio.hero.subtitle}
            </p>

            <div className="mt-6 space-y-5 text-[17px] leading-[1.75] text-secondary">
              {portfolio.about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section className="mt-16 border-t border-border pt-10">
              <h2 className="font-display text-[1.375rem] font-medium tracking-[-0.02em] text-foreground">
                What I&apos;m focused on
              </h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-secondary">
                {portfolio.focus}
              </p>
            </section>

            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-display text-[1.375rem] font-medium tracking-[-0.02em] text-foreground">
                Experience
              </h2>
              <ul className="mt-7 space-y-9">
                {portfolio.experience.map((item) => (
                  <li key={`${item.company}-${item.role}-${item.period}`}>
                    <p className="font-display text-lg font-medium tracking-[-0.01em] text-foreground">
                      {item.role}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {item.company} · {item.period}
                    </p>
                    {item.highlights.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {item.highlights.slice(0, 3).map((h) => (
                          <li
                            key={h}
                            className="flex gap-3 text-[15px] leading-relaxed text-secondary"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 size-1 shrink-0 rounded-full bg-border-bright"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-display text-[1.375rem] font-medium tracking-[-0.02em] text-foreground">
                Education
              </h2>
              <p className="mt-5 font-display text-lg font-medium tracking-[-0.01em] text-foreground">
                {portfolio.about.education.degree}
              </p>
              <p className="mt-1 text-sm text-muted">
                {portfolio.about.education.school} ·{" "}
                {portfolio.about.education.period}
              </p>
            </section>

            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-display text-[1.375rem] font-medium tracking-[-0.02em] text-foreground">
                Things I work with
              </h2>
              <ul className="mt-6 space-y-5">
                {portfolio.about.tools.map((group) => (
                  <li key={group.category}>
                    <p className="text-sm font-medium text-foreground">
                      {group.category}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                      {group.items.join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-16 flex flex-wrap gap-3 border-t border-border pt-10">
              <Button href={`mailto:${portfolio.email}`} variant="primary">
                Email me
              </Button>
              <Button href={portfolio.resumeUrl} external>
                Resume
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
