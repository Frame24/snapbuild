export const DEMO_ROLES = [
  { value: 'marketing', label: 'Маркетинг' },
  { value: 'design', label: 'Дизайн' },
  { value: 'sales', label: 'Продажи' },
  { value: 'product', label: 'Продукт' },
  { value: 'other', label: 'Другая роль' },
] as const

export const DEMO_POINTS = [
  'Покажем платформу на вашей дизайн-системе, а не на шаблоне',
  'Разберём контур: облако, модели и доступы',
  'Ответим в ближайший рабочий день',
] as const

export type DemoFields = {
  name: string
  email: string
  company: string
  phone: string
  role: string
  message: string
}

export type DemoErrors = Partial<Record<keyof DemoFields, string>>

export const EMPTY_DEMO_FIELDS: DemoFields = {
  name: '',
  email: '',
  company: '',
  phone: '',
  role: '',
  message: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateDemo(fields: DemoFields): DemoErrors {
  const errors: DemoErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()
  const company = fields.company.trim()
  const phone = fields.phone.trim()

  if (name.length < 2) {
    errors.name = 'Укажите имя'
  }

  if (!EMAIL_RE.test(email)) {
    errors.email = 'Проверьте email'
  }

  if (company.length < 2) {
    errors.company = 'Укажите компанию'
  }

  if (!fields.role) {
    errors.role = 'Выберите роль'
  }

  if (phone) {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 11) {
      errors.phone = 'Проверьте номер'
    }
  }

  return errors
}
