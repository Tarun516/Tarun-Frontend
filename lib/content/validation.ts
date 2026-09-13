import { isDiagramId } from "@/components/diagrams";
import type {
  ArticleFrontmatter,
  ArticleType,
  Metric,
  ProjectFrontmatter,
} from "./types";

type Frontmatter = Record<string, unknown>;

const PROJECT_FIELDS = new Set([
  "kind",
  "title",
  "summary",
  "role",
  "year",
  "tags",
  "published",
  "homeOrder",
  "metrics",
  "diagram",
  "repoUrl",
  "liveUrl",
]);

const ARTICLE_FIELDS = new Set([
  "title",
  "summary",
  "date",
  "type",
  "published",
  "tags",
  "diagram",
]);

function fail(collection: string, slug: string, message: string): never {
  throw new Error(`Invalid frontmatter in content/${collection}/${slug}.mdx: ${message}`);
}

function object(value: unknown, field: string, collection: string, slug: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(collection, slug, `\`${field}\` must be an object.`);
  }
  return value as Frontmatter;
}

function text(data: Frontmatter, field: string, collection: string, slug: string) {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    fail(collection, slug, `\`${field}\` must be a non-empty string.`);
  }
  return value;
}

function optionalBoolean(
  data: Frontmatter,
  field: string,
  collection: string,
  slug: string,
) {
  const value = data[field];
  if (value !== undefined && typeof value !== "boolean") {
    fail(collection, slug, `\`${field}\` must be true or false.`);
  }
  return value as boolean | undefined;
}

function tags(data: Frontmatter, collection: string, slug: string) {
  const value = data.tags;
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((tag) => typeof tag !== "string" || tag.trim() === "")
  ) {
    fail(collection, slug, "`tags` must be a non-empty array of strings.");
  }
  return value as string[];
}

function optionalUrl(
  data: Frontmatter,
  field: "repoUrl" | "liveUrl",
  collection: string,
  slug: string,
) {
  const value = data[field];
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    fail(collection, slug, `\`${field}\` must be an absolute http(s) URL.`);
  }
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
    if (field === "repoUrl" && url.hostname === "github.com" && url.pathname === "/") {
      fail(collection, slug, "`repoUrl` cannot be the GitHub homepage placeholder.");
    }
  } catch {
    fail(collection, slug, `\`${field}\` must be an absolute http(s) URL.`);
  }
  return value;
}

function optionalDiagram(data: Frontmatter, collection: string, slug: string) {
  if (data.diagram === undefined) return undefined;
  const value = object(data.diagram, "diagram", collection, slug);
  const id = text(value, "id", collection, slug);
  if (!isDiagramId(id)) {
    fail(collection, slug, `\`diagram.id\` references unknown diagram \`${id}\`.`);
  }
  const caption = value.caption;
  if (caption !== undefined && (typeof caption !== "string" || caption.trim() === "")) {
    fail(collection, slug, "`diagram.caption` must be a non-empty string when present.");
  }
  return { id, caption: caption as string | undefined };
}

function rejectUnknown(
  data: Frontmatter,
  allowed: Set<string>,
  collection: string,
  slug: string,
) {
  const unknown = Object.keys(data).filter((key) => !allowed.has(key));
  if (unknown.length) fail(collection, slug, `unknown field(s): ${unknown.join(", ")}.`);
}

export function parseProjectFrontmatter(data: Frontmatter, slug: string): ProjectFrontmatter {
  const collection = "projects";
  rejectUnknown(data, PROJECT_FIELDS, collection, slug);
  const kind = text(data, "kind", collection, slug);
  if (kind !== "project" && kind !== "case-study") {
    fail(collection, slug, "`kind` must be `project` or `case-study`.");
  }
  const year = text(data, "year", collection, slug);
  if (!/^\d{4}$/.test(year)) fail(collection, slug, "`year` must be a four-digit string.");

  const homeOrder = data.homeOrder;
  if (
    homeOrder !== undefined &&
    (!Number.isInteger(homeOrder) || (homeOrder as number) < 1 || (homeOrder as number) > 5)
  ) {
    fail(collection, slug, "`homeOrder` must be an integer from 1 through 5.");
  }

  let metrics: Metric[] | undefined;
  if (data.metrics !== undefined) {
    if (!Array.isArray(data.metrics) || data.metrics.length === 0) {
      fail(collection, slug, "`metrics` must be a non-empty array when present.");
    }
    metrics = data.metrics.map((item, index) => {
      const metric = object(item, `metrics[${index}]`, collection, slug);
      return {
        label: text(metric, "label", collection, slug),
        value: text(metric, "value", collection, slug),
      };
    });
  }

  return {
    kind,
    title: text(data, "title", collection, slug),
    summary: text(data, "summary", collection, slug),
    role: text(data, "role", collection, slug),
    year,
    tags: tags(data, collection, slug),
    published: optionalBoolean(data, "published", collection, slug) ?? true,
    homeOrder: homeOrder as number | undefined,
    metrics,
    diagram: optionalDiagram(data, collection, slug),
    repoUrl: optionalUrl(data, "repoUrl", collection, slug),
    liveUrl: optionalUrl(data, "liveUrl", collection, slug),
  };
}

export function parseArticleFrontmatter(data: Frontmatter, slug: string): ArticleFrontmatter {
  const collection = "writing";
  rejectUnknown(data, ARTICLE_FIELDS, collection, slug);
  const date = text(data, "date", collection, slug);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    fail(collection, slug, "`date` must be a valid ISO date (YYYY-MM-DD). ");
  }
  const type = data.type ?? "note";
  if (type !== "deep-dive" && type !== "note" && type !== "build-log") {
    fail(collection, slug, "`type` must be `deep-dive`, `note`, or `build-log`.");
  }

  return {
    title: text(data, "title", collection, slug),
    summary: text(data, "summary", collection, slug),
    date,
    type: type as ArticleType,
    published: optionalBoolean(data, "published", collection, slug) ?? true,
    tags: tags(data, collection, slug),
    diagram: optionalDiagram(data, collection, slug),
  };
}
