export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isTabletDown(): boolean {
  return window.matchMedia('(max-width: 1023px)').matches
}

export function centerInScroller(element: HTMLElement): void {
  if (!isTabletDown()) return
  element.scrollIntoView({
    inline: 'center',
    block: 'nearest',
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}
