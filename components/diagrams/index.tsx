import type { ComponentType } from "react";
import { Diagram } from "@/components/Diagram";
import {
  AudioBatchingDiagram,
  AudioPipelineDiagram,
  AudioResamplingDiagram,
  AudioSamplingDiagram,
  ContextMemoryDiagram,
  ExecutionEngineDiagram,
  MemoryOsDiagram,
  type DiagramSvgProps,
} from "@/components/diagrams/svgs";

export const diagramRegistry = {
  "audio-pipeline": AudioPipelineDiagram,
  "audio-sampling": AudioSamplingDiagram,
  "audio-resampling": AudioResamplingDiagram,
  "audio-batching": AudioBatchingDiagram,
  "memory-os": MemoryOsDiagram,
  "execution-engine": ExecutionEngineDiagram,
  "context-memory": ContextMemoryDiagram,
} as const;

export type DiagramId = keyof typeof diagramRegistry;

export function isDiagramId(value: string): value is DiagramId {
  return value in diagramRegistry;
}

export function ContentDiagram({
  id,
  caption,
}: {
  id: DiagramId;
  caption?: string;
}) {
  const Svg = diagramRegistry[id] as ComponentType<DiagramSvgProps>;
  return (
    <Diagram caption={caption}>
      <Svg />
    </Diagram>
  );
}
