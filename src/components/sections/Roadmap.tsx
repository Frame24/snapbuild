import type { CSSProperties } from 'react'
import { cx } from '../../lib/cx'
import section from '../ui/Section.module.css'
import { useReveal } from '../../hooks/useReveal'
import { useDragScroll } from '../../hooks/useDragScroll'
import { ROADMAP_ITEMS, ROADMAP_PROGRESS } from '../../content/roadmap'
import styles from './Roadmap.module.css'

export function Roadmap() {
  const sectionRef = useReveal<HTMLElement>()
  const scrollerRef = useDragScroll<HTMLDivElement>()

  return (
    <section
      ref={sectionRef}
      className={cx(section.shell, section.flush, styles.roadmap, 'reveal')}
      id="roadmap"
      aria-labelledby="roadmap-title"
      style={{ '--rmap-progress': ROADMAP_PROGRESS } as CSSProperties}
    >
      <header className={styles.header}>
        <h2 className={section.title} id="roadmap-title">
          Каждый день - новый релиз
        </h2>
        <p className={section.subtitle}>Приоритизируем бэклог для ваших целей</p>
      </header>

      <div ref={scrollerRef} className={styles.scroller}>
        <div className={styles.track}>
          {ROADMAP_ITEMS.map((item) => (
            <article
              key={item.date}
              className={cx(styles.item, item.reached && styles.reached)}
            >
              <span className={styles.dot} aria-hidden="true">
                <span className={styles.halo} />
                <span className={styles.core} />
              </span>
              <div className={styles.body}>
                <h3 className={styles.name}>{item.title}</h3>
                <p className={styles.desc}>{item.desc}</p>
                <p className={styles.date}>{item.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
