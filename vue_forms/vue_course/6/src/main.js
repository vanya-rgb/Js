import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import theHeader from './theHeader.vue'
import './theme.css'


const app = createApp(App)


//global
app.component('the-header', theHeader)
app.component('acync-component', defineAsyncComponent(() => {
    return import ('./AppAcyncComp.vue')
}))

app.mount('#app')