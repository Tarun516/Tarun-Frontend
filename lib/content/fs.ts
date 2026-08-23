import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Shared helpers for reading the MDX collections under `content/`.
 * Server-side only (uses `fs`); safe in Server Components and
 * generateStaticParams / generateMetadata.
 */

export type LoadedMdx = {
  slug: string;
  frontmatter: Record<string, unknown>;
  /** Raw markdown body, used for reading time. */
  content: string;
};

export function contentDir(collection: "projects" | "writing"): string {
  return path.join(process.cwd(), "content", collection);
}

export function listSlugs(collection: "projects" | "writing"): string[] {
  const dir = contentDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

/** Read one MDX file's frontmatter and body by slug. */
export function readMdx(
  collection: "projects" | "writing",
  slug: string,
): LoadedMdx | undefined {
  const file = path.join(contentDir(collection), `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data, content };
}

export function readAllMdx(
  collection: "projects" | "writing",
): LoadedMdx[] {
  return listSlugs(collection)
    .map((slug) => readMdx(collection, slug))
    .filter((item): item is LoadedMdx => Boolean(item));
}
