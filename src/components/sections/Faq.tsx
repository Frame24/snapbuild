import { useId, useState } from 'react'
import { assetUrl } from '../../lib/assets'
import { cx } from '../../lib/cx'
import section from '../ui/Section.module.css'
import { useReveal } from '../../hooks/useReveal'
import { FAQ_COLUMNS } from '../../content/faq'
import styles from './Faq.module.css'

export function Faq() {
  const sectionRef = useReveal<HTMLElement>()
  const baseId = useId()
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section
      ref={sectionRef}
      className={cx(section.shell, styles.faq, 'reveal')}
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className={section.header}>
        <h2 className={section.title} id="faq-title">
          Часто задаваемые вопросы
        </h2>
        <p className={section.subtitle}>
          Ответы, которые помогут вам принять решение уверенно - без рисков для
          бренда и безопасности
        </p>
      </div>

      <div className={styles.list}>
        {FAQ_COLUMNS.map((column, colIndex) => (
          <div key={colIndex} className={styles.col}>
            {column.map((item) => {
              const expanded = Boolean(open[item.id])
              const panelId = `${baseId}-${item.id}-panel`
              const buttonId = `${baseId}-${item.id}-button`

              return (
                <div key={item.id} className={styles.item}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.head}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                  >
                    <span className={styles.question}>{item.question}</span>
                    <span className={styles.icon} aria-hidden="true">
                      <img
                        src={assetUrl('images/c2663c497fb468e1.webp')}
                        alt=""
                        width={24}
                        height={24}
                      />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    className={cx(styles.panel, expanded && styles.panelOpen)}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!expanded}
                  >
                    <div className={styles.answer}>
                      {item.answer.map((paragraph, index) => (
                        <p key={`${item.id}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
