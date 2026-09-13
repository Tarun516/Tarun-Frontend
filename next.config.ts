import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow .md/.mdx files to be imported as pages and content.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm",
      // Strip YAML frontmatter out of the compiled MDX body. Without
      // this, the `---` block renders as raw text above the content.
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
    rehypePlugins: [
      // Generate stable heading ids for deep-dive indexes and direct links.
      "rehype-slug",
    ],
  },
});

export default withMDX(nextConfig);
