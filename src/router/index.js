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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    
    {
      path: '/signup',
      name: 'SignUp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/SignUp.vue')
    },

    {
      path: '/adminpanel',
      name: 'AdminPanel',
      component: () => import('../views/AdminPanel.vue')
    },

    {
      path: '/mysitesview',
      name: 'MySitesView',
      component: () => import('../views/MySitesView.vue')
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('../components/SignIn.vue')
    },
    {
      path: '/adminhome',
      name: 'adminhome',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminHome.vue')
    },
    {
      path: '/createsite',
      name: 'createsite',

      component: () => import('../components/CreateSite.vue')
    }
    ,
    {
      path: '/siteselection',
      name: 'siteSelection',
     
      component: () => import('../components/SiteSelectionModal.vue')
    }
  ]
})



export default router
