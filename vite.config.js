import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: true, // чтобы слушать все интерфейсы
    allowedHosts: ['95.81.99.97.nip.io'], // разрешенный внешний хост
    port: 5173
  }
})
