// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/node_modules/bootstrap/dist/css/bootstrap.min.css', '~/assets/styles/style.scss'],

  runtimeConfig: {
    mongoUrl:
      'mongodb+srv://forage-dev:p0g1-n10ng-lht-0nG-lg8-22oh-HD@forage.khfekqf.mongodb.net/forage?retryWrites=true&w=majority'
  },

  modules: ['@nuxtjs/supabase']
})