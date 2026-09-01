import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeScript } from "@/components/theme-script";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  // Code font isn't needed above the fold — don't compete with Inter /
  // Inter Tight during initial load (performance rule, design-system.md).
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: portfolio.name,
    template: `%s · ${portfolio.name}`,
  },
  description: portfolio.hero.subtitle,
  keywords: [
    portfolio.name,
    "software engineer",
    "backend infrastructure",
    "AI systems",
    "distributed systems",
  ],
  authors: [{ name: portfolio.name }],
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    title: portfolio.name,
    description: portfolio.hero.subtitle,
    type: "website",
    url: "/",
    siteName: portfolio.name,
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.name,
    description: portfolio.hero.subtitle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
