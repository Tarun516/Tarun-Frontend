/** Shared SVG props for theme-aware stroke diagrams. */
export type DiagramSvgProps = {
  className?: string;
  title?: string;
};

export function MemoryOsDiagram({
  className = "",
  title = "Memory OS architecture",
}: DiagramSvgProps) {
  return (
    <svg
      viewBox="0 0 640 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <rect
        x="220"
        y="16"
        width="200"
        height="48"
        rx="10"
        className="stroke-border-bright"
        strokeWidth="1.5"
      />
      <text
        x="320"
        y="45"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
      >
        Capture shell
      </text>

      <path
        d="M320 64v28"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M314 86l6 8 6-8"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect
        x="180"
        y="100"
        width="280"
        height="56"
        rx="10"
        className="stroke-accent"
        strokeWidth="1.5"
      />
      <text
        x="320"
        y="125"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
      >
        Memory layer
      </text>
      <text
        x="320"
        y="143"
        textAnchor="middle"
        className="fill-muted"
        style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        index · rank · cite
      </text>

      <path
        d="M240 156v28"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M400 156v28"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M234 178l6 8 6-8"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M394 178l6 8 6-8"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect
        x="120"
        y="196"
        width="180"
        height="48"
        rx="10"
        className="stroke-border-bright"
        strokeWidth="1.5"
      />
      <text
        x="210"
        y="225"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
      >
        Local-first store
      </text>

      <rect
        x="340"
        y="196"
        width="180"
        height="48"
        rx="10"
        className="stroke-border-bright"
        strokeWidth="1.5"
      />
      <text
        x="430"
        y="225"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
      >
        Retrieval / agents
      </text>
    </svg>
  );
}

export function ExecutionEngineDiagram({
  className = "",
  title = "Distributed execution engine",
}: DiagramSvgProps) {
  return (
    <svg
      viewBox="0 0 640 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <rect
        x="40"
        y="88"
        width="140"
        height="56"
        rx="10"
        className="stroke-border-bright"
        strokeWidth="1.5"
      />
      <text
        x="110"
        y="121"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
      >
        Producer
      </text>

      <path
        d="M180 116h48"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M220 110l8 6-8 6"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect
        x="236"
        y="80"
        width="168"
        height="72"
        rx="10"
        className="stroke-accent"
        strokeWidth="1.5"
      />
      <text
        x="320"
        y="110"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
      >
        Durable queue
      </text>
      <text
        x="320"
        y="130"
        textAnchor="middle"
        className="fill-muted"
        style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        leases · retries
      </text>

      <path
        d="M404 116h48"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M444 110l8 6-8 6"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect
        x="460"
        y="88"
        width="140"
        height="56"
        rx="10"
        className="stroke-border-bright"
        strokeWidth="1.5"
      />
      <text
        x="530"
        y="121"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
      >
        Workers
      </text>

      <path
        d="M320 152v28"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M314 174l6 8 6-8"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect
        x="220"
        y="192"
        width="200"
        height="48"
        rx="10"
        className="stroke-border-bright"
        strokeWidth="1.5"
      />
      <text
        x="320"
        y="221"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
      >
        Postgres event log
      </text>
    </svg>
  );
}

export function ContextMemoryDiagram({
  className = "",
  title = "Context memory flow",
}: DiagramSvgProps) {
  return (
    <svg
      viewBox="0 0 640 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      {[
        { x: 40, label: "Corpus" },
        { x: 200, label: "Embed" },
        { x: 360, label: "Rank" },
        { x: 520, label: "Inject" },
      ].map((node, index) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y="82"
            width="100"
            height="48"
            rx="10"
            className={index === 2 ? "stroke-accent" : "stroke-border-bright"}
            strokeWidth="1.5"
          />
          <text
            x={node.x + 50}
            y="111"
            textAnchor="middle"
            className="fill-foreground"
            style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
          >
            {node.label}
          </text>
          {index < 3 ? (
            <>
              <path
                d={`M${node.x + 100} 106h52`}
                className="stroke-muted"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d={`M${node.x + 144} 100l8 6-8 6`}
                className="stroke-muted"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : null}
        </g>
      ))}
      <text
        x="320"
        y="48"
        textAnchor="middle"
        className="fill-muted"
        style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        budget-aware retrieval
      </text>
    </svg>
  );
}
