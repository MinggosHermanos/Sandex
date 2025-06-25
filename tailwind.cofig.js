// 1. Ganti seluruh isi tailwind.config.js Anda dengan ini:

/\*\* @type {import('tailwindcss').Config} */
export default {
content: [
"./index.html",
"./src/\*\*/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
darkMode: 'class',
}

```javascript
// 2. Ganti seluruh isi vite.config.js Anda dengan ini:
// (Ini adalah perubahan paling penting)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
