import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import store from './store'
import './theme.css'
import db from './firebase/index'

createApp(App)
    .use(router)
    .use(store)
    .use(db)
    .mount('#app');
