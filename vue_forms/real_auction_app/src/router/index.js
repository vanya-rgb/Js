import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import ('../views/HomePage.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthPage.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/edit/:localId',
    name: 'Edit',
    component: () => import('../views/EditPage.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/:localId',
    name: 'PrivateCabinet',
    component: () => import('../views/PrivateCabinet.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/guest/:userId',
    name: 'UserPage',
    component: () => import('../views/UserPage.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/RequestPage.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/requestLk/:id',
    name: 'RequestCabinet',
    component: () => import('../views/RequestPageCabinet.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/requesDone/:id',
    name: 'RequestDone',
    component: () => import('../views/RequestPageDone.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/requestExe/:id',
    name: 'RequestExe',
    component: () => import('../views/RequestPageExe.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/reg',
    name: 'Registration',
    component: () => import('../views/RegistrationPage.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpPage.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next)=> {
  const requireAuth = to.meta.auth

  if(requireAuth && store.getters['auth/isAuthentificated']) {
      next()
      //аутификация отсутствует
  } else if (requireAuth && !store.getters['auth/isAuthentificated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
