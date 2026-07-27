import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ContentDiagram, isDiagramId } from "@/components/diagrams";
import { Footer } from "@/components/Footer";
import { MetricCard } from "@/components/MetricCard";
import { Navbar } from "@/components/Navbar";
import { getAllCaseStudies, getCaseStudy } from "@/data/portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCaseStudies().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) notFound();

  const diagramId =
    project.diagram && isDiagramId(project.diagram.id)
      ? project.diagram.id
      : null;
  const diagramCaption = project.diagram?.caption;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />

      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-secondary transition-colors duration-200 ease-out hover:text-foreground"
            >
              <span aria-hidden="true">←</span> Home
            </Link>

            <header className="mt-6 border-b border-border pb-8 sm:mt-8 sm:pb-10">
              <p className="font-mono text-xs text-muted">
                {project.year} · {project.role}
              </p>
              <h1 className="mt-3 font-display text-[1.75rem] leading-[1.15] font-medium tracking-[-0.03em] text-foreground sm:mt-4 sm:text-4xl sm:leading-[1.1]">
                {project.title}
              </h1>
              <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-secondary sm:text-base">
                {project.summary}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted sm:mt-6">
                {project.tags.join("  ·  ")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.repoUrl ? (
                  <Button href={project.repoUrl} external>
                    GitHub
                  </Button>
                ) : null}
                {project.liveUrl ? (
                  <Button href={project.liveUrl} external>
                    Live
                  </Button>
                ) : null}
              </div>
            </header>

            {diagramId ? (
              <section className="border-b border-border py-10">
                <h2 className="font-display text-sm font-medium tracking-[0.08em] text-muted uppercase">
                  Overview
                </h2>
                <div className="mt-6">
                  <ContentDiagram id={diagramId} caption={diagramCaption} />
                </div>
              </section>
            ) : null}

            {project.metrics?.length ? (
              <section className="grid gap-8 border-b border-border py-10 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <MetricCard key={metric.label} metric={metric} />
                ))}
              </section>
            ) : null}

            <CaseBlock title="Problem">{project.problem}</CaseBlock>
            <CaseList title="Architecture" items={project.architecture} />

            <section className="border-b border-border py-10">
              <h2 className="font-display text-sm font-medium tracking-[0.08em] text-muted uppercase">
                Tech choices
              </h2>
              <ul className="mt-6 space-y-5">
                {project.techChoices.map((item) => (
                  <li key={item.choice}>
                    <p className="font-medium text-foreground">{item.choice}</p>
                    <p className="mt-1 text-sm leading-relaxed text-secondary">
                      {item.why}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <CaseList title="Challenges" items={project.challenges} />
            <CaseList title="Trade-offs" items={project.tradeoffs} />
            <CaseList title="Lessons" items={project.lessons} last />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

function CaseBlock({ title, children }: { title: string; children: string }) {
  return (
    <section className="border-b border-border py-10">
      <h2 className="font-display text-sm font-medium tracking-[0.08em] text-muted uppercase">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-secondary">{children}</p>
    </section>
  );
}

function CaseList({
  title,
  items,
  last = false,
}: {
  title: string;
  items: string[];
  last?: boolean;
}) {
  return (
    <section className={last ? "pt-10" : "border-b border-border py-10"}>
      <h2 className="font-display text-sm font-medium tracking-[0.08em] text-muted uppercase">
        {title}
      </h2>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-secondary sm:text-base"
          >
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
