/**
 * Content layer types.
 *
 * `data/portfolio.ts` holds global site facts only. Long-form project
 * case studies and articles live as MDX under `content/` and are loaded
 * through the helpers in this directory.
 *
 * Rule: store facts; derive everything derivable.
 * - slug comes from the MDX filename
 * - href comes from the slug
 * - readingTime is computed from the body text
 */

export type EntryKind = "case-study" | "project" | "article" | "note";

export type Metric = {
  label: string;
  value: string;
};

/** Unified list item consumed by EntryCard. */
export type ContentEntry = {
  id: string;
  kind: EntryKind;
  title: string;
  summary: string;
  year: string;
  href: string;
  featured?: boolean;
};

export type ProjectFrontmatter = {
  kind: "case-study" | "project";
  title: string;
  summary: string;
  role: string;
  year: string;
  tags: string[];
  featured?: boolean;
  metrics?: Metric[];
  diagram?: { id: string; caption?: string };
  repoUrl?: string;
  liveUrl?: string;
};

export type ArticleType = "deep-dive" | "note" | "build-log";

export const ARTICLE_TYPE_LABEL: Record<ArticleType, string> = {
  "deep-dive": "Deep Dive",
  note: "Engineering Note",
  "build-log": "Build Log",
};

export function articleTypeLabel(type?: string): string {
  if (type && type in ARTICLE_TYPE_LABEL) {
    return ARTICLE_TYPE_LABEL[type as ArticleType];
  }
  return ARTICLE_TYPE_LABEL.note;
}

export type ArticleFrontmatter = {
  title: string;
  summary: string;
  date: string;
  /** deep-dive | note | build-log — defaults to note. */
  type?: ArticleType;
  published?: boolean;
  featured?: boolean;
  tags: string[];
  diagram?: { id: string; caption?: string };
};

export type ProjectContent = ProjectFrontmatter & {
  slug: string;
  href: string;
};

export type ArticleContent = ArticleFrontmatter & {
  slug: string;
  href: string;
  readingTime: string;
};

const KIND_LABEL: Record<EntryKind, string> = {
  "case-study": "Case Study",
  project: "Project",
  article: "Article",
  note: "Note",
};

export function kindLabel(kind: EntryKind): string {
  return KIND_LABEL[kind];
}

export function toProjectEntry(project: ProjectContent): ContentEntry {
  return {
    id: `project-${project.slug}`,
    kind: project.kind,
    title: project.title,
    summary: project.summary,
    year: project.year,
    href: `/projects/${project.href}`,
    featured: project.featured,
  };
}

export function toArticleEntry(article: ArticleContent): ContentEntry {
  return {
    id: `article-${article.slug}`,
    kind: "article",
    title: article.title,
    summary: article.summary,
    year: article.date.slice(0, 4),
    href: `/writing/${article.href}`,
    featured: article.featured,
  };
}
