import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import db from './firebase/index'
import './theme.css'
//значки
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faGears } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
import { faStar } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faGears)
library.add(faStar)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .use(router)
    .use(db)
    .mount('#app')
