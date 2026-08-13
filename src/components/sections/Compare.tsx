import { CheckIcon } from '../ui/CheckIcon'
import { cx } from '../../lib/cx'
import { useReveal } from '../../hooks/useReveal'
import { COMPARE_HEAD, COMPARE_ROWS, type CompareCell } from '../../content/compare'
import styles from './Compare.module.css'

function CellContent({ cell }: { cell: CompareCell }) {
  if (cell.kind === 'check') {
    return (
      <>
        <span className={styles.check} aria-hidden="true">
          <CheckIcon size={24} />
        </span>
        {cell.label ? <span>{cell.label}</span> : null}
      </>
    )
  }

  if (cell.kind === 'lines') {
    return (
      <span>
        {cell.lines.map((line, index) => (
          <span key={line}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </span>
    )
  }

  return <span>{cell.text}</span>
}

export function Compare() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={`${styles.compare} reveal`}
      id="compare"
      aria-labelledby="compare-title"
    >
      <header className={styles.header}>
        <h2 className={styles.title} id="compare-title">
          Почему команды выбирают Снэпбилд
        </h2>
        <p className={styles.subtitle}>
          Вы получаете не редактор, а результат: готовые маркетинговые материалы
          без проблем с настройками
        </p>
      </header>

      <div className={styles.scroll}>
        <div className={styles.table} role="table">
          <div className={styles.brandBorder} aria-hidden="true" />

          <div className={`${styles.row} ${styles.rowHead}`} role="row">
            {COMPARE_HEAD.map((label, index) => (
              <div
                key={label}
                className={cx(
                  styles.cell,
                  index === 0 && styles.cellLabel,
                  index === 3 && styles.cellNarrow,
                )}
                role="columnheader"
              >
                {index === 1 ? (
                  <span className={styles.brandName}>{label}</span>
                ) : (
                  <span>{label}</span>
                )}
              </div>
            ))}
          </div>

          {COMPARE_ROWS.map((row) => (
            <div key={row.label} className={styles.row} role="row">
              <div className={`${styles.cell} ${styles.cellLabel}`} role="rowheader">
                <span>{row.label}</span>
              </div>
              {row.cells.map((cell, index) => (
                <div
                  key={`${row.label}-${index}`}
                  className={cx(styles.cell, index === 2 && styles.cellNarrow)}
                  role="cell"
                >
                  <CellContent cell={cell} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
