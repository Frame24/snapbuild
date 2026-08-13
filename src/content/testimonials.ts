export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  company: string
  result: string
  initials: string
  image: string
  imageAlt: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'anna',
    quote:
      'Раньше лендинг и баннеры собирали три подрядчика. Сейчас маркетинг отдаёт бриф и в тот же день получает пакет в нашем стиле - без отдельного ревью бренда.',
    name: 'Анна К.',
    role: 'Руководитель маркетинга',
    company: 'Сеть «Северная полка»',
    result: 'Пакет кампании за день вместо трёх недель',
    initials: 'АК',
    image: 'images/use-cases-tab4-item1.webp',
    imageAlt: 'Рекламные баннеры в фирменном стиле',
  },
  {
    id: 'dmitry',
    quote:
      'Дизайн-система больше не файл в Confluence. Компоненты и токены просто нельзя нарушить: платформа не предлагает цвет, которого нет в библиотеке.',
    name: 'Дмитрий С.',
    role: 'Дизайн-директор',
    company: 'Лагуна Банк',
    result: 'Новые экраны без отклонений от гайда',
    initials: 'ДС',
    image: 'images/use-cases-tab1-item1-v2.webp',
    imageAlt: 'Интерфейс сайта в корпоративной дизайн-системе',
  },
  {
    id: 'maria',
    quote:
      'К питчу готовим презентацию и one-pager за час, а не за неделю. Клиент видит нас, а не чужой шаблон с подменённым логотипом.',
    name: 'Мария Л.',
    role: 'Руководитель продаж',
    company: 'Контур Поставки',
    result: 'Питч-дек к встрече за час',
    initials: 'МЛ',
    image: 'images/use-cases-pres-01.jpg',
    imageAlt: 'Корпоративная презентация в стиле бренда',
  },
  {
    id: 'igor',
    quote:
      'Страницу фичи собирает продакт, не дожидаясь слота у дизайна. Сетка и состояния кнопок те же, что в продукте - гипотезу проверяем в спринте.',
    name: 'Игорь П.',
    role: 'Продакт',
    company: 'Связь Волна',
    result: 'Фича-лендинг внутри спринта',
    initials: 'ИП',
    image: 'images/use-cases-web-04.webp',
    imageAlt: 'Страница продукта, собранная из компонентов системы',
  },
]
