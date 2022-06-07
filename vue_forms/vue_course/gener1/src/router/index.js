import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
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
    path: '/:id',
    name: 'CastomerPage',
    component: () => import('../views/CastomerPage.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/lk/:id',
    name: 'PrivateCabinet',
    component: () => import('../views/PrivateCabinetPage.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/lk/:id/edit',
    name: 'Edit',
    component: () => import('../views/EditPage.vue'),
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next)=> {
  const requireAuth = to.meta.auth

  if(requireAuth && store.getters['auth/isAuthenticated']) {
      next()
      //аутификация отсутствует
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
