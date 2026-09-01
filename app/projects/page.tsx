import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and case studies.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjectEntries();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Container className="pt-12 pb-20 sm:pt-20 sm:pb-32">
          {/* Browse column — wider than a reading measure, centered. */}
          <div className="mx-auto max-w-[56rem]">
            <BackLink href="/" label="Home" />
            <h1 className="mt-10 font-display text-[2.25rem] font-medium tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
              Projects
            </h1>
            <p className="mt-3 max-w-prose text-lg leading-relaxed text-secondary">
              Systems, products and experiments I&apos;ve built and
              learned from.
            </p>

            <div className="mt-14 grid gap-x-14 gap-y-16 sm:mt-16 sm:grid-cols-2 sm:gap-y-20">
              {projects.map((entry) => (
                <ProjectCard key={entry.id} entry={entry} visual />
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
