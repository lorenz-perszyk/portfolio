// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/portfolio/',
    build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bookly: resolve(__dirname, 'src/pages/bookly.html'),
        grolly: resolve(__dirname, 'src/pages/grolly.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
      },
    },
  },
})