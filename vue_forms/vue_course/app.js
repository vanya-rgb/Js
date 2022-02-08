const App = {
    data() {
        return {
            title: 'List of notes:',
            placeholderString: 'Input name of note',
            inputValue: '',
            notes: ['Note1', 'Note2']
        }
    },
    methods: {
        addNewNote(){
            if(this.inputValue != '') {
                this.notes.push(this.inputValue)
                this.inputValue = ''
            }
        },
        toUpperCase(item) {
            return item.toUpperCase()
        },
        removeNote(idx, event){
            this.notes.splice(idx, 1)
        },
        
    },
    //должны что-то возвращать
    //вызывается если только изменяется переменная this.notes 
    computed: {
        doubleCountComputed() {
            return this.notes.length *2
        }
    },
    // watch: {
    //     inputValue(value) {
            
    //         console.log('changed', value)
    //     }

    // }

}

Vue.createApp(App).mount('#app')