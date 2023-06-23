import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/establishment/:id',
      name: 'establishment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EstablishmentView.vue'),
      props: true
    },
    {
      path: '/profile-edit-display',
      name: 'profile-edit-display',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileEditDisplay.vue')
    },
    {
      path: '/profile-view/:id',
      name: 'profile-view',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue'),
      props: true
    },
    {
      path: '/search-results/:phrase',
      name: 'search-results',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SearchResults.vue'),
      props: true
    },
    {
      path: '/profile-manage-reviews',
      name: 'profile-manage-reviews',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileManageReviews.vue')
    },
    {
      path: '/owner-manage-reviews',
      name: 'owner-manage-reviews',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/OwnerManage.vue')
    }
  ]
})

export default router
