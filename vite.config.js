import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "http://application:80/",
        changeOrigin: true
      }
    },
    allowedHosts: [
      "formify.local.techbabette.com",
      "www.formify.local.techbabette.com"
    ]
  }
})
