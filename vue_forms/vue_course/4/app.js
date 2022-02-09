const h = Vue.h


const app = Vue.createApp({
    data() {
        return {
            title: 'from template'
        }
    },
    methods: {
        changeTitle() {
            console.log(this)
            this.title = 'New title'
        }
    },
    // template: `
    //     <div class='card center'>
    //         <h1>{{ title }}</h1>
    //         <button class='btn' @click='title = "Chaged title!"'>Change</button>
    //     </div>
    // `
    render() {
        return h('div', {
            class: 'card center'
        }, [
            h('h1', {}, this.title),
            h('button', {
                class: 'btn',
                onClick: this.changeTitle
            }, 'change')
        ])
    },
    beforeCreate() {
        console.log('before create')
    },
    created() {
        console.log(' create')
    },
    beforeMount() {
        console.log('before mount')
    },
    beforeUpdate() {
        console.log('beforeUpdate')
    },
    updated() {
        console.log('updated')
    }

    })
    

app.mount('#app')


// setTimeout( () => {
//     app.unmount()
// }, 2000)

Vue.createApp({
    data() {
        return {
            title: 'New app'
        }
    },
}).mount('#app2')

