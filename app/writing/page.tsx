import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getPublishedArticles } from "@/lib/content";
import {
  ARTICLE_TYPE_LABEL,
  type ArticleType,
} from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering notes and systems deep dives.",
};

const TYPE_ORDER: ArticleType[] = ["deep-dive", "note", "build-log"];

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function WritingPage() {
  const articles = getPublishedArticles();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          <h1 className="font-display text-3xl font-medium tracking-[-0.03em] text-foreground sm:text-4xl">
            Writing
          </h1>
          <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-secondary sm:text-base">
            Deep dives, engineering notes, and build logs — an ongoing
            notebook, not a highlight reel.
          </p>

          <div className="mt-14 max-w-3xl">
            {TYPE_ORDER.map((type) => {
              const group = articles.filter(
                (article) => (article.type ?? "note") === type,
              );
              if (group.length === 0) return null;
              return (
                <section key={type} className="mt-12 first:mt-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {ARTICLE_TYPE_LABEL[type]}
                  </p>
                  <div className="mt-4 border-t border-border">
                    {group.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/writing/${article.href}`}
                        className="group flex items-baseline gap-x-6 gap-y-1 border-b border-border py-5 transition-colors duration-200 ease-out sm:py-6"
                      >
                        <time
                          dateTime={article.date}
                          className="shrink-0 font-mono text-xs text-muted sm:w-36"
                        >
                          {formatDate(article.date)}
                        </time>
                        <span className="min-w-0 flex-1">
                          <span className="font-display block text-base font-medium tracking-[-0.02em] text-foreground transition-colors duration-200 ease-out group-hover:text-accent sm:text-lg">
                            {article.title}
                            <span
                              aria-hidden="true"
                              className="ml-2 inline-block opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100"
                            >
                              →
                            </span>
                          </span>
                          <span className="mt-1.5 font-mono text-[11px] text-muted">
                            {article.tags.join(" · ")} ·{" "}
                            {article.readingTime}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
            {articles.length === 0 ? (
              <p className="text-[15px] text-muted">Nothing published yet.</p>
            ) : null}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
