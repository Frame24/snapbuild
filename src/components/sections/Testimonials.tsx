import { useCallback, useEffect, useRef, useState } from 'react'
import { assetUrl } from '../../lib/assets'
import { cx } from '../../lib/cx'
import { prefersReducedMotion } from '../../lib/media'
import { useDragScroll } from '../../hooks/useDragScroll'
import { useReveal } from '../../hooks/useReveal'
import { TESTIMONIALS } from '../../content/testimonials'
import styles from './Testimonials.module.css'

const END_EPS = 4

function cardOffset(scroller: HTMLElement, card: HTMLElement) {
  return (
    card.getBoundingClientRect().left -
    scroller.getBoundingClientRect().left +
    scroller.scrollLeft
  )
}

function maxScroll(scroller: HTMLElement) {
  return Math.max(0, scroller.scrollWidth - scroller.clientWidth)
}

function isAtEnd(scroller: HTMLElement) {
  return scroller.scrollLeft >= maxScroll(scroller) - END_EPS
}

function leadingIndex(scroller: HTMLElement) {
  const cards = Array.from(
    scroller.querySelectorAll<HTMLElement>('[data-card]'),
  )
  if (!cards.length) return 0

  const origin =
    scroller.getBoundingClientRect().left + cardOffset(scroller, cards[0])

  let best = 0
  let dist = Number.POSITIVE_INFINITY
  cards.forEach((card, index) => {
    const next = Math.abs(card.getBoundingClientRect().left - origin)
    if (next < dist) {
      dist = next
      best = index
    }
  })
  return best
}

export function Testimonials() {
  const sectionRef = useReveal<HTMLElement>()
  const scrollerRef = useDragScroll<HTMLDivElement>()
  const last = TESTIMONIALS.length - 1
  const [active, setActive] = useState(0)
  const pinnedLastRef = useRef(false)

  const setPinnedLast = (value: boolean) => {
    pinnedLastRef.current = value
  }

  const sync = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const atEnd = isAtEnd(scroller)
    const leading = leadingIndex(scroller)
    if (!atEnd) {
      setPinnedLast(false)
      setActive(leading)
      return
    }
    setActive(pinnedLastRef.current ? last : leading)
  }, [last, scrollerRef])

  const goTo = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current
      if (!scroller) return
      const cards = scroller.querySelectorAll<HTMLElement>('[data-card]')
      const reduceMotion = prefersReducedMotion()
      const behavior = reduceMotion ? 'auto' : 'smooth'

      if (index >= last) {
        setPinnedLast(true)
        setActive(last)
        scroller.scrollTo({ left: maxScroll(scroller), behavior })
        return
      }

      const card = cards[index]
      if (!card) return
      setPinnedLast(false)
      setActive(index)
      scroller.scrollTo({
        left: cardOffset(scroller, card) - cardOffset(scroller, cards[0]),
        behavior,
      })
    },
    [last, scrollerRef],
  )

  const goNext = () => {
    const scroller = scrollerRef.current
    if (!scroller) return
    if (isAtEnd(scroller) && !pinnedLastRef.current) {
      setPinnedLast(true)
      setActive(last)
      return
    }
    goTo(Math.min(last, active + 1))
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    let pointerX = 0
    let touchX = 0

    const pinIfNeeded = (goingNext: boolean) => {
      if (!goingNext || !isAtEnd(scroller)) return
      setPinnedLast(true)
      setActive(last)
    }

    const onPointerDown = (event: PointerEvent) => {
      pointerX = event.pageX
    }
    const onPointerMove = (event: PointerEvent) => {
      if (scroller.dataset.dragging !== 'true') {
        pointerX = event.pageX
        return
      }
      const goingNext = pointerX - event.pageX > 2
      pointerX = event.pageX
      pinIfNeeded(goingNext)
    }
    const onTouchStart = (event: TouchEvent) => {
      touchX = event.touches[0]?.clientX ?? 0
    }
    const onTouchMove = (event: TouchEvent) => {
      const x = event.touches[0]?.clientX ?? touchX
      const goingNext = touchX - x > 2
      touchX = x
      pinIfNeeded(goingNext)
    }
    const onWheel = (event: WheelEvent) => {
      pinIfNeeded(event.deltaX > 2)
    }

    sync()
    scroller.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    scroller.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    scroller.addEventListener('touchstart', onTouchStart, { passive: true })
    scroller.addEventListener('touchmove', onTouchMove, { passive: true })
    scroller.addEventListener('wheel', onWheel, { passive: true })

    const images = scroller.querySelectorAll('img')
    images.forEach((image) => image.addEventListener('load', sync))

    return () => {
      scroller.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      scroller.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      scroller.removeEventListener('touchstart', onTouchStart)
      scroller.removeEventListener('touchmove', onTouchMove)
      scroller.removeEventListener('wheel', onWheel)
      images.forEach((image) => image.removeEventListener('load', sync))
    }
  }, [last, scrollerRef, sync])

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} reveal`}
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <header className={styles.header}>
        <div className={styles.heading}>
          <h2 className={styles.title} id="testimonials-title">
            Команды, которым важен бренд
          </h2>
          <p className={styles.subtitle}>
            Как отделы перестают собирать материалы вручную и перестают
            согласовывать каждое отклонение от системы
          </p>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Предыдущий отзыв"
            disabled={active === 0}
            onClick={() => goTo(Math.max(0, active - 1))}
          >
            <span className={styles.chevronPrev} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Следующий отзыв"
            disabled={active === last}
            onClick={goNext}
          >
            <span className={styles.chevronNext} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        ref={scrollerRef}
        className={styles.scroller}
        aria-roledescription="карусель"
      >
        <div className={styles.track}>
          {TESTIMONIALS.map((item) => (
            <article key={item.id} className={styles.card} data-card>
              <img
                className={styles.media}
                src={assetUrl(item.image)}
                alt={item.imageAlt}
                width={560}
                height={320}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.body}>
                <p className={styles.quote}>{item.quote}</p>
                <p className={styles.result}>{item.result}</p>
                <div className={styles.author}>
                  <span className={styles.avatar} aria-hidden="true">
                    {item.initials}
                  </span>
                  <div className={styles.meta}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.role}>
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Отзывы">
        {TESTIMONIALS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={cx(styles.dot, index === active && styles.dotActive)}
            aria-label={`Отзыв ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  )
}
