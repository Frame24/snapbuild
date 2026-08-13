export type PricingPeriod = 'month' | 'year'

export type PricingPlan = {
  id: string
  name: string
  desc: string
  monthly: number | null
  featured?: boolean
  badge?: string
  cta: string
  features: string[]
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'team',
    name: 'Команда',
    desc: 'Маркетинг и дизайн на одной платформе, без выделенного контура',
    monthly: 89000,
    cta: 'Запросить демо',
    features: [
      'До 15 мест',
      'Сайты, изображения и баннеры',
      'Дизайн-система из вашего сайта',
      'Экспорт в GitHub и GitLab',
      'Очередь генераций в общем контуре',
    ],
  },
  {
    id: 'business',
    name: 'Бизнес',
    desc: 'Все форматы, роли и приоритет, когда материалов много и сроки короткие',
    monthly: 189000,
    featured: true,
    badge: 'Чаще выбирают',
    cta: 'Запросить демо',
    features: [
      'До 50 мест',
      'Видео, презентации и баннеры',
      'Роли, доступы и согласование',
      'Приоритетная очередь генераций',
      'Помощь с подключением дизайн-системы',
    ],
  },
  {
    id: 'contour',
    name: 'Контур',
    desc: 'Свой контур, свои модели и требования безопасности компании',
    monthly: null,
    cta: 'Обсудить контур',
    features: [
      'Безлимит мест',
      'Развертывание в вашем облаке',
      'Свои модели и цепочки валидации',
      'Соответствие 152-ФЗ',
      'Выделенный архитектор внедрения',
    ],
  },
]

/** Год: 10 платежей вместо 12 */
export function planMonthlyPrice(
  monthly: number,
  period: PricingPeriod,
): number {
  return period === 'year' ? Math.round((monthly * 10) / 12) : monthly
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`
}
