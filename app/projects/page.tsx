import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EntryCard } from "@/components/EntryCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getProjectEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and case studies.",
};

export default function ProjectsPage() {
  const entries = getProjectEntries();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Container className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          <h1 className="font-display text-3xl font-medium tracking-[-0.03em] text-foreground sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-secondary sm:text-base">
            Builds and case studies.
          </p>

          <div className="mt-12 max-w-3xl">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
