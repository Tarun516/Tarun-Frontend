import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
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
      <main id="main" className="flex-1">
        <Container className="pb-20 sm:pb-24 lg:pb-28">
          {/* Centered composition column; typography stays left-aligned. */}
          <div className="mx-auto max-w-[65rem]">
            <WorkspaceHero />

            <section
              id="projects"
              className="scroll-mt-20 pt-20 sm:scroll-mt-24 sm:pt-24 lg:pt-28"
            >
              <SectionLabel>Projects</SectionLabel>

              {primary ? (
                <div className="mt-10 sm:mt-12">
                  <ProjectCard entry={primary} visual />
                </div>
              ) : null}

              {secondary.length > 0 ? (
                <div className="mt-14 grid gap-x-16 gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-y-12">
                  {secondary.map((entry) => (
                    <ProjectCard key={entry.id} entry={entry} />
                  ))}
                </div>
              ) : null}

              <p className="mt-12 sm:mt-14">
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
              className="mt-28 scroll-mt-20 sm:mt-32 sm:scroll-mt-24 lg:mt-36"
            >
              <SectionLabel>Writing</SectionLabel>

              <div className="mt-7 space-y-6 sm:mt-8 sm:space-y-7">
                {writing.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/writing/${article.href}`}
                    className="group grid gap-2 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-6"
                  >
                    <time
                      dateTime={article.date}
                      className="text-sm text-muted"
                    >
                      {new Date(`${article.date}T00:00:00`).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" },
                      )}
                    </time>
                    <span className="min-w-0">
                      <span className="font-display block text-base font-medium tracking-[-0.02em] text-foreground transition-colors duration-200 ease-out group-hover:text-secondary sm:text-lg">
                        {article.title}
                        <span
                          aria-hidden="true"
                          className="ml-2 inline-block opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </span>
                      <span className="mt-1.5 block text-[13px] text-muted">
                        {article.tags.join(" · ")}
                      </span>
                    </span>
                    <span className="pl-[6.5rem] text-[13px] text-muted sm:pl-0">
                      {article.readingTime}
                    </span>
                  </Link>
                ))}
              </div>

              <p className="mt-10">
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
    </div>
  );
}
