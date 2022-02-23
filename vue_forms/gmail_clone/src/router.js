import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/AppLogin.vue'
import Forget from './views/AppForget.vue'
import Dashboard from './views/AppDashboard.vue'
import Mail from './views/AppMail.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        //alias дополнительный путь до шаблона
        { path: '/login', component: Login, alias: '/'},
        { path: '/forget', component: Forget},
        { path: '/dashboard', component: Dashboard},
        { path: '/mail', component: Mail}
    ]
})