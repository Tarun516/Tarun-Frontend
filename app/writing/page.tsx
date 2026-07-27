import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EntryCard } from "@/components/EntryCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getPublishedWriting } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering notes and systems deep dives.",
};

export default function WritingPage() {
  const writing = getPublishedWriting().map((article) => ({
    id: `article-${article.slug}`,
    kind: "article" as const,
    title: article.title,
    summary: article.summary,
    year: article.date.slice(0, 4),
    href: article.href,
  }));

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          <h1 className="font-display text-3xl font-medium tracking-[-0.03em] text-foreground sm:text-4xl">
            Writing
          </h1>
          <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-secondary sm:text-base">
            Notes on systems, agents, and infrastructure.
          </p>

          {writing.length > 0 ? (
            <div className="mt-12 max-w-3xl">
              {writing.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-[15px] text-muted">
              Nothing published yet.
            </p>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
