import { useEffect, useRef } from 'react'

/** Горизонтальный drag-scroll, как у роадмапа на snapbuild.ru */
export function useDragScroll<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const scroller = ref.current
    if (!scroller) return

    let dragging = false
    let startX = 0
    let startLeft = 0

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      dragging = true
      startX = event.pageX
      startLeft = scroller.scrollLeft
      scroller.dataset.dragging = 'true'
      event.preventDefault()
    }

    const onMove = (event: PointerEvent) => {
      if (!dragging) return
      scroller.scrollLeft = startLeft - (event.pageX - startX)
    }

    const release = () => {
      if (!dragging) return
      dragging = false
      delete scroller.dataset.dragging
    }

    scroller.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    window.addEventListener('blur', release)

    return () => {
      scroller.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
      window.removeEventListener('blur', release)
    }
  }, [])

  return ref
}
