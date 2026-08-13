type TabKeyEvent = {
  key: string
  preventDefault: () => void
}

export function nextTabIndex(
  key: string,
  index: number,
  count: number,
): number | null {
  const last = count - 1
  if (key === 'ArrowRight' || key === 'ArrowDown') {
    return index === last ? 0 : index + 1
  }
  if (key === 'ArrowLeft' || key === 'ArrowUp') {
    return index === 0 ? last : index - 1
  }
  if (key === 'Home') return 0
  if (key === 'End') return last
  return null
}

export function handleTabListKeyDown(
  event: TabKeyEvent,
  index: number,
  count: number,
  onIndex: (index: number) => void,
): void {
  const next = nextTabIndex(event.key, index, count)
  if (next === null) return
  event.preventDefault()
  onIndex(next)
}
