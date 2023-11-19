/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    './api/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './store/**/**/*.{js,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,   // 组件是否带有默认样式 
    themes: ["light", "dark", "cupcake"],   // 是否默认包含所有主题
    base: true,     // 添加基础样式
    utils: true,    // 添加响应式和工具类
    logs: false,     // 允许daisyui在命令行窗口输出日志
    prefix: 'daisy-',     // 给daisyui的类名设置特定前缀
  }
}