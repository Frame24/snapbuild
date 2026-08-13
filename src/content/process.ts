export type ProcessStep = {
  name: string
  nameMobile: string
  desc: string
  image: string
  alt: string
  tablet?: string
  mobile?: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    name: 'Дизайн-система — ядро платформы',
    nameMobile: 'Дизайн-система Снэпбилд',
    desc: 'Ваши компоненты, цвета и шрифты — единственный источник стиля',
    image: 'images/84a4450b3827bc21.webp',
    alt: 'Компоненты, цвета и шрифты дизайн-системы в Снэпбилде',
  },
  {
    name: 'Гибкая конфигурация',
    nameMobile: 'Гибкая конфигурация',
    desc: 'Правила бренда задаются один раз — работают в каждой генерации',
    image: 'images/process-flexible-configuration.webp',
    tablet: 'images/process-flexible-configuration-tablet.webp',
    mobile: 'images/process-flexible-configuration-mobile.webp',
    alt: 'Настройка правил бренда, которые применяются к каждой генерации',
  },
  {
    name: 'Соответствие по умолчанию',
    nameMobile: 'Соответствие по умолчанию',
    desc: 'AI не может нарушить бренд: сайты, изображения, видео, баннеры и презентации — строго по вашим правилам',
    image: 'images/afe03eb4a67d5dfb.webp',
    alt: 'Материалы, которые всегда остаются в рамках бренд-правил',
  },
]
