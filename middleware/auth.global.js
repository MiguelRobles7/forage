export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    if ((to.path === '/profile/edit/display' ||
         to.path==='/profile/edit/manage-reviews'|| 
         to.path.includes('/establishment/review/')) && 
         !user.value) {
      return navigateTo('/')
    }

  })