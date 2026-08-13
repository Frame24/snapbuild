export const INTEGRATION_CATEGORIES = [
  'Все',
  'Дизайн',
  'Разработка',
  'CI/CD',
  'Модели',
  'Инфраструктура',
] as const

export type IntegrationCategory =
  (typeof INTEGRATION_CATEGORIES)[number]

export type Integration = {
  id: string
  name: string
  mark: string
  category: Exclude<IntegrationCategory, 'Все'>
  blurb: string
}

export const INTEGRATIONS: Integration[] = [
  {
    id: 'figma',
    name: 'Figma',
    mark: 'Fg',
    category: 'Дизайн',
    blurb: 'Компоненты, токены и макеты как источник дизайн-системы',
  },
  {
    id: 'github',
    name: 'GitHub',
    mark: 'GH',
    category: 'Разработка',
    blurb: 'Экспорт интерфейса в репозиторий и поставка через pull request',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    mark: 'GL',
    category: 'Разработка',
    blurb: 'Та же поставка в корпоративный GitLab без смены процесса',
  },
  {
    id: 'actions',
    name: 'GitHub Actions',
    mark: 'GA',
    category: 'CI/CD',
    blurb: 'Сборка и выкладка материалов в вашем конвейере',
  },
  {
    id: 'gitlab-ci',
    name: 'GitLab CI',
    mark: 'CI',
    category: 'CI/CD',
    blurb: 'Генерация встраивается в уже принятые пайплайны команды',
  },
  {
    id: 'react',
    name: 'React',
    mark: 'R',
    category: 'Разработка',
    blurb: 'Чистая структура под существующий фронтенд на React',
  },
  {
    id: 'yandexgpt',
    name: 'YandexGPT',
    mark: 'Ya',
    category: 'Модели',
    blurb: 'Локализованная модель в контуре, без зависимости от санкционных API',
  },
  {
    id: 'gigachat',
    name: 'GigaChat',
    mark: 'GC',
    category: 'Модели',
    blurb: 'Российская модель для генерации в рамках корпоративных правил',
  },
  {
    id: 'own-models',
    name: 'Свои модели',
    mark: 'AI',
    category: 'Модели',
    blurb: 'Подключаете одобренные модели, хранилища и цепочки валидации',
  },
  {
    id: 'cloud',
    name: 'Частное облако',
    mark: 'PC',
    category: 'Инфраструктура',
    blurb: 'Развертывание без доступа во внешнюю сеть, данные остаются у вас',
  },
  {
    id: 'fz152',
    name: '152-ФЗ',
    mark: 'FZ',
    category: 'Инфраструктура',
    blurb: 'Контур и доступы под внутренние требования информационной безопасности',
  },
  {
    id: 'vue',
    name: 'Vue и Angular',
    mark: 'VA',
    category: 'Разработка',
    blurb: 'Экспорт пригоден для интеграции в Vue, Angular и HTML/CSS',
  },
]
