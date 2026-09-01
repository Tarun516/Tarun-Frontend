export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

/**
 * Global site facts only.
 *
 * Long-form content (project case studies, articles) lives as MDX under
 * `content/` and is loaded through `lib/content`. This file holds the
 * things that are not derivable from content files: identity, links,
 * hero copy, about page data, navigation, and experience history.
 */
export const portfolio = {
  name: "C V Tarun",
  role: "SDE",
  location: "Hyderabad",
  email: "taruncv516@gmail.com",
  github: "https://github.com/Tarun516",
  linkedin: "https://www.linkedin.com/in/c-v-tarun-19448124b/",
  twitter: "https://x.com/TarunAwsom28989",
  resumeUrl: "",
  hero: {
    greeting: "Hey, I'm Tarun.",
    tagline: "I build AI systems, realtime software, and developer infrastructure.",
    subtitle:
      "I build backend infrastructure, AI agents, and products focused on developer experience.",
  },
  /** One human sentence, not a buzzword list. */
  focus:
    "Currently building Memory OS while exploring agent runtimes, voice AI, context engineering, and production AI infrastructure.",
  about: {
    path:
      "",
    beyond:
      "Away from immediate product deadlines, I like studying the ideas that make complex systems easier to reason about—memory and retrieval, distributed execution, realtime interaction, and developer tools that make failure visible.",
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
    /** Quiet tools list, shown on /about only. */
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
    ] as { category: string; items: string[] }[],
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Writing", href: "/writing" },
  ] as NavItem[],
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
  ] as Experience[],
};

export type PortfolioContent = typeof portfolio;
