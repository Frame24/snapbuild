import { useEffect, useId, useRef, useState } from 'react'
import pills from '../ui/Pills.module.css'
import section from '../ui/Section.module.css'
import { assetUrl } from '../../lib/assets'
import { cx } from '../../lib/cx'
import { centerInScroller } from '../../lib/media'
import { handleTabListKeyDown } from '../../lib/tabList'
import { useReveal } from '../../hooks/useReveal'
import { SCENARIOS } from '../../content/scenarios'
import styles from './Scenarios.module.css'

export function Scenarios() {
  const sectionRef = useReveal<HTMLElement>()
  const tabsRef = useRef<HTMLDivElement>(null)
  const baseId = useId()
  const [index, setIndex] = useState(0)
  const scenario = SCENARIOS[index]

  useEffect(() => {
    const tabs = tabsRef.current
    if (!tabs) return
    const active = tabs.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!active) return
    centerInScroller(active)
  }, [index])

  return (
    <section
      ref={sectionRef}
      className={cx(section.shell, styles.section, 'reveal')}
      id="scenarios"
      aria-labelledby="scenarios-title"
    >
      <header className={section.header}>
        <h2 className={section.title} id="scenarios-title">
          Сценарии для команд
        </h2>
        <p className={section.subtitle}>
          Маркетинг, дизайн, продажи и продукт собирают материалы сами - в
          рамках одной дизайн-системы
        </p>
      </header>

      <div
        ref={tabsRef}
        className={pills.list}
        role="tablist"
        aria-label="Команды"
        onKeyDown={(event) => {
          handleTabListKeyDown(event, index, SCENARIOS.length, setIndex)
        }}
      >
        {SCENARIOS.map((item, itemIndex) => {
          const selected = itemIndex === index
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              className={cx(pills.item, selected && pills.itemActive)}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(itemIndex)}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div
        className={cx(section.card, styles.panel)}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${scenario.id}`}
      >
        <div className={styles.intro}>
          <p className={styles.kicker}>{scenario.kicker}</p>
          <h3 className={styles.heading}>{scenario.title}</h3>
          <p className={styles.lead}>{scenario.desc}</p>
        </div>

        <div className={styles.mediaWrap}>
          <img
            className={styles.media}
            src={assetUrl(scenario.image)}
            alt={scenario.imageAlt}
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
          />
        </div>

        <ol className={styles.steps}>
          {scenario.steps.map((step, stepIndex) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                {stepIndex + 1}
              </span>
              <div className={styles.stepCopy}>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.results}>
          <p className={styles.resultsLabel}>Результат</p>
          <ul className={styles.chips}>
            {scenario.results.map((item) => (
              <li key={item} className={styles.chip}>
                {item}
              </li>
            ))}
          </ul>
          <a className={styles.cta} href="#demo">
            Запросить демо
          </a>
        </div>
      </div>
    </section>
  )
}
