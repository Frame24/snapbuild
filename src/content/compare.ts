export type CompareCell =
  | { kind: 'text'; text: string }
  | { kind: 'lines'; lines: string[] }
  | { kind: 'check'; label?: string }

export type CompareRow = {
  label: string
  cells: CompareCell[]
}

export const COMPARE_HEAD = [
  'Особенности',
  'снэпбилд',
  'Claude + Figma MCP',
  'No-code платформы',
  'Cursor',
  'Традиционный',
] as const

export const COMPARE_ROWS: CompareRow[] = [
  {
    label: 'Time-to-market',
    cells: [
      { kind: 'text', text: '5 минут' },
      { kind: 'text', text: '30-60 мин' },
      { kind: 'text', text: '2-3 дня' },
      { kind: 'text', text: '1-2 дня' },
      { kind: 'text', text: '3-5 недель' },
    ],
  },
  {
    label: 'Дизайн-система',
    cells: [
      { kind: 'lines', lines: ['100%', 'точность'] },
      { kind: 'text', text: 'Частично, из Figma' },
      { kind: 'text', text: 'Шаблоны' },
      { kind: 'text', text: 'Вручную в коде' },
      { kind: 'text', text: 'Вручную, через ревью' },
    ],
  },
  {
    label: 'Визуальный редактор',
    cells: [
      { kind: 'check', label: '+ ИИ' },
      { kind: 'text', text: '-' },
      { kind: 'check' },
      { kind: 'text', text: '-' },
      { kind: 'text', text: '-' },
    ],
  },
  {
    label: 'Требуемые навыки',
    cells: [
      { kind: 'text', text: 'Нет' },
      { kind: 'text', text: 'Промпты + код' },
      { kind: 'text', text: 'Дизайн' },
      { kind: 'text', text: 'Разработка' },
      { kind: 'text', text: 'Полная команда' },
    ],
  },
]
