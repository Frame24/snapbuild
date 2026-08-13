import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://<user>.github.io/<repo>/
// Override when the repo name differs: BASE_PATH=/my-repo/ npm run build
const base = process.env.BASE_PATH ?? '/snapbuild/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
