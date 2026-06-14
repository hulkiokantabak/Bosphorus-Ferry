// Centralised "does the user want less motion?" check.
// Used by the typewriter (animate vs. reveal instantly) and the intro
// (full timed title sequence vs. a brief static card), and mirrored by the
// `prefers-reduced-motion` CSS block in index.css.

export function prefersReducedMotion(): boolean {
  try {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch {
    return false;
  }
}
