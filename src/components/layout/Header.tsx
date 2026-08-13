import { useEffect, useId, useRef, useState } from 'react'
import { assetUrl } from '../../lib/assets'
import styles from './Header.module.css'

const NAV_LINKS = [
  { href: '#process', label: 'Продукт' },
  { href: '#use-cases', label: 'Возможности' },
  { href: '#pricing', label: 'Тарифы' },
  { href: '#features', label: 'Безопасность' },
  { href: '#faq', label: 'FAQ' },
] as const

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let queued = false

    const update = () => {
      setScrolled(window.scrollY > 12)
      queued = false
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')

    const closeOnWide = () => {
      if (!mq.matches) setMenuOpen(false)
    }

    mq.addEventListener('change', closeOnWide)
    return () => mq.removeEventListener('change', closeOnWide)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        burgerRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !menuRef.current || !burgerRef.current) return

      const items = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href]'),
      )
      const focusable = [burgerRef.current, ...items]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
    return () => document.documentElement.classList.remove('menu-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      id="header"
      className={[styles.header, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}
    >
      <div className={styles.bar}>
        <a className={styles.logo} href="#hero" aria-label="Снэпбилд">
          <img
            src={assetUrl('images/logo.svg')}
            alt="Снэпбилд"
            width={153}
            height={22}
          />
        </a>

        <nav className={styles.nav} aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.demo} href="#demo">
            Начать сейчас
          </a>
          <button
            ref={burgerRef}
            type="button"
            className={[styles.burger, menuOpen ? styles.burgerOpen : '']
              .filter(Boolean)
              .join(' ')}
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.burgerIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav
        ref={menuRef}
        id={menuId}
        className={[styles.menu, menuOpen ? styles.menuOpen : '']
          .filter(Boolean)
          .join(' ')}
        aria-label="Мобильная навигация"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={`mobile-${link.href}`}
            className={styles.menuLink}
            href={link.href}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.label}
          </a>
        ))}
        <a
          className={styles.menuDemo}
          href="#demo"
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          Начать сейчас
        </a>
      </nav>
    </header>
  )
}
