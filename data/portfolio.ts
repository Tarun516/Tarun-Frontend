export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type EntryKind = "case-study" | "project" | "article" | "note";

export type Metric = {
  label: string;
  value: string;
};

export type TechChoice = {
  choice: string;
  why: string;
};

/** Unified list item — projects, case studies, and articles share one UI. */
export type ContentEntry = {
  id: string;
  kind: EntryKind;
  title: string;
  summary: string;
  year: string;
  href: string;
  featured?: boolean;
};

export type CaseStudy = {
  slug: string;
  kind: "case-study" | "project";
  title: string;
  summary: string;
  role: string;
  year: string;
  tags: string[];
  featured?: boolean;
  problem: string;
  architecture: string[];
  techChoices: TechChoice[];
  challenges: string[];
  tradeoffs: string[];
  lessons: string[];
  metrics?: Metric[];
  repoUrl?: string;
  liveUrl?: string;
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  href: string;
  published: boolean;
  featured?: boolean;
  tags: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type PortfolioContent = {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
  hero: {
    greeting: string;
    tagline: string;
    subtitle: string;
  };
  /** One human sentence — not a buzzword list. */
  focus: string;
  about: {
    bio: string[];
    currentRole: {
      company: string;
      title: string;
      period: string;
      summary: string;
    };
    interests: string[];
    /** Quiet tools list — shown on /about only. */
    tools: {
      category: string;
      items: string[];
    }[];
  };
  nav: NavItem[];
  projects: CaseStudy[];
  writing: Article[];
  experience: Experience[];
};

const KIND_LABEL: Record<EntryKind, string> = {
  "case-study": "Case Study",
  project: "Project",
  article: "Article",
  note: "Note",
};

export function kindLabel(kind: EntryKind): string {
  return KIND_LABEL[kind];
}

/**
 * Single source of truth.
 * Homepage = hero → projects → articles & case studies.
 * Everything is content; only the kind label changes.
 */
export const portfolio: PortfolioContent = {
  name: "C V Tarun",
  role: "Software Engineer",
  location: "India",
  email: "taruncv516@gmail.com",
  github: "https://github.com/Tarun516",
  linkedin: "https://www.linkedin.com/in/c-v-tarun-19448124b/",
  twitter: "https://x.com/TarunAwsom28989",
  resumeUrl: "/resume.pdf",
  hero: {
    greeting: "Hey, I'm Tarun.",
    tagline: "engineering systems, AI infrastructure, and developer tools.",
    subtitle:
      "I build backend infrastructure, AI agents, and products focused on developer experience.",
  },
  focus:
    "Currently building Memory OS while exploring execution runtimes, context engineering, and AI infrastructure.",
  about: {
    bio: [
      "I care about systems that stay correct under load — clear interfaces, intentional trade-offs, and failure modes you can reason about.",
      "Most of my time goes into backend services, execution pipelines, and the glue that makes AI features reliable in production.",
    ],
    currentRole: {
      company: "Trizen",
      title: "Software Engineer",
      period: "2025 — Present",
      summary: "Building AI-native backend systems.",
    },
    interests: [
      "Agent runtimes & orchestration",
      "Memory systems & retrieval",
      "Distributed execution",
      "Developer tooling",
    ],
    tools: [
      {
        category: "Languages",
        items: ["TypeScript", "JavaScript", "Python", "SQL"],
      },
      {
        category: "Systems",
        items: ["Node.js", "Postgres", "Redis", "Docker", "Queues"],
      },
      {
        category: "AI",
        items: ["LLM APIs", "Retrieval", "Tool calling", "Eval harnesses"],
      },
      {
        category: "Product",
        items: ["Next.js", "React", "Tailwind CSS"],
      },
    ],
  },
  nav: [
    { label: "Projects", href: "/#projects" },
    { label: "Writing", href: "/#writing" },
    { label: "About", href: "/about" },
    { label: "GitHub", href: "https://github.com/Tarun516", external: true },
  ],
  projects: [
    {
      slug: "execution-engine",
      kind: "case-study",
      title: "Distributed Execution Engine",
      summary:
        "Designing an execution runtime inspired by durable workflows — with deterministic scheduling, leases, and observable state.",
      role: "Systems design & implementation",
      year: "2026",
      tags: ["TypeScript", "Queues", "Postgres", "Redis"],
      featured: false,
      problem:
        "AI workflows were failing silently, retrying unsafely, and offering no clear view of where a run was stuck. Operators needed durability without turning every workflow into a brittle state machine.",
      architecture: [
        "Workers pull jobs from a durable queue with lease-based ownership.",
        "Execution state lives in Postgres; Redis handles short-lived coordination and rate limits.",
        "A small event log records transitions so retries and audits share the same source of truth.",
        "Side effects are gated behind idempotency keys so replays never double-charge external systems.",
      ],
      techChoices: [
        {
          choice: "Postgres as system of record",
          why: "Strong consistency for job state, easier operational tooling, and transactional outbox patterns.",
        },
        {
          choice: "Lease-based workers",
          why: "Avoids split-brain ownership when a worker dies mid-task.",
        },
        {
          choice: "Explicit state machine",
          why: "Makes illegal transitions impossible and simplifies recovery logic.",
        },
      ],
      challenges: [
        "Exactly-once side effects across flaky model APIs.",
        "Backpressure when fan-out jobs explode under bursty traffic.",
        "Debugging delayed failures without drowning in logs.",
      ],
      tradeoffs: [
        "Chose durability and clarity over maximum throughput.",
        "Accepted slightly higher write amplification for a searchable event history.",
        "Kept the control plane intentionally small instead of adopting a full workflow product too early.",
      ],
      lessons: [
        "Idempotency is a product feature, not an implementation detail.",
        "Observable state beats clever retries.",
        "Start with a narrow execution model; generalize after real workloads appear.",
      ],
      metrics: [
        { label: "p99 recovery", value: "< 2s" },
        { label: "Duplicate side effects", value: "0" },
        { label: "Ops MTTR", value: "-60%" },
      ],
      repoUrl: "https://github.com",
    },
    {
      slug: "context-memory",
      kind: "case-study",
      title: "Context Memory Service",
      summary:
        "A retrieval layer that stores, ranks, and injects long-term context for multi-agent systems without blowing the prompt window.",
      role: "Backend & retrieval",
      year: "2025",
      tags: ["Embeddings", "Node.js", "Vector search"],
      featured: true,
      problem:
        "Agents either forgot useful prior context or stuffed the prompt until latency and cost collapsed. The system needed selective memory with predictable budgets.",
      architecture: [
        "Documents are chunked, embedded, and stored with provenance metadata.",
        "A ranking stage combines recency, relevance, and policy filters before injection.",
        "Hot paths use a cache tier; cold paths fall back to vector search.",
        "Every injected snippet is attributed so agents can cite what they used.",
      ],
      techChoices: [
        {
          choice: "Hybrid ranking",
          why: "Pure vector similarity missed temporal and permission constraints.",
        },
        {
          choice: "Token budgets as first-class input",
          why: "Downstream models vary; the memory service must pack under a hard limit.",
        },
      ],
      challenges: [
        "Stale or contradictory memories polluting agent decisions.",
        "Keeping retrieval latency stable as the corpus grew.",
      ],
      tradeoffs: [
        "Preferred deterministic ranking rules over opaque rerankers for early debugging.",
        "Accepted approximate recall for much better latency at the edge.",
      ],
      lessons: [
        "Memory quality depends more on selection policy than on embedding model choice.",
        "Attribution makes trust and evaluation possible.",
      ],
      metrics: [
        { label: "Avg tokens saved", value: "48%" },
        { label: "p95 retrieval", value: "90ms" },
      ],
      repoUrl: "https://github.com",
    },
    {
      slug: "memory-os",
      kind: "project",
      title: "Memory OS",
      summary:
        "A desktop-first AI operating system for personal knowledge — capture, retrieval, and long-horizon context.",
      role: "Product & systems",
      year: "2026",
      tags: ["AI", "Desktop", "Memory"],
      featured: true,
      problem:
        "Personal knowledge is fragmented across notes, chats, and files. Agents need a durable memory layer that still feels like a product, not a database.",
      architecture: [
        "Local-first store with sync boundaries for private data.",
        "Background indexing pipeline for documents and conversation traces.",
        "A thin shell UI focused on search, capture, and citation.",
      ],
      techChoices: [
        {
          choice: "Local-first where possible",
          why: "Privacy and latency matter more than multiplayer collaboration for personal memory.",
        },
      ],
      challenges: ["Keeping retrieval trustworthy as the corpus grows."],
      tradeoffs: ["Product surface stays minimal so the memory layer can evolve."],
      lessons: ["The OS metaphor only works if capture is frictionless."],
      repoUrl: "https://github.com",
    },
    {
      slug: "devtool-cli",
      kind: "project",
      title: "Local Agent Devtool",
      summary:
        "A CLI for running, inspecting, and replaying agent traces against fixtures — closer to a debugger than a chat UI.",
      role: "Solo build",
      year: "2024",
      tags: ["CLI", "TypeScript", "DX"],
      problem:
        "Agent behavior was hard to reproduce. Developers needed deterministic fixtures and step-level inspection.",
      architecture: [
        "Trace files capture tool calls, prompts, and timings.",
        "Replay mode stubs tools and freezes model responses for regression tests.",
      ],
      techChoices: [
        {
          choice: "File-based traces",
          why: "Easy to diff, commit, and share without a hosted backend.",
        },
      ],
      challenges: ["Keeping replays stable across model version changes."],
      tradeoffs: [
        "Optimized for local workflows over multiplayer collaboration.",
      ],
      lessons: [
        "Developer tooling should make failure cheap to inspect.",
      ],
      repoUrl: "https://github.com",
    },
    {
      slug: "queue-lab",
      kind: "project",
      title: "Queue Semantics Lab",
      summary:
        "Small experiments comparing at-least-once, lease, and outbox patterns with measurable failure injection.",
      role: "Research / notes",
      year: "2024",
      tags: ["Distributed systems", "Redis", "Postgres"],
      problem:
        "Queue tutorials hide the hard parts. I wanted a playground that surfaces retries, duplicates, and poison messages.",
      architecture: [
        "Each pattern ships as a tiny service with the same workload generator.",
        "Chaos hooks kill workers and delay acknowledgements on demand.",
      ],
      techChoices: [
        {
          choice: "Shared workload harness",
          why: "Comparisons only matter if the load and failure model stay constant.",
        },
      ],
      challenges: ["Making failure modes visible without drowning in metrics."],
      tradeoffs: ["Clarity over production readiness."],
      lessons: [
        "Most 'queue bugs' are ownership and idempotency bugs.",
      ],
      repoUrl: "https://github.com",
    },
    {
      slug: "api-gateway-kit",
      kind: "project",
      title: "Typed API Gateway Kit",
      summary:
        "A starter for authenticated internal APIs with rate limits, schema validation, and structured error envelopes.",
      role: "Open source kit",
      year: "2024",
      tags: ["Node.js", "Zod", "Auth", "OpenAPI"],
      problem:
        "Internal services repeatedly reinvented auth middleware and inconsistent error shapes.",
      architecture: [
        "Request validation at the edge, typed handlers in the middle, uniform errors out.",
        "OpenAPI generated from the same schemas used at runtime.",
      ],
      techChoices: [
        {
          choice: "Schema-first contracts",
          why: "One definition for validation, docs, and client generation.",
        },
      ],
      challenges: ["Keeping generated docs honest as handlers evolve."],
      tradeoffs: [
        "Slightly more boilerplate early; much less ambiguity later.",
      ],
      lessons: ["Contracts beat tribal knowledge."],
      repoUrl: "https://github.com",
    },
  ],
  writing: [
    {
      slug: "context-windows",
      title: "Why Context Windows Are The Wrong Abstraction",
      summary:
        "My thoughts on long-term memory for AI systems — and why stuffing the prompt is not a strategy.",
      date: "2026-02-10",
      readingTime: "8 min",
      href: "/writing",
      published: true,
      featured: true,
      tags: ["AI", "Memory"],
    },
    {
      slug: "execution-engine-notes",
      title: "Building an execution engine that can fail safely",
      summary:
        "Leases, idempotency keys, and why 'retry' is not a recovery strategy by itself.",
      date: "2025-11-12",
      readingTime: "9 min",
      href: "/writing",
      published: true,
      featured: true,
      tags: ["Systems", "Queues"],
    },
    {
      slug: "context-engineering",
      title: "Context engineering for multi-agent systems",
      summary:
        "Selecting what enters the prompt window matters more than how large the window is.",
      date: "2025-09-03",
      readingTime: "7 min",
      href: "/writing",
      published: false,
      tags: ["AI", "Memory"],
    },
  ],
  experience: [
    {
      company: "Trizen",
      role: "Software Engineer",
      period: "2025 — Present",
      highlights: [
        "Building backend systems and AI-native workflows.",
        "Focus on durability, observability, and clean interfaces.",
      ],
    },
    {
      company: "Previous Role",
      role: "Backend Engineer",
      period: "2022 — 2024",
      highlights: [
        "Owned APIs and data pipelines with an emphasis on reliability.",
        "Shipped features that stayed operable after launch.",
      ],
    },
  ],
};

function projectToEntry(project: CaseStudy): ContentEntry {
  return {
    id: `project-${project.slug}`,
    kind: project.kind,
    title: project.title,
    summary: project.summary,
    year: project.year,
    href: `/projects/${project.slug}`,
    featured: project.featured,
  };
}

function articleToEntry(article: Article): ContentEntry {
  return {
    id: `article-${article.slug}`,
    kind: "article",
    title: article.title,
    summary: article.summary,
    year: article.date.slice(0, 4),
    href: article.href,
    featured: article.featured,
  };
}

export function getAllEntries(): ContentEntry[] {
  const projects = portfolio.projects.map(projectToEntry);
  const articles = getPublishedWriting().map(articleToEntry);
  return [...projects, ...articles].sort((a, b) =>
    b.year.localeCompare(a.year),
  );
}

/** Homepage: featured product/build projects. */
export function getHomeProjects(): ContentEntry[] {
  return getAllEntries().filter(
    (entry) => entry.featured && entry.kind === "project",
  );
}

/** Homepage: featured case studies + articles. */
export function getHomeWriting(): ContentEntry[] {
  return getAllEntries().filter(
    (entry) =>
      entry.featured &&
      (entry.kind === "case-study" || entry.kind === "article"),
  );
}

export function getAllCaseStudies(): CaseStudy[] {
  return portfolio.projects;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return portfolio.projects.find((item) => item.slug === slug);
}

export function getPublishedWriting(): Article[] {
  return portfolio.writing.filter((article) => article.published);
}
