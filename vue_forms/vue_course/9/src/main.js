import { createApp } from 'vue'
import App from './App.vue'
import './theme.css'
import plagin from './components/tranclatePlagin'
// import alertMixin from './alertMixin'

const app = createApp(App)
    // .mixin(alertMixin)
    // .directive('focus', {
    //     mounted(el) {
    //         el.focus()
    //     }
    // })
    const ru = {
        app: {
            title: 'Как работают плагины?',
            button: 'Переключить язык'
        }
    }
    const en = {
        app: {
            title: 'How plagins work?',
            button: 'Toggle language'
        }
    }
    
    app.use(plagin, {ru, en})

    app.mount('#app')
