import { PROCESS_STEPS } from '../../content/process'
import { assetUrl } from '../../lib/assets'
import { cx } from '../../lib/cx'
import { useReveal } from '../../hooks/useReveal'
import section from '../ui/Section.module.css'
import styles from './Process.module.css'

export function Process() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={cx(section.shell, styles.process, 'reveal')}
      id="process"
      aria-labelledby="process-title"
    >
      <div className={styles.header}>
        <h2 className={cx(section.title, styles.title)} id="process-title">
          <span className={styles.wide}>Одна платформа - весь маркетинг</span>
          <span className={styles.narrow}>
            Одна платформа -{'\n'}весь маркетинг
          </span>
        </h2>
        <p className={cx(section.subtitle, styles.subtitle)}>
          Сайты, изображения, видео, баннеры и презентации - из одной идеи, в
          вашем стиле
        </p>
      </div>

      <div className={styles.grid}>
        {PROCESS_STEPS.map((step) => (
          <article key={step.name} className={styles.card}>
            {step.mobile && step.tablet ? (
              <picture className={styles.picture}>
                <source
                  media="(max-width: 767px)"
                  srcSet={assetUrl(step.mobile)}
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet={assetUrl(step.tablet)}
                />
                <img
                  className={styles.media}
                  src={assetUrl(step.image)}
                  alt={step.alt}
                  width={432}
                  height={432}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            ) : (
              <img
                className={styles.media}
                src={assetUrl(step.image)}
                alt={step.alt}
                width={432}
                height={432}
                loading="lazy"
                decoding="async"
              />
            )}
            <div className={styles.copy}>
              <h3 className={styles.name}>
                <span className={styles.wide}>{step.name}</span>
                <span className={styles.narrow}>{step.nameMobile}</span>
              </h3>
              <p className={styles.desc}>{step.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
