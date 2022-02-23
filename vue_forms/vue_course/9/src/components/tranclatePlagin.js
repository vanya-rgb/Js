export default {
    install(app, options) {
        let current = 'ru'

        const changeLanguage = name => {
            
            current == name ? current = 'ru' : current = 'en'
            console.log(current)
        }

        app.config.globalProperties.$alert = text => {
            window.alert(text)
        }

        app.config.globalProperties.$i18n = key => {
            //app.title -> [app, title]
            return key.split('.').reduce((words, k)=>{
                return words[k] || '=== Unknown'
            }, options[current])
        }

        app.provide('changeI18N', changeLanguage)
    }
}