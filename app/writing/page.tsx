import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getPublishedArticles } from "@/lib/content";
import { articleTypeLabel } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering notes and systems deep dives.",
};

export default function WritingPage() {
  const articles = getPublishedArticles();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          {/* Chronological feed, centered reading column. */}
          <div className="mx-auto max-w-[47.5rem]">
            <h1 className="font-display text-[2rem] font-medium tracking-[-0.03em] text-foreground sm:text-4xl">
              Writing
            </h1>
            <p className="mt-3 max-w-prose text-lg leading-relaxed text-secondary">
              Thoughts on building AI systems, infrastructure and
              products.
            </p>

            <div className="mt-14">
              {articles.map((article) => (
                <article key={article.slug} className="mb-12 last:mb-0">
                  <p className="text-sm text-muted">
                    {new Date(`${article.date}T00:00:00`).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </p>
                  <h2 className="mt-2">
                    <Link
                      href={`/writing/${article.href}`}
                      className="group font-display text-xl font-medium tracking-[-0.02em] text-foreground transition-colors duration-200 ease-out hover:text-accent sm:text-2xl"
                    >
                      {article.title}
                      <span
                        aria-hidden="true"
                        className="ml-2 inline-block opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </h2>
                  <p className="mt-1.5 text-sm text-muted">
                    {articleTypeLabel(article.type)} ·{" "}
                    {article.tags.join(" · ")} · {article.readingTime}
                  </p>
                  <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-secondary sm:text-base">
                    {article.summary}
                  </p>
                </article>
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
