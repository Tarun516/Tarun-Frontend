import { readAllMdx } from "./fs";
import { estimateReadingTime } from "./reading-time";
import { parseArticleFrontmatter, parseProjectFrontmatter } from "./validation";
import {
  toArticleEntry,
  toProjectEntry,
  type ArticleContent,
  type ContentEntry,
  type ProjectContent,
} from "./types";

/**
 * Project/case-study collection: content/projects/*.mdx
 * Slug and href are derived from the filename.
 */
export function getAllProjects(): ProjectContent[] {
  const projects = readAllMdx("projects")
    .map(({ slug, frontmatter }) => ({
      slug,
      href: slug,
      ...parseProjectFrontmatter(frontmatter, slug),
    }))
    .sort((a, b) => b.year.localeCompare(a.year));

  const homeOrders = new Map<number, string>();
  for (const project of projects) {
    if (project.homeOrder === undefined) continue;
    const duplicate = homeOrders.get(project.homeOrder);
    if (duplicate) {
      throw new Error(
        `Duplicate project homeOrder ${project.homeOrder}: ${duplicate}.mdx and ${project.slug}.mdx.`,
      );
    }
    homeOrders.set(project.homeOrder, project.slug);
  }
  return projects;
}

export function getProject(slug: string): ProjectContent | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return readAllMdx("projects").map(({ slug }) => slug);
}

/**
 * Article collection: content/writing/*.mdx
 * Reading time is computed from the body; unpublished drafts are filtered out.
 */
export function getAllArticles(): ArticleContent[] {
  return readAllMdx("writing")
    .map(({ slug, frontmatter, content }) => ({
      slug,
      href: slug,
      readingTime: estimateReadingTime(content),
      ...parseArticleFrontmatter(frontmatter, slug),
    }))
    .filter((article) => article.published !== false)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): ArticleContent | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

/** Includes drafts — used by generateStaticParams/metadata lookups. */
export function getArticleIncludingDrafts(
  slug: string,
): (ArticleContent & { draft: boolean }) | undefined {
  const all = readAllMdx("writing").map(({ slug: s, frontmatter, content }) => ({
    ...parseArticleFrontmatter(frontmatter, s),
    slug: s,
    href: s,
    readingTime: estimateReadingTime(content),
    draft: frontmatter.published === false,
  }));
  return all.find((article) => article.slug === slug);
}

export function getPublishedArticles(): ArticleContent[] {
  return getAllArticles();
}

function projectEntries(): ContentEntry[] {
  return getAllProjects().map(toProjectEntry);
}

function articleEntries(): ContentEntry[] {
  return getPublishedArticles().map(toArticleEntry);
}

export function getAllEntries(): ContentEntry[] {
  return [...projectEntries(), ...articleEntries()].sort((a, b) =>
    b.year.localeCompare(a.year),
  );
}

/** Homepage: curated by `homeOrder` frontmatter (1 = hero, 2+ = secondary). */
export function getHomeProjects(): ContentEntry[] {
  return getAllProjects()
    .filter((project) => project.homeOrder !== undefined)
    .sort((a, b) => (a.homeOrder ?? 99) - (b.homeOrder ?? 99))
    .map(toProjectEntry);
}

export function getProjectEntries(): ContentEntry[] {
  return getAllEntries().filter(
    (entry) => entry.kind === "project" || entry.kind === "case-study",
  );
}
