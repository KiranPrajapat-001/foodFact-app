import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://world.openfoodfacts.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/mealdb': {
        target: 'https://www.themealdb.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mealdb/, '')
      }
    }
  }
})
