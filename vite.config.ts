import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
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
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src')
    }
  },
  base: '/', // 设置打包路径
  server: {
    host: '0.0.0.0',
    port: 3003, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    force: true,

    // 设置代理，根据我们项目实际情况配置
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
