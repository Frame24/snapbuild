import { assetUrl } from '../../lib/assets'
import { cx } from '../../lib/cx'
import { useReveal } from '../../hooks/useReveal'
import section from '../ui/Section.module.css'
import { SECURITY_POINTS } from '../../content/security'
import styles from './Security.module.css'

export function Security() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={cx(section.shell, styles.features, 'reveal')}
      id="features"
      aria-labelledby="features-title"
    >
      <h2 className={cx(section.title, styles.title)} id="features-title">
        Безопасность без компромиссов
      </h2>
      <div className={styles.points}>
        {SECURITY_POINTS.map((point) => (
          <article key={point.title} className={styles.point}>
            <picture className={styles.picture}>
              <source
                media="(max-width: 767px)"
                srcSet={assetUrl(point.mobile)}
              />
              <img
                className={styles.media}
                src={assetUrl(point.image)}
                alt={point.alt}
                width={432}
                height={432}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className={styles.copy}>
              <h3 className={styles.name}>{point.title}</h3>
              <p className={styles.desc}>{point.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
