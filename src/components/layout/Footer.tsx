import { assetUrl } from '../../lib/assets'
import styles from './Footer.module.css'

const NAV_LINKS = [
  { href: '#process', label: 'Продукт' },
  { href: '#use-cases', label: 'Возможности' },
  { href: '#compare', label: 'Преимущества' },
  { href: '#features', label: 'Безопасность' },
  { href: '#roadmap', label: 'Роадмап' },
  { href: '#faq', label: 'Частые вопросы' },
] as const

const DOC_LINKS = [
  {
    href: 'https://snapbuild.ru/privacy',
    label: 'Политика конфиденциальности',
    external: true,
  },
  { href: '#faq', label: 'FAQ', external: false },
] as const

const CONTACT_LINKS = [
  { href: '#demo', label: 'Запросить демо', external: false },
  {
    href: 'https://t.me/snapbuild',
    label: 'Telegram',
    external: true,
  },
] as const

export function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.top}>
        <div className={styles.brand}>
          <a className={styles.logo} href="#hero" aria-label="Снэпбилд">
            <img
              src={assetUrl('images/logo.svg')}
              alt="Снэпбилд"
              width={153}
              height={22}
            />
          </a>
          <p className={styles.tagline}>
            Платформа, где все создается в&nbsp;рамках вашего бренда
            и&nbsp;дизайн-системы
          </p>
        </div>

        <nav className={styles.links} aria-label="Подвал">
          <div className={styles.col}>
            <p className={styles.colTitle}>Навигация</p>
            <div className={styles.list}>
              {NAV_LINKS.map((link) => (
                <a key={link.href} className={styles.link} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Документация</p>
            <div className={styles.list}>
              {DOC_LINKS.map((link) => (
                <a
                  key={link.label}
                  className={styles.link}
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Контакты</p>
            <div className={styles.list}>
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  className={styles.link}
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {link.label}
                </a>
              ))}
              <a className={styles.emailMobile} href="mailto:hey@snapbuild.ru">
                hey@snapbuild.ru
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div className={styles.legal}>
        <p className={styles.copyright}>
          © Сгенерировано в&nbsp;Снэпбилде. Все права защищены.
        </p>
        <a className={styles.email} href="mailto:hey@snapbuild.ru">
          hey@snapbuild.ru
        </a>
      </div>
    </footer>
  )
}
