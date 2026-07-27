import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          <div className="flex items-start gap-4 sm:gap-5">
            <Image
              src={portrait}
              alt={portfolio.name}
              width={80}
              height={80}
              className="size-14 shrink-0 rounded-full object-cover object-top sm:size-20"
              priority
            />
            <div className="min-w-0">
              <h1 className="font-display text-3xl font-medium tracking-[-0.03em] text-foreground sm:text-4xl">
                About
              </h1>
              <p className="mt-2 text-sm text-muted">
                {portfolio.role}
                <span className="text-border-bright"> · </span>
                {portfolio.location}
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-prose space-y-5 text-[15px] leading-relaxed text-secondary sm:text-base">
            {portfolio.about.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <section className="mt-14 max-w-prose">
            <h2 className="font-display text-sm font-medium tracking-[0.08em] text-muted uppercase">
              Current role
            </h2>
            <p className="mt-4 font-display text-lg tracking-tight text-foreground">
              {portfolio.about.currentRole.title}
            </p>
            <p className="mt-1 text-sm text-secondary">
              {portfolio.about.currentRole.company}
              <span className="text-muted"> · </span>
              <span className="font-mono text-xs text-muted">
                {portfolio.about.currentRole.period}
              </span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              {portfolio.about.currentRole.summary}
            </p>
          </section>

          <section className="mt-14 max-w-prose">
            <h2 className="font-display text-sm font-medium tracking-[0.08em] text-muted uppercase">
              Earlier
            </h2>
            <ul className="mt-5 space-y-6">
              {portfolio.experience
                .filter(
                  (item) =>
                    !(
                      item.company === portfolio.about.currentRole.company &&
                      item.role === portfolio.about.currentRole.title
                    ),
                )
                .map((item) => (
                  <li key={`${item.company}-${item.role}-${item.period}`}>
                    <p className="font-display text-base text-foreground">
                      {item.role}
                    </p>
                    <p className="mt-1 text-sm text-secondary">
                      {item.company}
                      <span className="text-muted"> · </span>
                      <span className="font-mono text-xs text-muted">
                        {item.period}
                      </span>
                    </p>
                    {item.highlights.length > 0 ? (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-secondary">
                        {item.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
            </ul>
          </section>

          <section className="mt-14 max-w-prose">
            <h2 className="font-display text-sm font-medium tracking-[0.08em] text-muted uppercase">
              Education
            </h2>
            <p className="mt-4 font-display text-base text-foreground">
              {portfolio.about.education.degree}
            </p>
            <p className="mt-1 text-sm text-secondary">
              {portfolio.about.education.school}
              <span className="text-muted"> · </span>
              <span className="font-mono text-xs text-muted">
                {portfolio.about.education.period}
              </span>
            </p>
          </section>

          <section className="mt-14 max-w-prose">
            <h2 className="font-display text-sm font-medium tracking-[0.08em] text-muted uppercase">
              Interests
            </h2>
            <ul className="mt-4 space-y-2 text-[15px] text-secondary">
              {portfolio.about.interests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-14 max-w-prose">
            <h2 className="font-display text-sm font-medium tracking-[0.08em] text-muted uppercase">
              Tools I reach for
            </h2>
            <ul className="mt-5 space-y-4">
              {portfolio.about.tools.map((group) => (
                <li key={group.category}>
                  <p className="font-mono text-[11px] text-muted">
                    {group.category}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                    {group.items.join("  ·  ")}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-actions flex flex-wrap gap-3">
            <Button href={`mailto:${portfolio.email}`} variant="primary">
              Email me
            </Button>
            <Button href={portfolio.resumeUrl} external>
              Resume
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
