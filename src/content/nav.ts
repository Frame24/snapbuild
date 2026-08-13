export const HEADER_NAV = [
  { href: '#process', label: 'Продукт' },
  { href: '#use-cases', label: 'Возможности' },
  { href: '#pricing', label: 'Тарифы' },
  { href: '#features', label: 'Безопасность' },
  { href: '#faq', label: 'FAQ' },
] as const

export const FOOTER_NAV = [
  { href: '#process', label: 'Продукт' },
  { href: '#use-cases', label: 'Возможности' },
  { href: '#compare', label: 'Преимущества' },
  { href: '#pricing', label: 'Тарифы' },
  { href: '#features', label: 'Безопасность' },
  { href: '#roadmap', label: 'Роадмап' },
  { href: '#faq', label: 'Частые вопросы' },
] as const

export const FOOTER_DOCS = [
  {
    href: 'https://snapbuild.ru/privacy',
    label: 'Политика конфиденциальности',
    external: true,
  },
  { href: '#faq', label: 'FAQ', external: false },
] as const

export const FOOTER_CONTACTS = [
  { href: '#demo', label: 'Запросить демо', external: false },
  {
    href: 'https://t.me/snapbuild',
    label: 'Telegram',
    external: true,
  },
] as const
