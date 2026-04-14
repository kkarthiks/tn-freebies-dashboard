import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change this to your repo name when you create the GitHub repo
  // e.g., if your repo is github.com/yourname/tn-freebies-dashboard
  // then base should be '/tn-freebies-dashboard/'
  // If deploying to a custom domain or root, use '/'
  base: '/tn-freebies-dashboard/',
})
