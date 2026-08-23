import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Container } from "@/components/Container";
import { ContentDiagram, isDiagramId } from "@/components/diagrams";
import { Footer } from "@/components/Footer";
import { MetricCard } from "@/components/MetricCard";
import { Navbar } from "@/components/Navbar";
import { PrevNextNav } from "@/components/PrevNextNav";
import { getAllProjects, getProject, getProjectSlugs } from "@/lib/content";

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

  // Neighbours follow the same order as the /projects index (newest first).
  const all = getAllProjects();
  const index = all.findIndex((item) => item.slug === project.slug);
  const prev = index < all.length - 1 ? all[index + 1] : undefined;
  const next = index > 0 ? all[index - 1] : undefined;

  const diagramId =
    project.diagram && isDiagramId(project.diagram.id)
      ? project.diagram.id
      : null;
  const diagramCaption = project.diagram?.caption;

  // Long-form case-study content is authored as MDX under content/projects/.
  // Frontmatter is stripped at compile time; metadata comes from getProject().
  const { default: CaseStudyBody } = await import(
    `@/content/projects/${slug}.mdx`
  );

  return (
    <div className="flex min-h-full flex-1 flex-col" data-reading-page>
      <Navbar />

      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          {/* Reading column, centered in the page shell; text stays left-aligned. */}
          <div className="mx-auto max-w-[47.5rem]">
            <BackLink href="/projects" label="Projects" />

            <header className="mt-8 sm:mt-10">
              <h1 className="font-display text-[2rem] leading-[1.12] font-medium tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
                {project.title}
              </h1>
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-secondary">
                {project.summary}
              </p>
              <p className="mt-4 text-sm text-muted">
                {project.year} · {project.role} · {project.tags.join(" · ")}
              </p>
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

            {/* Actions sit below the visual: see it work first, then the code. */}
            {(project.repoUrl || project.liveUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-secondary underline decoration-border-bright underline-offset-4 transition-colors duration-200 ease-out hover:text-foreground hover:decoration-accent"
                  >
                    GitHub ↗
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-secondary underline decoration-border-bright underline-offset-4 transition-colors duration-200 ease-out hover:text-foreground hover:decoration-accent"
                  >
                    Live ↗
                  </a>
                ) : null}
              </div>
            )}

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

            <PrevNextNav
              prev={
                prev
                  ? { href: `/projects/${prev.slug}`, label: prev.title }
                  : undefined
              }
              next={
                next
                  ? { href: `/projects/${next.slug}`, label: next.title }
                  : undefined
              }
              allHref="/projects"
              allLabel="All projects"
            />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
