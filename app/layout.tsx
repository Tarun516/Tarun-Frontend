import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeScript } from "@/components/theme-script";
import { Navbar } from "@/components/Navbar";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  // Code font isn't needed above the fold — don't compete with Manrope
  // during initial load (performance rule, design-system.md).
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
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${jetbrains.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:border focus:border-border focus:bg-surface focus:px-3 focus:py-2 focus:text-sm lg:focus:left-[14rem]"
          >
            Skip to content
          </a>
          <Navbar />
          <div className="flex min-h-full flex-1 flex-col lg:pl-52">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
