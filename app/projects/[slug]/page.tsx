import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ContentDiagram, isDiagramId } from "@/components/diagrams";
import { Footer } from "@/components/Footer";
import { MetricCard } from "@/components/MetricCard";
import { Navbar } from "@/components/Navbar";
import { getProject, getProjectSlugs } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const diagramId =
    project.diagram && isDiagramId(project.diagram.id)
      ? project.diagram.id
      : null;
  const diagramCaption = project.diagram?.caption;

  // Long-form case-study content is authored as MDX under content/projects/.
  const { default: CaseStudyBody } = await import(
    `@/content/projects/${slug}.mdx`
  );

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
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {project.year} / {project.role}
              </p>
              <h1 className="mt-4 font-display text-[1.75rem] leading-[1.15] font-medium tracking-[-0.03em] text-foreground sm:mt-5 sm:text-4xl sm:leading-[1.1]">
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

            <article className="mdx-body mdx-story pt-10">
              <CaseStudyBody />
            </article>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
