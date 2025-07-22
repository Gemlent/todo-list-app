import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    host: "0.0.0.0",
    port: 5175,
    strictPort: true,
    cors: true,
    allowedHosts: [
      'ozseljypupvx.sealoshzh.site',
      '.sealoshzh.site'
    ],
    proxy: {
      '/api': {
        target: 'https://etvrzgixthrf.sealoshzh.site',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  preview: {
    host: true,
    port: 5175,
    allowedHosts: [
      'ozseljypupvx.sealoshzh.site',
      '.sealoshzh.site'
    ]
  },
  optimizeDeps: {
    exclude: []
  }
})
