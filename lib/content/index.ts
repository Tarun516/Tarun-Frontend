import { readAllMdx } from "./fs";
import { estimateReadingTime } from "./reading-time";
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
  return readAllMdx("projects")
    .map(({ slug, frontmatter }) => ({
      slug,
      href: slug,
      ...(frontmatter as Omit<ProjectContent, "slug" | "href">),
    }))
    .sort((a, b) => b.year.localeCompare(a.year));
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
      published: true as boolean,
      readingTime: estimateReadingTime(content),
      ...(frontmatter as Omit<ArticleContent, "slug" | "href" | "readingTime" | "published">),
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
    ...frontmatter,
    slug: s,
    href: s,
    readingTime: estimateReadingTime(content),
    draft: frontmatter.published === false,
  })) as Array<ArticleContent & { draft: boolean }>;
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

/** Homepage: featured product/build projects. */
export function getHomeProjects(): ContentEntry[] {
  return getAllEntries().filter(
    (entry) => entry.featured && entry.kind === "project",
  );
}

/** Homepage: featured case studies + articles. */
export function getHomeWriting(): ContentEntry[] {
  return getAllEntries().filter(
    (entry) =>
      entry.featured &&
      (entry.kind === "case-study" || entry.kind === "article"),
  );
}

export function getProjectEntries(): ContentEntry[] {
  return getAllEntries().filter(
    (entry) => entry.kind === "project" || entry.kind === "case-study",
  );
}
