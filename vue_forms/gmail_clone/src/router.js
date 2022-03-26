import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/AppLogin.vue'
import Forget from './views/AppForget.vue'
import Dashboard from './views/AppDashboard.vue'
import Mail from './views/AppMail.vue'
import AppEmailBody from './components/AppEmailBody.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        //alias дополнительный путь до шаблона
        { path: '/login', component: Login, alias: '/'},
        { path: '/forget', component: Forget},
        { path: '/dashboard', component: Dashboard},
        { path: '/mail', component: Mail, children: [
            { path: ':mailId?', component: AppEmailBody, props: true }
        ]}
        //обязательный параметр
        //? делает параметр по выбору
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})