/** Strip markdown syntax so reading time reflects prose, not markup. */
function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~`|-]/g, " ");
}

/**
 * Human reading time computed from the markdown body.
 * Replaces the old hand-maintained `readingTime` field.
 */
export function estimateReadingTime(markdown: string): string {
  const words = stripMarkdown(markdown)
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}
