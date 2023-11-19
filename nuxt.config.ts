// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path"
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      title: '六时的博客',
      meta: [
        { name: "description", content: "六时的个人网站, 有一些前端技术笔记、碎碎念、生活闲谈和一些折腾的小玩意" }
      ]
    }
  },
  alias: {
    '@': resolve(__dirname, '/'),
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  components: [
    {
      path: '~/components/',
      pathPrefix: false
    }
  ],
  typescript:{
    strict: true
  },
  runtimeConfig:{
    public: {
      BASE_URL: process.env.NUXT_APP_BASEURL
    },
  },
  plugins: [
    
  ],
  css: ['~/assets/css/main.css'],
  postcss:{
    plugins:{
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  routeRules:{
  },
  build: {
    transpile: ['gasp']
  },
})
