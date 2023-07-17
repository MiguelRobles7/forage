// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/node_modules/bootstrap/dist/css/bootstrap.min.css', '~/assets/styles/style.scss'],
  modules: ['@nuxtjs/supabase']
})