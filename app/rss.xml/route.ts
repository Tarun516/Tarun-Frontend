import { portfolio } from "@/data/portfolio";
import { getPublishedArticles } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

function xml(value: string): string {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] ?? character);
}

export function GET() {
  const items = getPublishedArticles()
    .map((article) => {
      const url = absoluteUrl(`/writing/${article.slug}`);
      return `<item><title>${xml(article.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${article.date}T00:00:00.000Z`).toUTCString()}</pubDate><description>${xml(article.summary)}</description></item>`;
    })
    .join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(`${portfolio.name} — Writing`)}</title><link>${absoluteUrl("/writing")}</link><description>${xml("Thoughts on building AI systems, infrastructure and products.")}</description><language>en</language>${items}</channel></rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
