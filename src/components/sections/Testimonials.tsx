import { useCallback, useEffect, useState } from 'react'
import { useDragScroll } from '../../hooks/useDragScroll'
import { useReveal } from '../../hooks/useReveal'
import { TESTIMONIALS } from '../../content/testimonials'
import styles from './Testimonials.module.css'

export function Testimonials() {
  const sectionRef = useReveal<HTMLElement>()
  const scrollerRef = useDragScroll<HTMLDivElement>()
  const [active, setActive] = useState(0)

  const goTo = useCallback((index: number) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const cards = scroller.querySelectorAll<HTMLElement>('[data-card]')
    const card = cards[index]
    if (!card) return
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const left =
      card.getBoundingClientRect().left -
      scroller.getBoundingClientRect().left +
      scroller.scrollLeft
    scroller.scrollTo({
      left,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
    setActive(index)
  }, [scrollerRef])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const onScroll = () => {
      const cards = Array.from(
        scroller.querySelectorAll<HTMLElement>('[data-card]'),
      )
      if (!cards.length) return
      const scrollerRect = scroller.getBoundingClientRect()
      const mid = scrollerRect.left + scroller.clientWidth / 2
      let nearest = 0
      let best = Number.POSITIVE_INFINITY
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        const dist = Math.abs(center - mid)
        if (dist < best) {
          best = dist
          nearest = index
        }
      })
      setActive(nearest)
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [scrollerRef])

  const last = TESTIMONIALS.length - 1

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
            onClick={() => goTo(Math.min(last, active + 1))}
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
              <p className={styles.quote}>{item.quote}</p>
              <div className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">
                  {item.initials}
                </span>
                <div className={styles.meta}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.role}>{item.role}</p>
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
            className={[styles.dot, index === active ? styles.dotActive : '']
              .filter(Boolean)
              .join(' ')}
            aria-label={`Отзыв ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  )
}
