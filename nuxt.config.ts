// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/image',
  ],
  image: {
    domains: ['i.ibb.co']
  },
  runtimeConfig: {
    public: {
      imgbbAPIKey: process.env.IMGBB_API
    }
  }
})
