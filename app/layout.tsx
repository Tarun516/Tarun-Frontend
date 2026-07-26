import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { portfolio } from "@/data/portfolio";
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
});

export const metadata: Metadata = {
  title: {
    default: portfolio.name,
    template: `%s — ${portfolio.name}`,
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
  openGraph: {
    title: portfolio.name,
    description: portfolio.hero.subtitle,
    type: "website",
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
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
