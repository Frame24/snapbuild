import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Путь для GitHub Pages: https://<user>.github.io/<repo>/
// Если репозиторий называется иначе: BASE_PATH=/имя-репо/ npm run build
const base = process.env.BASE_PATH ?? '/snapbuild/'

export default defineConfig({
  base,
  plugins: [react()],
})
