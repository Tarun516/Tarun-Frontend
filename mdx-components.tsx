import type { MDXComponents } from "mdx/types";
import { ContentDiagram } from "@/components/diagrams";
import { Callout, CodeBlock } from "@/components/mdx";

// Global component map for MDX content (required by @next/mdx in App Router).
// Custom tags like <Callout /> are available inside any .mdx file under
// content/ because the pages render MDX through this provider.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: (props) => <CodeBlock {...props} />,
    Callout,
    ContentDiagram,
    ...components,
  };
}
