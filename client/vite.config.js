import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  base: '/Simple-Rank/',

  server: {
        proxy: {
            '/api': 'http://localhost:3001'
        }
    }
})
