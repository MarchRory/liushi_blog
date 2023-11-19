// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path"
export default defineNuxtConfig({
  alias: {
    '@': resolve(__dirname, '/'),
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
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
    app:{
      baseURL: import.meta.env.NUXT_APP_BASEURL
    }
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
    
  }
})
