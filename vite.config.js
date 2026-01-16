import { defineConfig } from 'vite'
import FullReload from 'vite-plugin-full-reload'

export default defineConfig({
  plugins: [
    FullReload(['./**/*.html'])
  ],

  //updated to work with node and port 5080
  server: {
    proxy: {
      '/api': 'http://localhost:5080'
      }
    }
  }
)