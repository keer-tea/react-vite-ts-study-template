import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import gzipPlugin from 'rollup-plugin-gzip'
// import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  return {
    plugins: [
      react({
        babel: {
          babelrc: true,
        },
      }),
      legacy({
        targets: ['> 0.25%', 'last 2 versions and not dead'],
      }),
    ],
    base: './',
    build: {
      minify: 'terser',
      rollupOptions: {
        plugins: [gzipPlugin()]
      },
      terserOptions: {
        /**
          * mode 用来判断环境
          */
        compress: {
          // 默认是 false
          drop_console: config.mode === 'prod',
          // 默认是 true
          drop_debugger: config.mode === 'prod',
        },
      }
    },
    resolve: {
      alias: {
        // 只能是绝对路径
        // '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@': path.resolve('./src')
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5175
    }
  }
})
