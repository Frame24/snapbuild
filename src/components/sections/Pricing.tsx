import { useState } from 'react'
import { CheckIcon } from '../ui/CheckIcon'
import section from '../ui/Section.module.css'
import { cx } from '../../lib/cx'
import { useReveal } from '../../hooks/useReveal'
import {
  PRICING_PLANS,
  formatPrice,
  planMonthlyPrice,
  type PricingPeriod,
} from '../../content/pricing'
import styles from './Pricing.module.css'

export function Pricing() {
  const sectionRef = useReveal<HTMLElement>()
  const [period, setPeriod] = useState<PricingPeriod>('year')

  return (
    <section
      ref={sectionRef}
      className={cx(section.shell, styles.section, 'reveal')}
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <header className={styles.header}>
        <div className={section.heading}>
          <h2 className={section.title} id="pricing-title">
            Тарифы под масштаб команды
          </h2>
          <p className={cx(section.subtitle, styles.subtitle)}>
            От отдела маркетинга до контура безопасности. Счёт и внедрение
            обсуждаем на демо.
          </p>
        </div>

        <div className={styles.toggle} role="group" aria-label="Период оплаты">
          <button
            type="button"
            className={cx(styles.toggleBtn, period === 'month' && styles.toggleActive)}
            aria-pressed={period === 'month'}
            onClick={() => setPeriod('month')}
          >
            Ежемесячно
          </button>
          <button
            type="button"
            className={cx(styles.toggleBtn, period === 'year' && styles.toggleActive)}
            aria-pressed={period === 'year'}
            onClick={() => setPeriod('year')}
          >
            Ежегодно
            <span className={styles.save}>2 месяца в подарок</span>
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {PRICING_PLANS.map((plan) => {
          const price =
            plan.monthly === null
              ? null
              : planMonthlyPrice(plan.monthly, period)

          return (
            <article
              key={plan.id}
              className={cx(section.card, styles.card, plan.featured && styles.featured)}
            >
              {plan.featured ? (
                <span className={styles.badge}>{plan.badge}</span>
              ) : null}

              <div className={styles.cardHead}>
                <h3 className={styles.name}>{plan.name}</h3>
                <p className={styles.desc}>{plan.desc}</p>
              </div>

              <p className={styles.price}>
                {price === null ? (
                  <span className={styles.amount}>По запросу</span>
                ) : (
                  <>
                    <span className={styles.amount}>{formatPrice(price)}</span>
                    <span className={styles.per}> / мес</span>
                  </>
                )}
              </p>
              {price !== null && period === 'year' ? (
                <p className={styles.note}>при оплате за год</p>
              ) : (
                <p className={styles.note} aria-hidden="true">
                  &nbsp;
                </p>
              )}

              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature} className={styles.feature}>
                    <span className={styles.check} aria-hidden="true">
                      <CheckIcon size={16} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a className={styles.cta} href="#demo">
                {plan.cta}
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
