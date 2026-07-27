import { Container } from "@/components/Container";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-10">
        <p className="text-sm text-muted">{portfolio.name}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-secondary">
          <a
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 ease-out hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 ease-out hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={portfolio.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 ease-out hover:text-foreground"
          >
            X
          </a>
          <a
            href={`mailto:${portfolio.email}`}
            className="transition-colors duration-200 ease-out hover:text-foreground"
          >
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
