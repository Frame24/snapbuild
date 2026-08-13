import { assetUrl } from '../../lib/assets'
import { useReveal } from '../../hooks/useReveal'
import styles from './Process.module.css'

const STEPS = [
  {
    name: 'Дизайн-система - ядро платформы',
    nameMobile: 'Дизайн-система Снэпбилд',
    desc: 'Ваши компоненты, цвета и шрифты - единственный источник стиля',
    image: 'images/84a4450b3827bc21.webp',
    alt: 'Компоненты, цвета и шрифты дизайн-системы в Снэпбилде',
  },
  {
    name: 'Гибкая конфигурация',
    nameMobile: 'Гибкая конфигурация',
    desc: 'Правила бренда задаются один раз - работают в каждой генерации',
    image: 'images/process-flexible-configuration.webp',
    tablet: 'images/process-flexible-configuration-tablet.webp',
    mobile: 'images/process-flexible-configuration-mobile.webp',
    alt: 'Настройка правил бренда, которые применяются к каждой генерации',
  },
  {
    name: 'Соответствие по умолчанию',
    nameMobile: 'Соответствие по умолчанию',
    desc: 'AI не может нарушить бренд: сайты, изображения, видео, баннеры и презентации - строго по вашим правилам',
    image: 'images/afe03eb4a67d5dfb.webp',
    alt: 'Материалы, которые всегда остаются в рамках бренд-правил',
  },
] as const

export function Process() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={`${styles.process} reveal`}
      id="process"
      aria-labelledby="process-title"
    >
      <div className={styles.header}>
        <h2 className={styles.title} id="process-title">
          <span className={styles.wide}>Одна платформа - весь маркетинг</span>
          <span className={styles.narrow}>
            Одна платформа -{'\n'}весь маркетинг
          </span>
        </h2>
        <p className={styles.subtitle}>
          Сайты, изображения, видео, баннеры и презентации - из одной идеи, в
          вашем стиле
        </p>
      </div>

      <div className={styles.grid}>
        {STEPS.map((step) => (
          <article key={step.name} className={styles.card}>
            {'mobile' in step && step.mobile && step.tablet ? (
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
