/** Путь к файлу из public/ с учётом base для GitHub Pages */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  const normalized = path.replace(/^\//, '')
  return `${base}${normalized}`
}
