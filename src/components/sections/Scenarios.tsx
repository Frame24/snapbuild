import { useId, useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { SCENARIOS } from '../../content/scenarios'
import styles from './Scenarios.module.css'

export function Scenarios() {
  const sectionRef = useReveal<HTMLElement>()
  const baseId = useId()
  const [index, setIndex] = useState(0)
  const scenario = SCENARIOS[index]
  const last = SCENARIOS.length - 1

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} reveal`}
      id="scenarios"
      aria-labelledby="scenarios-title"
    >
      <header className={styles.header}>
        <h2 className={styles.title} id="scenarios-title">
          Сценарии для команд
        </h2>
        <p className={styles.subtitle}>
          Маркетинг, дизайн, продажи и продукт собирают материалы сами - в
          рамках одной дизайн-системы
        </p>
      </header>

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Команды"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault()
            setIndex(index === last ? 0 : index + 1)
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault()
            setIndex(index === 0 ? last : index - 1)
          } else if (event.key === 'Home') {
            event.preventDefault()
            setIndex(0)
          } else if (event.key === 'End') {
            event.preventDefault()
            setIndex(last)
          }
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
              className={[styles.tab, selected ? styles.tabActive : '']
                .filter(Boolean)
                .join(' ')}
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
        className={styles.panel}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${scenario.id}`}
      >
        <div className={styles.intro}>
          <p className={styles.kicker}>{scenario.kicker}</p>
          <h3 className={styles.heading}>{scenario.title}</h3>
          <p className={styles.lead}>{scenario.desc}</p>
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
