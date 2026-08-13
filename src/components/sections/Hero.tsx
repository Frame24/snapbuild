import { useEffect } from 'react'
import { assetUrl } from '../../lib/assets'
import styles from './Hero.module.css'

export function Hero() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('hero-motion-pending')

    const frame = requestAnimationFrame(() => {
      root.classList.add('hero-motion-ready')
    })

    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove('hero-motion-pending', 'hero-motion-ready')
    }
  }, [])

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.card}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <div className={styles.heading}>
              <h1 className={styles.title} id="hero-title">
                Платформа, где все создается в&nbsp;рамках вашего бренда
                и&nbsp;дизайн-системы
              </h1>
              <p className={styles.subtitle}>
                Подключите дизайн-систему к Снэпбилду, чтобы каждый участник
                команды мог создавать профессиональные материалы в фирменном
                стиле за минуты, а не дни.
              </p>
            </div>
            <a className={styles.cta} href="#demo">
              <span className={styles.ctaText}>Начать сейчас</span>
            </a>
          </div>

          <div className={styles.media}>
            <img
              className={styles.shot}
              src={assetUrl('images/hero-snapbuild-2026-08-07-v2.webp')}
              alt="Интерфейс Снэпбилда с материалами в фирменном стиле"
              width={1316}
              height={693}
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
