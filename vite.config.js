import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi ini tidak memerlukan file postcss.config.js lagi
export default defineConfig({
  plugins: [react()],
})
