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

/** Optional architecture / flow diagram keyed in `components/diagrams`. */
export type ContentDiagram = {
  id: string;
  caption?: string;
};

/** Unified list item: projects, case studies, and articles share one UI. */
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
  diagram?: ContentDiagram;
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
  diagram?: ContentDiagram;
  /** Short body paragraphs for the article page. */
  body?: string[];
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
  /** One human sentence, not a buzzword list. */
  focus: string;
  about: {
    bio: string[];
    currentRole: {
      company: string;
      title: string;
      period: string;
      summary: string;
    };
    education: {
      school: string;
      degree: string;
      period: string;
    };
    interests: string[];
    /** Quiet tools list, shown on /about only. */
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
  role: "SDE",
  location: "Hyderabad",
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
      "I care about systems that stay correct under load: clear interfaces, intentional trade-offs, and failure modes you can reason about.",
      "Most of my time goes into backend services, execution pipelines, and the glue that makes AI features reliable in production.",
    ],
    currentRole: {
      company: "Trizen",
      title: "SDE",
      period: "May 2026 to Present",
      summary: "Building product features and backend systems.",
    },
    education: {
      school: "SRM University, AP",
      degree: "B.Tech, Computer Science",
      period: "2021 to 2025",
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
        category: "Backend",
        items: ["Node.js", "Express", "MongoDB", "Postgres", "Redis", "Docker", "Queues"],
      },
      {
        category: "Mobile",
        items: ["React Native"],
      },
      {
        category: "Product",
        items: ["React", "Next.js", "Tailwind CSS"],
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
        "Designing an execution runtime inspired by durable workflows, with deterministic scheduling, leases, and observable state.",
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
      diagram: {
        id: "execution-engine",
        caption: "Producer → durable queue → workers, with Postgres as the event log.",
      },
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
      diagram: {
        id: "context-memory",
        caption: "Corpus → embed → budget-aware rank → inject.",
      },
      repoUrl: "https://github.com",
    },
    {
      slug: "memory-os",
      kind: "project",
      title: "Memory OS",
      summary:
        "A desktop-first AI operating system for personal knowledge: capture, retrieval, and long-horizon context.",
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
      diagram: {
        id: "memory-os",
        caption: "Capture shell over a local-first memory layer used by retrieval and agents.",
      },
      repoUrl: "https://github.com",
    },
    {
      slug: "devtool-cli",
      kind: "project",
      title: "Local Agent Devtool",
      summary:
        "A CLI for running, inspecting, and replaying agent traces against fixtures, closer to a debugger than a chat UI.",
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
        "My thoughts on long-term memory for AI systems, and why stuffing the prompt is not a strategy.",
      date: "2026-02-10",
      readingTime: "8 min",
      href: "/writing/context-windows",
      published: true,
      featured: true,
      tags: ["AI", "Memory"],
      diagram: {
        id: "context-memory",
        caption: "Selection policy matters more than raw window size.",
      },
      body: [
        "Context windows feel like progress because they are measurable. Bigger number, more room, problem solved.",
        "In practice, stuffing more text into a prompt rarely creates better long-horizon behavior. It creates noisier attention, higher cost, and systems that cannot explain what they used.",
        "A better abstraction is memory with a budget: store broadly, retrieve narrowly, and cite what entered the prompt. The window is a packing constraint, not the product.",
      ],
    },
    {
      slug: "execution-engine-notes",
      title: "Building an execution engine that can fail safely",
      summary:
        "Leases, idempotency keys, and why 'retry' is not a recovery strategy by itself.",
      date: "2025-11-12",
      readingTime: "9 min",
      href: "/writing/execution-engine-notes",
      published: true,
      featured: true,
      tags: ["Systems", "Queues"],
      diagram: {
        id: "execution-engine",
        caption: "Retries only help when ownership and side effects are explicit.",
      },
      body: [
        "Retry is the most common recovery strategy and also the easiest way to create duplicate side effects.",
        "Lease-based ownership, an event log, and idempotency keys turn failure into a state problem instead of a hope problem.",
        "If you cannot answer who owns a job and whether a side effect already happened, you do not have recovery. You have roulette.",
      ],
    },
    {
      slug: "context-engineering",
      title: "Context engineering for multi-agent systems",
      summary:
        "Selecting what enters the prompt window matters more than how large the window is.",
      date: "2025-09-03",
      readingTime: "7 min",
      href: "/writing/context-engineering",
      published: false,
      tags: ["AI", "Memory"],
    },
  ],
  experience: [
    {
      company: "Trizen",
      role: "SDE",
      period: "May 2026 to Present",
      highlights: [],
    },
    {
      company: "Trizen",
      role: "SDE Intern",
      period: "Nov 2025 to May 2026",
      highlights: [
        "Built core features for a mobile marketplace app, including task management, user profiles, address management, and notification preferences, using React Native.",
        "Developed an internal leads management portal handling hundreds of onboarding entries, cutting manual lead processing time by 30 to 40%.",
        "Designed and implemented scalable backend services with Node.js and Express for authentication, user management, task orchestration, and system notifications.",
        "Built event-driven notification workflows for alerts, invitations, and account actions, integrating push notifications and email delivery.",
        "Built verification workflows to support compliance-oriented user verification.",
      ],
    },
    {
      company: "Ziegler Aerospace",
      role: "Software Developer Intern",
      period: "Apr 2025 to Aug 2025",
      highlights: [
        "Built backend APIs for a real-time B2B messaging and quotation platform with dynamic, condition-based workflows.",
        "Increased performance of complex data retrieval APIs by 30%+ using MongoDB aggregation tuning and index optimization.",
        "Refactored a monolithic backend into a modular architecture, improving maintainability and cutting code duplication by 50%.",
        "Resolved 60+ frontend and backend issues per release cycle, improving UI stability and data consistency across dynamic workflows.",
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

export function getArticle(slug: string): Article | undefined {
  return portfolio.writing.find((article) => article.slug === slug);
}

export function getPublishedArticles(): Article[] {
  return getPublishedWriting();
}
