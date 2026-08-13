export type SecurityPoint = {
  title: string
  desc: string
  image: string
  mobile: string
  alt: string
}

export const SECURITY_POINTS: SecurityPoint[] = [
  {
    title: 'Только одобренные модели',
    desc: 'Работаем только с российскими и локализованными моделями, без экспортных ограничений',
    image: 'images/security-approved-models.webp',
    mobile: 'images/security-approved-models-mobile-v2.jpg',
    alt: 'Схема работы только с одобренными AI-моделями',
  },
  {
    title: 'Ваш контур, ваша юрисдикция',
    desc: 'Развертывание в частном облаке с полным соответствием 152-ФЗ и внутренними ИБ-требованиями',
    image: 'images/security-private-cloud.webp',
    mobile: 'images/security-private-cloud-mobile-v2.jpg',
    alt: 'Частное облако и контур безопасности компании',
  },
  {
    title: 'Собственный AI-стек',
    desc: 'Вы сами определяете модели, хранилища, доступы и цепочки валидации',
    image: 'images/security-ai-stack.webp',
    mobile: 'images/security-ai-stack-mobile-v2.jpg',
    alt: 'Собственный стек моделей, хранилищ и доступов',
  },
]
