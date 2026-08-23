import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EntryCard } from "@/components/EntryCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { WorkspaceHero } from "@/components/WorkspaceHero";
import {
  getAllEntries,
  getHomeProjects,
  getHomeWriting,
} from "@/lib/content";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
      {children}
    </p>
  );
}

export default function Home() {
  const featuredProjects = getHomeProjects();
  const allEntries = getAllEntries();

  // Featured case study gets the large editorial treatment; remaining
  // projects render in a compact secondary grid.
  const primary = featuredProjects[0];
  const secondary = allEntries.filter(
    (entry) =>
      (entry.kind === "project" || entry.kind === "case-study") &&
      entry.id !== primary?.id,
  );
  const writing = getHomeWriting().slice(0, 4);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Container>
          <WorkspaceHero />

          {/* Selected work — one high-impact visual card, then a compact grid. */}
          <section
            id="projects"
            className="scroll-mt-20 border-t border-border pt-8 sm:scroll-mt-24 sm:pt-12"
          >
            <SectionLabel>Selected work</SectionLabel>

            {primary ? (
              <div className="mt-10 max-w-3xl">
                <ProjectCard entry={primary} visual />
              </div>
            ) : null}

            {secondary.length > 0 ? (
              <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 sm:gap-y-14">
                {secondary.slice(0, 4).map((entry) => (
                  <ProjectCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : null}

            <p className="mt-12 text-sm text-muted">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1.5 text-secondary transition-colors duration-200 ease-out hover:text-foreground"
              >
                All projects
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </p>
          </section>

          {/* Writing — restrained feed: date, title, tags, reading time. */}
          <section
            id="writing"
            className="mt-16 scroll-mt-20 border-t border-border pt-8 pb-16 sm:mt-20 sm:scroll-mt-24 sm:pt-12 sm:pb-24"
          >
            <SectionLabel>Writing</SectionLabel>

            {writing.length > 0 ? (
              <div className="mt-6 max-w-3xl">
                {writing.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <p className="mt-6 max-w-prose text-sm text-muted">
                Writing coming soon.
              </p>
            )}

            <p className="mt-10 text-sm text-muted">
              <Link
                href="/writing"
                className="group inline-flex items-center gap-1.5 text-secondary transition-colors duration-200 ease-out hover:text-foreground"
              >
                View all
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </p>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
