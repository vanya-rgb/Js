
Vue.createApp({
    data: () => ({
        myHtml: '<h1>Vue Appp</h1>',
        title: 'I am header',
        person: {
            firstName: 'Ivan',
            lastName: 'Lysikov',
            age: 24
        },
        items: []
    }),
    computed: {
        evenItems() {
            
            return this.items.filter(i => i % 2 === 0)
        }
    },
    methods: {
        addItem(event) {
            this.items.unshift(this.$refs.myInput.value)
            this.$refs.myInput.value = ''
            console.log(event.key)
          
        },
        remove(i) {
            this.items.splice(i,1)
        },
        log(item) {
            console.log('LOg item', item)
        }
    }
}).mount('#app')