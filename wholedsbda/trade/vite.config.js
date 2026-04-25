import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This ensures that if you ever use a custom domain or 
  // sub-path, the assets (CSS/JS) load correctly.
  base: './', 
  build: {
    outDir: 'dist',
  }
})