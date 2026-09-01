const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? // development url
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? // production url
  process.env.VERCEL_URL; // vercel url

export const siteUrl = new URL(
  configuredUrl
    ? configuredUrl.startsWith("http")
      ? configuredUrl
      : `https://${configuredUrl}`
    : "http://localhost:3000",
);

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
