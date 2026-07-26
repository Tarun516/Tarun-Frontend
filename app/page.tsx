import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { EntryCard } from "@/components/EntryCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WorkspaceHero } from "@/components/WorkspaceHero";
import { getHomeProjects, getHomeWriting } from "@/data/portfolio";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 w-fit border-b border-border-bright pb-2 text-sm whitespace-nowrap text-muted">
      {children}
    </p>
  );
}

export default function Home() {
  const projects = getHomeProjects();
  const writing = getHomeWriting();

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

          <section
            id="projects"
            className="scroll-mt-24 border-t border-border pt-10 sm:pt-12"
          >
            <SectionLabel>Projects</SectionLabel>
            {projects.length > 0 ? (
              <div className="max-w-2xl">
                {projects.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <p className="max-w-prose text-sm text-muted">
                Project write-ups coming soon.
              </p>
            )}
          </section>

          <section
            id="writing"
            className="scroll-mt-24 border-t border-border pt-10 pb-24 sm:pt-12"
          >
            <SectionLabel>Articles & case studies</SectionLabel>
            {writing.length > 0 ? (
              <div className="max-w-2xl">
                {writing.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <p className="max-w-prose text-sm text-muted">
                Writing coming soon.
              </p>
            )}
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
