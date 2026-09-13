import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: `About ${portfolio.name}`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <main id="main" className="flex-1">
        <Container className="pt-12 pb-20 sm:pt-20 sm:pb-32">
          {/* Personal-narrative reading column, centered in the page region. */}
          <div className="mx-auto max-w-[47.5rem]">
            <header>
              <p className="text-sm text-muted">
                {portfolio.role} · {portfolio.location}
              </p>
              <h1 className="mt-4 font-display text-[2.25rem] leading-[1.08] font-medium tracking-[-0.015em] text-foreground sm:text-[2.75rem]">
                About
              </h1>
              <p className="mt-7 max-w-2xl font-display text-xl leading-[1.55] tracking-[-0.01em] text-foreground sm:text-[1.375rem]">
                {portfolio.hero.tagline}
              </p>
            </header>

            <div className="mt-12 space-y-5 text-[17px] leading-[1.7] text-secondary sm:mt-16 sm:text-lg">
              {portfolio.about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section className="mt-20 sm:mt-24">
              <h2 className="font-display text-[1.75rem] font-medium tracking-[-0.01em] text-foreground">
                Today
              </h2>
              <p className="mt-6 text-[17px] leading-[1.75] text-secondary sm:text-lg">
                {portfolio.focus}
              </p>
            </section>

            <section className="mt-20 sm:mt-24">
              <h2 className="font-display text-[1.75rem] font-medium tracking-[-0.01em] text-foreground">
                Experience
              </h2>
              <ol className="mt-9 space-y-12 sm:space-y-14">
                {portfolio.experience.map((item) => (
                  <li key={`${item.company}-${item.role}-${item.period}`}>
                    <div className="sm:grid sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
                      <p className="text-sm text-muted">{item.period}</p>
                      <div className="mt-2 sm:mt-0">
                        <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-foreground">
                          {item.company}
                        </h3>
                        <p className="mt-1 text-[15px] text-muted">{item.role}</p>
                        {item.highlights.length > 0 ? (
                          <ul className="mt-5 space-y-3">
                            {item.highlights.slice(0, 2).map((highlight) => (
                              <li key={highlight} className="text-base leading-[1.7] text-secondary">
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-20 sm:mt-24">
              <h2 className="font-display text-[1.75rem] font-medium tracking-[-0.01em] text-foreground">
                Education
              </h2>
              <p className="mt-7 font-display text-xl font-medium tracking-[-0.01em] text-foreground">
                {portfolio.about.education.degree}
              </p>
              <p className="mt-2 text-[15px] text-muted">
                {portfolio.about.education.school} · {portfolio.about.education.period}
              </p>
            </section>

            <section className="mt-20 sm:mt-24">
              <h2 className="font-display text-[1.75rem] font-medium tracking-[-0.01em] text-foreground">
                Areas of interest
              </h2>
              <ul className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {portfolio.about.interests.map((interest) => (
                  <li
                    key={interest}
                    className="text-[17px] leading-[1.7] text-secondary sm:text-lg"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-16 sm:mt-20">
              <h2 className="font-display text-[1.75rem] font-medium tracking-[-0.01em] text-foreground">
                Tools and technologies
              </h2>
              <ul className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
                {portfolio.about.tools.map((group) => (
                  <li key={group.category}>
                    <p className="text-sm font-medium text-foreground">{group.category}</p>
                    <p className="mt-2 text-[15px] leading-[1.7] text-secondary">
                      {group.items.join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </Container>
      </main>
    </div>
  );
}
