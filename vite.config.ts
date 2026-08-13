import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Сборка уходит на GitHub Pages: https://<user>.github.io/snapbuild/
// Другой префикс: BASE_PATH=/имя-репо/ npm run build
export default defineConfig(({ command }) => ({
  base: process.env.BASE_PATH ?? (command === 'build' ? '/snapbuild/' : '/'),
  plugins: [react()],
}))
