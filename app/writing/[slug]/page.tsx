import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ContentDiagram, isDiagramId } from "@/components/diagrams";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import {
  getPublishedArticles,
  getArticleIncludingDrafts,
} from "@/lib/content";
import { articleTypeLabel } from "@/lib/content/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleIncludingDrafts(slug);
  if (!article || article.draft) return {};
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleIncludingDrafts(slug);

  if (!article || article.draft) notFound();

  const diagramId =
    article.diagram && isDiagramId(article.diagram.id)
      ? article.diagram.id
      : null;
  const diagramCaption = article.diagram?.caption;

  // Article bodies are authored as MDX under content/writing/.
  const { default: ArticleBody } = await import(
    `@/content/writing/${slug}.mdx`
  );

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />

      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          {/* Articles are reading-first: centered narrow measure. */}
          <div className="mx-auto max-w-[44rem]">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm text-secondary transition-colors duration-200 ease-out hover:text-foreground"
            >
              <span aria-hidden="true">←</span> Writing
            </Link>

            <header className="mt-10 sm:mt-12">
              <p className="text-[13px] text-muted">
                {articleTypeLabel(article.type)} ·{" "}
                <time dateTime={article.date}>
                  {new Date(`${article.date}T00:00:00`).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                </time>{" "}
                · {article.readingTime}
              </p>
              <h1 className="mt-5 font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.03em] text-foreground sm:text-[2.375rem] sm:leading-[1.1]">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-secondary">
                {article.summary}
              </p>
            </header>

            {diagramId ? (
              <figure className="mt-12">
                <ContentDiagram id={diagramId} caption={diagramCaption} />
              </figure>
            ) : null}

            <article className="mdx-body mt-14 border-t border-border pt-12">
              <ArticleBody />
            </article>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
