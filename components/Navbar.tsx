import Link from "next/link";
import { Container } from "@/components/Container";
import { portfolio } from "@/data/portfolio";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 ease-out hover:text-secondary"
        >
          {portfolio.name}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-8">
          {portfolio.nav.map((item) => {
            const className =
              "text-[13px] text-secondary transition-colors duration-200 ease-out hover:text-foreground sm:text-sm";

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link key={item.label} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
