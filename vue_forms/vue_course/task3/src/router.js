import { createRouter, createWebHistory } from 'vue-router';
import NewPage from './views/NewPage.vue';
import Task from './views/TaskMulty.vue';
import Tasks from './views/TasksMulty.vue';
// import HomePage from './App.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Tasks },
    
        { path: '/new', component: NewPage },

        { path: '/task/:id', props: true, component: Task }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'

})