import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    // proxy: {
    //   // 代理所有以 /api 开头的请求到目标服务器
    //   '/api': {
    //     target: 'http://localhost:8080', // 目标服务器的地址
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '') // 去掉 /api 前缀
    //   }
    // }
  },
});
