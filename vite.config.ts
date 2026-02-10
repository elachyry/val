import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'client',
  base: '/will-you-be-my-valentine/',
  build: {
    outDir: '../dist'
  }
})
