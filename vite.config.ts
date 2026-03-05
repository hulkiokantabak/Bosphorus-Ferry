import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Bosphorus-Ferry/',
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600, // narrative data makes the bundle ~550KB, which is expected
  },
})
