import { useReveal } from '../../hooks/useReveal'
import styles from './Cta.module.css'

export function Cta() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={`${styles.cta} reveal`}
      id="cta"
      aria-labelledby="cta-title"
    >
      <div className={styles.shine} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.intro}>
          <h2 className={styles.title} id="cta-title">
            <span className={styles.titleDesktop}>
              Профессиональные материалы в&nbsp;фирменном стиле
              <br />
              за&nbsp;минуты, а&nbsp;не&nbsp;дни
            </span>
            <span className={styles.titleResponsive}>
              Профессиональные материалы в&nbsp;фирменном стиле за&nbsp;минуты,
              а&nbsp;не&nbsp;дни
            </span>
          </h2>
        </div>
        <div className={styles.actions}>
          <a className={styles.btn} href="#demo">
            <span className={styles.btnText}>Начать сейчас</span>
          </a>
        </div>
      </div>
    </section>
  )
}
