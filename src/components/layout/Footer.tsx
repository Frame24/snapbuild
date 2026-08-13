import {
  FOOTER_CONTACTS,
  FOOTER_DOCS,
  FOOTER_NAV,
} from '../../content/nav'
import { assetUrl } from '../../lib/assets'
import styles from './Footer.module.css'

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
              height={24}
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
              {FOOTER_NAV.map((link) => (
                <a key={link.href} className={styles.link} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Документация</p>
            <div className={styles.list}>
              {FOOTER_DOCS.map((link) => (
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
              {FOOTER_CONTACTS.map((link) => (
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
