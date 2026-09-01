import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectEntries } from "@/lib/content";
import { isDiagramId } from "@/components/diagrams";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and case studies.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjectEntries();

  // Selected projects: those with a registered diagram (richer presentation)
  const selected = projects.filter(
    (entry) => entry.diagram && isDiagramId(entry.diagram.id),
  );

  // Remaining projects: borderless rows
  const remaining = projects.filter(
    (entry) => !entry.diagram || !isDiagramId(entry.diagram.id),
  );

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Container className="pt-12 pb-20 sm:pt-20 sm:pb-32">
          <div className="mx-auto max-w-[56rem]">
            <BackLink href="/" label="Home" />
            <h1 className="mt-10 font-display text-[2.25rem] font-medium tracking-[-0.015em] text-foreground sm:text-[2.75rem]">
              Projects
            </h1>
            <p className="mt-3 max-w-prose text-lg leading-relaxed text-secondary">
              Systems, products and experiments I&apos;ve built and
              learned from.
            </p>

            <section className="mt-14 sm:mt-16">
              <div className="grid gap-x-14 gap-y-16 sm:grid-cols-2">
                {selected.map((entry) => (
                  <ProjectCard key={entry.id} entry={entry} visual />
                ))}
              </div>
            </section>

            {remaining.length > 0 ? (
              <section className="mt-24 sm:mt-28">
                <h2 className="font-display text-xl font-medium tracking-[-0.01em] text-foreground sm:text-2xl">
                  More projects
                </h2>
                <div className="mt-8 space-y-10 sm:space-y-12">
                  {remaining.map((entry) => (
                    <div key={entry.id} className="group">
                      <p className="text-sm text-muted">{entry.year}</p>
                      <h3 className="mt-2 flex items-baseline justify-between gap-4 font-display text-lg font-medium tracking-[-0.01em] text-foreground sm:text-xl">
                        <Link
                          href={entry.href}
                          className="transition-colors duration-200 hover:text-secondary"
                        >
                          {entry.title}
                        </Link>
                        <span
                          aria-hidden="true"
                          className="shrink-0 opacity-45 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </h3>
                      <p className="mt-3 max-w-prose text-[15px] leading-[1.7] text-secondary">
                        {entry.summary}
                      </p>
                      {entry.tags?.length ? (
                        <p className="mt-2 text-[13px] text-muted">
                          {entry.tags.join(" · ")}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
