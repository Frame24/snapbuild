import { useEffect, useRef } from 'react'
import { assetUrl } from '../../lib/assets'
import { useReveal } from '../../hooks/useReveal'
import styles from './Logos.module.css'

const LOGOS = [
  {
    src: 'images/5cd01de0b6a5e001.svg',
    alt: 'Ozon',
    itemClass: styles.item3,
  },
  {
    src: 'images/ee341193d7cf46d6.svg',
    alt: 'HeadHunter',
    itemClass: styles.item4,
  },
  {
    src: 'images/logo-avito.svg',
    alt: 'Авито',
    itemClass: styles.item7,
  },
  {
    src: 'images/logo-cian.svg',
    alt: 'Циан',
    itemClass: styles.item8,
  },
  {
    src: 'images/logo-lenta.svg',
    alt: 'Лента',
    itemClass: styles.item10,
  },
] as const

function LogoSet({ hidden }: { hidden?: boolean }) {
  return (
    <div className={styles.content} aria-hidden={hidden ? true : undefined}>
      {LOGOS.map((logo) => (
        <div key={`${hidden ? 'dup-' : ''}${logo.alt}`} className={`${styles.item} ${logo.itemClass}`}>
          <img src={assetUrl(logo.src)} alt={hidden ? '' : logo.alt} />
        </div>
      ))}
    </div>
  )
}

export function Logos() {
  const sectionRef = useReveal<HTMLElement>()
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const setRunning = (running: boolean) => {
      section.toggleAttribute('data-running', running)
    }

    if (!('IntersectionObserver' in window)) {
      setRunning(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setRunning(entry.isIntersecting))
      },
      { rootMargin: '100px' },
    )

    observer.observe(track)
    return () => observer.disconnect()
  }, [sectionRef])

  return (
    <section
      ref={sectionRef}
      className={`${styles.logos} reveal`}
      id="logos"
      aria-label="Команды, которые работают с платформой"
    >
      <p className={styles.eyebrow}>
        С платформой работают команды, для которых бренд — закон
      </p>
      <div ref={trackRef} className={styles.track}>
        <LogoSet />
        <LogoSet hidden />
      </div>
    </section>
  )
}
