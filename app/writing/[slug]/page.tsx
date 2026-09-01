import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Container } from "@/components/Container";
import { ContentDiagram, isDiagramId } from "@/components/diagrams";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PrevNextNav } from "@/components/PrevNextNav";
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
    alternates: { canonical: `/writing/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: `${article.date}T00:00:00.000Z`,
      tags: article.tags,
      url: `/writing/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleIncludingDrafts(slug);

  if (!article || article.draft) notFound();

  // Neighbours follow the same chronological order as /writing.
  const all = getPublishedArticles();
  const index = all.findIndex((item) => item.slug === article.slug);
  const prev = index < all.length - 1 ? all[index + 1] : undefined;
  const next = index > 0 ? all[index - 1] : undefined;

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
        <Container className="pt-12 pb-20 sm:pt-20 sm:pb-32">
          {/* Articles are reading-first: centered narrow measure. */}
          <div className="mx-auto max-w-[44rem]">
            <BackLink href="/writing" label="Writing" />

            <header className="mt-12 sm:mt-16">
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
              <h1 className="mt-5 font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.015em] text-foreground sm:text-[2.375rem] sm:leading-[1.1]">
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

            <article className="mdx-body mt-20 sm:mt-24">
              <ArticleBody />
            </article>

            <PrevNextNav
              prev={
                prev
                  ? { href: `/writing/${prev.slug}`, label: prev.title }
                  : undefined
              }
              next={
                next
                  ? { href: `/writing/${next.slug}`, label: next.title }
                  : undefined
              }
              allHref="/writing"
              allLabel="All writing"
            />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
