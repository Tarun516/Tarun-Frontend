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
          {/* Reading column, centered in the page shell; text stays left-aligned. */}
          <div className="mx-auto max-w-[47.5rem]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-secondary transition-colors duration-200 ease-out hover:text-foreground"
            >
              <span aria-hidden="true">←</span> Home
            </Link>

            <header className="mt-8 sm:mt-10">
              <p className="text-sm text-muted">
                {project.year} · {project.role}
              </p>
              <h1 className="mt-4 font-display text-[2rem] leading-[1.12] font-medium tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
                {project.title}
              </h1>
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-secondary">
                {project.summary}
              </p>
              <p className="mt-4 text-sm text-muted">
                {project.tags.join(" · ")}
              </p>
              {(project.repoUrl || project.liveUrl) && (
                <div className="mt-6 flex flex-wrap gap-3">
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
              )}
            </header>

            {diagramId ? (
              <figure className="mt-12">
                <div className="overflow-hidden rounded-xl border border-border bg-surface/60 p-5 sm:p-8">
                  <div className="text-secondary [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full">
                    <ContentDiagram id={diagramId} />
                  </div>
                </div>
                {diagramCaption ? (
                  <figcaption className="mt-3 text-sm text-muted">
                    {diagramCaption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}

            {/* Metrics only render when real measured numbers exist. */}
            {project.metrics?.length ? (
              <section className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <MetricCard key={metric.label} metric={metric} />
                ))}
              </section>
            ) : null}

            <article className="mdx-body mt-14 border-t border-border pt-12">
              <CaseStudyBody />
            </article>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
