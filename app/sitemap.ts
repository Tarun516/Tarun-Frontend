import type { MetadataRoute } from "next";
import { getAllProjects, getPublishedArticles } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/writing", "/about"].map((path) => ({
    url: absoluteUrl(path || "/"),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const projects = getAllProjects().map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const writing = getPublishedArticles().map((article) => ({
    url: absoluteUrl(`/writing/${article.slug}`),
    lastModified: new Date(`${article.date}T00:00:00.000Z`),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projects, ...writing];
}
