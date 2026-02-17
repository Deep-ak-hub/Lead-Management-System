import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: '5173',
    // allowedHosts: ['09f9-2405-acc0-1207-7ff9-6848-bca0-a9f0-12a8.ngrok-free.app']
  }
})
