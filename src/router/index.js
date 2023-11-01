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
      path: '/signup',
      name: 'SignUpModal',
      // route level code-splitting
      // this generates a separate chunk (Schedule.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/SignUpModal.vue')
    },
    
    {
      path: '/adminpanel',
      name: 'AdminPanel',
      component: () => import('../views/AdminPanel.vue')
    },

    {
      path: '/myschedule',
      name: 'My Schedule',
      component: () => import('../views/ScheduleView.vue')
    },
    
    {
      path: '/mysitesview',
      name: 'MySitesView',
      component: () => import('../views/MySitesView.vue')
    },
    {
      path: '/signin',
      name: 'SignInModal',
      component: () => import('../components/SignInModal.vue')
    }, 
  ]
})



export default router
