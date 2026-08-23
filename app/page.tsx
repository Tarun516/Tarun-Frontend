import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { WorkspaceHero } from "@/components/WorkspaceHero";
import { getHomeProjects, getPublishedArticles } from "@/lib/content";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-xl font-medium tracking-[-0.02em] text-foreground sm:text-2xl">
      {children}
    </p>
  );
}

export default function Home() {
  const homeProjects = getHomeProjects();
  const primary = homeProjects[0];
  const secondary = homeProjects.slice(1, 5);
  const writing = getPublishedArticles().slice(0, 3);

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
          {/* Centered composition column; typography stays left-aligned. */}
          <div className="mx-auto max-w-[65rem]">
            <WorkspaceHero />

            <section
              id="projects"
              className="scroll-mt-20 border-t border-border pt-12 sm:scroll-mt-24 sm:pt-16"
            >
              <SectionLabel>Selected work</SectionLabel>

              {primary ? (
                <div className="mt-10">
                  <ProjectCard entry={primary} visual />
                </div>
              ) : null}

              {secondary.length > 0 ? (
                <div className="mt-16 grid gap-x-14 gap-y-10 sm:grid-cols-2 sm:gap-y-12">
                  {secondary.map((entry) => (
                    <ProjectCard key={entry.id} entry={entry} />
                  ))}
                </div>
              ) : null}

              <p className="mt-14">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-1.5 text-sm text-secondary transition-colors duration-200 ease-out hover:text-foreground"
                >
                  View all projects
                  <span
                    aria-hidden="true"
                    className="inline-block opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </p>
            </section>

            <section
              id="writing"
              className="mt-20 scroll-mt-20 border-t border-border pt-12 sm:mt-24 sm:scroll-mt-24 sm:pt-16"
            >
              <SectionLabel>Writing</SectionLabel>

              <div className="mt-6">
                {writing.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/writing/${article.href}`}
                    className="group flex items-baseline gap-x-8 border-b border-border py-5 last:border-b-0"
                  >
                    <time
                      dateTime={article.date}
                      className="shrink-0 w-24 text-sm text-muted"
                    >
                      {new Date(`${article.date}T00:00:00`).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" },
                      )}
                    </time>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block text-base font-medium tracking-[-0.02em] text-foreground transition-colors duration-200 ease-out group-hover:text-secondary sm:text-lg">
                        {article.title}
                        <span
                          aria-hidden="true"
                          className="ml-2 inline-block opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </span>
                      <span className="mt-1 text-[13px] text-muted">
                        {article.tags.join(" · ")} · {article.readingTime}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>

              <p className="mt-8">
                <Link
                  href="/writing"
                  className="group inline-flex items-center gap-1.5 text-sm text-secondary transition-colors duration-200 ease-out hover:text-foreground"
                >
                  All writing
                  <span
                    aria-hidden="true"
                    className="inline-block opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
