import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 利用vite来解决跨域
  server:{
    proxy:{
      //前端想去后端请求 以/api开始
      '/api':{
        // 跨域，在浏览器环境下，同源策略的安全性问题
        target:'http://localhost:3000',
        rewrite: path => path.replace(/^\/api/,'')
      }
    }
  }
})
