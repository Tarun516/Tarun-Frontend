import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ContentDiagram, isDiagramId } from "@/components/diagrams";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getArticle, getPublishedArticles } from "@/data/portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || !article.published) return {};
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article || !article.published) notFound();

  const diagramId =
    article.diagram && isDiagramId(article.diagram.id)
      ? article.diagram.id
      : null;
  const diagramCaption = article.diagram?.caption;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />

      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          <div className="max-w-3xl">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm text-secondary transition-colors duration-200 ease-out hover:text-foreground"
            >
              <span aria-hidden="true">←</span> Writing
            </Link>

            <header className="mt-6 border-b border-border pb-8 sm:mt-8 sm:pb-10">
              <p className="font-mono text-xs text-muted">
                {article.date} · {article.readingTime}
              </p>
              <h1 className="mt-3 font-display text-[1.75rem] leading-[1.15] font-medium tracking-[-0.03em] text-foreground sm:mt-4 sm:text-4xl sm:leading-[1.1]">
                {article.title}
              </h1>
              <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-secondary sm:text-base">
                {article.summary}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted sm:mt-6">
                {article.tags.join("  ·  ")}
              </p>
            </header>

            {diagramId ? (
              <section className="border-b border-border py-10">
                <ContentDiagram id={diagramId} caption={diagramCaption} />
              </section>
            ) : null}

            {article.body?.length ? (
              <div className="space-y-5 pt-10 text-[15px] leading-relaxed text-secondary sm:text-base">
                {article.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="pt-10 text-[15px] text-muted">
                Full write-up coming soon.
              </p>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
