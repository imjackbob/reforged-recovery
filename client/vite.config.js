import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Proxy API calls to the .NET backend during local dev so the client can
    // call `/api/...` without hardcoding the backend origin or fighting CORS.
    proxy: {
      '/api': {
        target: 'http://localhost:5254',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Routes are code-split via React.lazy in App.jsx. Keep the big vendor
    // libraries in their own chunk for better long-term browser caching.
    // (Vite 8 / Rolldown expects manualChunks as a function.)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react-router') ||
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/')
            ) {
              return 'react-vendor'
            }
          }
        },
      },
    },
  },
})
