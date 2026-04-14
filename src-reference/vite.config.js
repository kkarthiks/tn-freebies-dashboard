import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // './' makes asset paths relative — works for any repo name on GitHub Pages
  base: './',
})
