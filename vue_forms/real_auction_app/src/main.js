import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import db from './firebase/index'
import './theme.css'
// import 'materialize-css/dist/js/materialize.min'

createApp(App)
    .use(store)
    .use(router)
    .use(db)
    .mount('#app')
