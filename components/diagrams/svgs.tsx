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

export function AudioPipelineDiagram({
  className = "",
  title = "Audio pipeline from sound to model gradients",
}: DiagramSvgProps) {
  const topStages = ["Sound", "Microphone", "Sampling", "PCM", "WAV", "Raw bytes"];
  const bottomStages = ["Gradients", "Model", "Batch", "Tensor", "Preprocess", "NumPy"];

  return (
    <svg
      viewBox="0 0 720 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <text
        x="24"
        y="30"
        className="fill-muted"
        style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        PHYSICAL SIGNAL → DIGITAL REPRESENTATION
      </text>

      {topStages.map((stage, index) => {
        const x = 20 + index * 118;
        return (
          <g key={stage}>
            <rect
              x={x}
              y="54"
              width="94"
              height="52"
              rx="9"
              className={index === 2 ? "stroke-accent" : "stroke-border-bright"}
              strokeWidth="1.5"
            />
            <text
              x={x + 47}
              y="84"
              textAnchor="middle"
              className="fill-foreground"
              style={{ fontSize: 12, fontFamily: "var(--font-inter), sans-serif" }}
            >
              {stage}
            </text>
            {index < topStages.length - 1 ? (
              <>
                <path d={`M${x + 94} 80h20`} className="stroke-muted" strokeWidth="1.5" />
                <path
                  d={`M${x + 108} 75l6 5-6 5`}
                  className="stroke-muted"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : null}
          </g>
        );
      })}

      <path d="M657 106v54" className="stroke-muted" strokeWidth="1.5" />
      <path
        d="M651 154l6 7 6-7"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {bottomStages.map((stage, index) => {
        const x = 20 + index * 118;
        return (
          <g key={stage}>
            <rect
              x={x}
              y="168"
              width="94"
              height="52"
              rx="9"
              className={index === 3 ? "stroke-accent" : "stroke-border-bright"}
              strokeWidth="1.5"
            />
            <text
              x={x + 47}
              y="198"
              textAnchor="middle"
              className="fill-foreground"
              style={{ fontSize: 12, fontFamily: "var(--font-inter), sans-serif" }}
            >
              {stage}
            </text>
            {index < bottomStages.length - 1 ? (
              <>
                <path d={`M${x + 114} 194h-20`} className="stroke-muted" strokeWidth="1.5" />
                <path
                  d={`M${x + 100} 189l-6 5 6 5`}
                  className="stroke-muted"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : null}
          </g>
        );
      })}

      <text
        x="696"
        y="254"
        textAnchor="end"
        className="fill-muted"
        style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        MODEL-READY DATA → LEARNING
      </text>
    </svg>
  );
}

export function AudioSamplingDiagram({
  className = "",
  title = "A continuous waveform sampled at regular intervals",
}: DiagramSvgProps) {
  const samples = [
    { x: 88, y: 126, value: "+0.1" },
    { x: 150, y: 76, value: "+0.8" },
    { x: 212, y: 58, value: "+1.0" },
    { x: 274, y: 98, value: "+0.5" },
    { x: 336, y: 152, value: "−0.3" },
    { x: 398, y: 184, value: "−0.8" },
    { x: 460, y: 164, value: "−0.5" },
    { x: 522, y: 112, value: "+0.2" },
    { x: 584, y: 72, value: "+0.8" },
  ];

  return (
    <svg
      viewBox="0 0 680 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <path d="M48 132h584" className="stroke-border" strokeWidth="1" />
      <path
        d="M48 132C92 118 116 72 172 62s90 28 130 70 74 66 118 48 70-82 118-98 68-4 94 22"
        className="stroke-secondary"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {samples.map((sample) => (
        <g key={sample.x}>
          <path
            d={`M${sample.x} ${sample.y}v88`}
            className="stroke-border-bright"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <circle cx={sample.x} cy={sample.y} r="4" className="fill-accent" />
          <text
            x={sample.x}
            y="236"
            textAnchor="middle"
            className="fill-muted"
            style={{ fontSize: 10, fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {sample.value}
          </text>
        </g>
      ))}
      <text
        x="48"
        y="30"
        className="fill-muted"
        style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        AMPLITUDE
      </text>
      <text
        x="632"
        y="150"
        textAnchor="end"
        className="fill-muted"
        style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        TIME →
      </text>
    </svg>
  );
}

export function AudioResamplingDiagram({
  className = "",
  title = "Resampling three seconds of audio from 48 to 16 kilohertz",
}: DiagramSvgProps) {
  const cards = [
    { x: 28, heading: "48 kHz", detail: "144,000 frames" },
    { x: 248, heading: "Anti-alias filter", detail: "then resample" },
    { x: 468, heading: "16 kHz", detail: "48,000 frames" },
  ];

  return (
    <svg
      viewBox="0 0 680 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      {cards.map((card, index) => (
        <g key={card.heading}>
          <rect
            x={card.x}
            y="62"
            width="184"
            height="96"
            rx="12"
            className={index === 1 ? "stroke-accent" : "stroke-border-bright"}
            strokeWidth="1.5"
          />
          <text
            x={card.x + 92}
            y="103"
            textAnchor="middle"
            className="fill-foreground"
            style={{ fontSize: 14, fontFamily: "var(--font-inter), sans-serif" }}
          >
            {card.heading}
          </text>
          <text
            x={card.x + 92}
            y="128"
            textAnchor="middle"
            className="fill-muted"
            style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {card.detail}
          </text>
          {index < cards.length - 1 ? (
            <>
              <path d={`M${card.x + 184} 110h36`} className="stroke-muted" strokeWidth="1.5" />
              <path
                d={`M${card.x + 212} 104l8 6-8 6`}
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
        x="340"
        y="202"
        textAnchor="middle"
        className="fill-accent"
        style={{ fontSize: 12, fontFamily: "var(--font-inter), sans-serif" }}
      >
        duration remains approximately 3 seconds
      </text>
    </svg>
  );
}

export function AudioBatchingDiagram({
  className = "",
  title = "Variable-length waveforms padded into one batch with masks",
}: DiagramSvgProps) {
  const rows = [
    { y: 58, valid: 112, label: "[1, 16000]" },
    { y: 106, valid: 224, label: "[1, 32000]" },
    { y: 154, valid: 168, label: "[1, 24000]" },
  ];

  return (
    <svg
      viewBox="0 0 700 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <text
        x="24"
        y="28"
        className="fill-muted"
        style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        INDIVIDUAL WAVEFORMS
      </text>
      {rows.map((row) => (
        <g key={row.y}>
          <path
            d={`M24 ${row.y}h${row.valid}`}
            className="stroke-accent"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <text
            x="262"
            y={row.y + 4}
            textAnchor="end"
            className="fill-muted"
            style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {row.label}
          </text>
        </g>
      ))}

      <path d="M286 112h54" className="stroke-muted" strokeWidth="1.5" />
      <path
        d="M332 106l8 6-8 6"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="313"
        y="92"
        textAnchor="middle"
        className="fill-muted"
        style={{ fontSize: 10, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        PAD
      </text>

      <rect
        x="364"
        y="42"
        width="308"
        height="150"
        rx="12"
        className="stroke-border-bright"
        strokeWidth="1.5"
      />
      {[76, 116, 156].map((y, index) => {
        const validWidth = [132, 264, 198][index];
        return (
          <g key={y}>
            <path
              d={`M386 ${y}h${validWidth}`}
              className="stroke-accent"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {validWidth < 264 ? (
              <path
                d={`M${386 + validWidth + 7} ${y}h${257 - validWidth}`}
                className="stroke-border"
                strokeWidth="12"
                strokeLinecap="round"
              />
            ) : null}
          </g>
        );
      })}
      <text
        x="518"
        y="224"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}
      >
        waveforms [3, 1, 32000]
      </text>
      <text
        x="518"
        y="248"
        textAnchor="middle"
        className="fill-muted"
        style={{ fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
      >
        mask [3, 32000] · 1 valid / 0 padded
      </text>
    </svg>
  );
}
