import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getPublishedArticles } from "@/lib/content";
import { articleTypeLabel } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering notes and systems deep dives.",
  alternates: {
    canonical: "/writing",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default function WritingPage() {
  const articles = getPublishedArticles();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Container className="pt-12 pb-20 sm:pt-20 sm:pb-32">
          {/* Chronological feed, centered reading column. */}
          <div className="mx-auto max-w-[47.5rem]">
            <BackLink href="/" label="Home" />
            <h1 className="mt-10 font-display text-[2.25rem] font-medium tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
              Writing
            </h1>
            <p className="mt-3 max-w-prose text-lg leading-relaxed text-secondary">
              Thoughts on building AI systems, infrastructure and
              products.
            </p>

            <div className="mt-14 sm:mt-16">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/writing/${article.href}`}
                  className="group mb-12 block last:mb-0 sm:mb-14"
                >
                  {/* Whole preview is clickable. */}
                  <p className="text-sm text-muted">
                    {new Date(`${article.date}T00:00:00`).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </p>
                  <h2 className="font-display mt-2 flex items-baseline gap-x-3 text-xl font-medium tracking-[-0.02em] text-foreground sm:text-2xl">
                    <span>{article.title}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </h2>
                  <p className="mt-1.5 text-sm text-muted">
                    {articleTypeLabel(article.type)} ·{" "}
                    {article.tags.join(" · ")} · {article.readingTime}
                  </p>
                  <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-secondary sm:text-base">
                    {article.summary}
                  </p>
                </Link>
              ))}
              {articles.length === 0 ? (
                <p className="text-[15px] text-muted">
                  Nothing published yet.
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
