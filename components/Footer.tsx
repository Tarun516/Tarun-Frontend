import { Container } from "@/components/Container";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer id="contact" className="mt-16 bg-footer text-footer-foreground sm:mt-20">
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[65rem]">
          <p className="font-display text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] sm:text-[2.75rem]">
            Want to talk?
          </p>
          <p className="mt-5 max-w-xl text-base leading-[1.7] text-footer-secondary sm:text-lg">
            I&apos;m always interested in thoughtful engineering problems,
            useful products, and ideas worth building.
          </p>
          <a
            href={`mailto:${portfolio.email}`}
            className="group mt-8 inline-flex items-center gap-2 text-base underline decoration-footer-border underline-offset-4 transition-colors duration-200 hover:text-white"
          >
            Email me
            <span
              aria-hidden="true"
              className="inline-block opacity-60 transition-transform duration-200 group-hover:translate-x-1"
            >
              ↗
            </span>
          </a>

          <div className="mt-20 grid gap-12 border-t border-footer-border pt-10 sm:mt-24 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:gap-24">
            <p className="font-display text-base font-medium">{portfolio.name}</p>
            <nav aria-label="Footer" className="flex flex-col items-start gap-3 text-sm text-footer-secondary">
              {portfolio.nav.map((item) => (
                <Link key={item.href} href={item.href} className="transition-colors duration-200 hover:text-footer-foreground">
                  {item.label} →
                </Link>
              ))}
            </nav>
            <div className="flex flex-col items-start gap-3 text-sm text-footer-secondary">
              {[
                ["GitHub", portfolio.github],
                ["LinkedIn", portfolio.linkedin],
                ["X", portfolio.twitter],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-footer-foreground"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
