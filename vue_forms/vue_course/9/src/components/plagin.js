export default  {
    install(app, options) {
        console.log(app)
        console.log(options)
        app.config.globalProperties.$alert = (text) => {
            window.alert(text)
        }
    }
}