import { useMemo, useState } from 'react'
import pills from '../ui/Pills.module.css'
import { useReveal } from '../../hooks/useReveal'
import { cx } from '../../lib/cx'
import { centerInScroller } from '../../lib/media'
import {
  INTEGRATIONS,
  INTEGRATION_CATEGORIES,
  type IntegrationCategory,
} from '../../content/integrations'
import styles from './Integrations.module.css'

export function Integrations() {
  const sectionRef = useReveal<HTMLElement>()
  const [filter, setFilter] = useState<IntegrationCategory>('Все')

  const items = useMemo(
    () =>
      filter === 'Все'
        ? INTEGRATIONS
        : INTEGRATIONS.filter((item) => item.category === filter),
    [filter],
  )

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} reveal`}
      id="integrations"
      aria-labelledby="integrations-title"
    >
      <header className={styles.header}>
        <div className={styles.heading}>
          <h2 className={styles.title} id="integrations-title">
            Встраивается в ваш стек
          </h2>
          <p className={styles.subtitle}>
            Figma, Git, CI/CD и модели - в том же контуре, где уже работает
            команда
          </p>
        </div>

        <div
          className={cx(pills.list, pills.wrap)}
          role="group"
          aria-label="Категории интеграций"
        >
          {INTEGRATION_CATEGORIES.map((category) => {
            const active = category === filter
            return (
              <button
                key={category}
                type="button"
                className={cx(pills.item, active && pills.itemActive)}
                aria-pressed={active}
                onClick={(event) => {
                  setFilter(category)
                  centerInScroller(event.currentTarget)
                }}
              >
                {category}
              </button>
            )
          })}
        </div>
      </header>

      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.id}>
            <article className={styles.card}>
              <span className={styles.mark} aria-hidden="true">
                {item.mark}
              </span>
              <div className={styles.copy}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.blurb}>{item.blurb}</p>
              </div>
              <span className={styles.tag}>{item.category}</span>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
