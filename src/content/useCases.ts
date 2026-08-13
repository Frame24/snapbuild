export type UseCaseItem = {
  title: string
  description: string
  image: string
  alt: string
}

export type UseCaseTab = {
  id: string
  label: string
  items: UseCaseItem[]
}

export const USE_CASE_DURATION_MS = 8000

export const USE_CASE_TABS: UseCaseTab[] = [
  {
    id: 'sites',
    label: 'Сайты',
    items: [
      {
        title: 'Результат за один запрос',
        description:
          'Отправляйте документ или ссылку на описание продукта - платформа собирает структуру',
        image: 'images/use-cases-tab1-item1-v2.webp',
        alt: 'Сгенерированная страница в редакторе Снэпбилда',
      },
      {
        title: 'Страница за минуту',
        description:
          'В вашей дизайн-системе, с вашими шрифтами, сеткой и компонентами',
        image: 'images/use-cases-tab1-item2.webp',
        alt: 'Страница в фирменном стиле, собранная за минуту',
      },
      {
        title: 'AI или визуальный редактор',
        description: 'Меняйте контент через чат или редактируйте вручную',
        image: 'images/use-cases-tab1-item3.webp',
        alt: 'Редактирование сайта через чат и визуальный редактор',
      },
      {
        title: 'Адаптация под ЦА за один клик',
        description:
          'Версия сайта под новый сегмент без работы дизайнеров и копирайтеров',
        image: 'images/use-cases-web-04.webp',
        alt: 'Несколько версий сайта под разные аудитории',
      },
    ],
  },
  {
    id: 'images',
    label: 'Изображения',
    items: [
      {
        title: 'В стиле и цвете бренда',
        description:
          'Изображения по композиционным правилам вашей дизайн-системы',
        image: 'images/use-cases-img-01.webp',
        alt: 'Изображение в цветах и композиции бренда',
      },
      {
        title: 'Попадание с первой генерации',
        description: 'Без часов промптинга и поиска на стоках',
        image: 'images/use-cases-tab2-item2.webp',
        alt: 'Результат генерации изображения с первой попытки',
      },
      {
        title: 'Редактирование объектов',
        description:
          'Меняйте композицию и удаляйте элементы прямо на изображении',
        image: 'images/use-cases-tab2-item3.webp',
        alt: 'Редактирование объектов на сгенерированном изображении',
      },
      {
        title: 'Любой стиль и формат',
        description:
          'Портреты, иллюстрации, обложки - в нужном соотношении, до 4K',
        image: 'images/use-cases-tab2-item4.webp',
        alt: 'Изображения разных стилей и форматов',
      },
    ],
  },
  {
    id: 'video',
    label: 'Видео',
    items: [
      {
        title: 'Изображения как ключевые кадры',
        description: 'Используйте графику из модуля изображений напрямую',
        image: 'images/use-cases-vid-01.webp',
        alt: 'Видео, собранное из ключевых кадров бренда',
      },
      {
        title: 'Контроль качества и формата',
        description: 'Длительность, соотношение, качество - под площадку',
        image: 'images/use-cases-tab3-item2.webp',
        alt: 'Настройки длительности и формата видео',
      },
      {
        title: 'Сохранение стиля и композиции',
        description: 'AI удерживает визуальную целостность ролика',
        image: 'images/use-cases-tab3-item3.webp',
        alt: 'Ролик в едином стиле бренда',
      },
      {
        title: 'Один сценарий - десятки адаптаций',
        description:
          'Версии под популярные форматы соцсетей и рекламные площадки',
        image: 'images/use-cases-tab3-item4.webp',
        alt: 'Адаптации одного видео под разные площадки',
      },
    ],
  },
  {
    id: 'banners',
    label: 'Баннеры',
    items: [
      {
        title: 'Креативы из одной идеи',
        description: 'Готовые баннеры в фирменном стиле для любой кампании',
        image: 'images/use-cases-tab4-item1.webp',
        alt: 'Набор баннеров из одной идеи',
      },
      {
        title: 'Все размеры автоматически',
        description:
          'Выбирайте готовые размеры для популярных площадок или задавайте собственные - без ручной пересборки',
        image: 'images/use-cases-tab4-item2.webp',
        alt: 'Баннеры во всех нужных размерах',
      },
      {
        title: 'Текст и графика под контролем',
        description: 'Редактируйте оффер, композицию и визуальные акценты',
        image: 'images/use-cases-tab4-item3.webp',
        alt: 'Редактирование текста и графики на баннере',
      },
      {
        title: 'Экспорт под площадку',
        description:
          'Форматы и вес файлов соответствуют требованиям размещения',
        image: 'images/use-cases-tab4-item4.webp',
        alt: 'Экспорт баннеров под требования площадок',
      },
    ],
  },
  {
    id: 'presentations',
    label: 'Презентации',
    items: [
      {
        title: 'Презентация из запроса',
        description: 'Платформа собирает структуру и черновик слайдов',
        image: 'images/use-cases-pres-01.jpg',
        alt: 'Черновик презентации, собранный из запроса',
      },
      {
        title: 'В вашей дизайн-системе',
        description: 'Шрифты, сетки и компоненты применяются автоматически',
        image: 'images/use-cases-tab5-item2.webp',
        alt: 'Слайды в компонентах дизайн-системы',
      },
      {
        title: 'Редактирование через AI',
        description: 'Меняйте отдельный слайд или всю историю через чат',
        image: 'images/use-cases-tab5-item3.webp',
        alt: 'Правка слайдов через чат',
      },
      {
        title: 'Экспорт в нужном формате',
        description:
          'Собирайте презентации для встречи, рассылки или публикации',
        image: 'images/use-cases-tab5-item4.webp',
        alt: 'Готовая презентация к экспорту',
      },
    ],
  },
]
