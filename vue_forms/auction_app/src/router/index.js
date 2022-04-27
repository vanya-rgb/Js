import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomePage.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/EnterPage.vue'),
        meta: {
            layout: 'auth'
        }
    },
    {
        path: '/help',
        name: 'Help',
        component: () => import('../views/HelpPage.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/lk',
        name: 'PrivateCabinet',
        component: () => import('../views/PrivateCabinet.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/forget',
        name: 'Forget',
        component: () => import('../views/ForgetPage.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/create',
        name: 'Create',
        component: () => import('../components/AppForm.vue'),
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/task/:id',
        name: 'Task',
        props: true,
        component: () => import('../views/tasks/TaskPage.vue'),
        meta: {
            layout: 'main'
        }
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

export default router