import type { Metric } from "@/lib/content/types";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div>
      <p className="font-mono text-xs text-muted">{metric.label}</p>
      <p className="mt-2 font-display text-2xl font-medium tracking-[-0.01em] text-foreground">
        {metric.value}
      </p>
    </div>
  );
}
