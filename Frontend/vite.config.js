import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'https://140f-136-158-61-27.ngrok-free.app'
    }
  },
  plugins: [react()],
})
