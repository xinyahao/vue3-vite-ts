import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import pxtovw from 'postcss-px-to-viewport-8-plugin'
// import checkConfig from './src/utils/checkConfig'

// Load the environment variable file based on the environment variables
const envFile = `.env.${process.env.NODE_ENV}`
// const exampleEnvFile = '.env.example'
const file = dotenv.parse(fs.readFileSync(envFile))
for (const key in file as object) {
  process.env[key] = file[key]
}

// Add check config since Deployment need this
// Also removed the error handling for this
// checkConfig(envFile, exampleEnvFile)

console.log(`Starting server in ${process.env.NODE_ENV} mode`)

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        pxtovw({
          unitToConvert: 'px',
          viewportWidth: 750,
          unitPrecision: 6,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ignore-'],
          minPixelValue: 1,
          mediaQuery: true,
          replace: true,
          exclude: [/node_modules\/vant/i],
          landscape: false
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src')
    }
  },
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 3003,
    open: false,
    cors: true,
    force: true,

    // set proxy
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    fs: {
      strict: false
    }
  }
})
