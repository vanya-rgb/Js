<template>
    <div class="card" >
      <h3>{{ title }}</h3>
      <app-button @action= "open">{{isNewsOpen ? 'Close' : 'Open'}}</app-button>
      <!-- передаем событие напрямую через click -->
      <app-button color="danger" v-if="wasRead" @action = "$emit('unmark', id)">Mark us unread</app-button>
      <div v-if="isNewsOpen">
          <p v-if="isNewsOpen">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe commodi qui ducimus vel quis! Dignissimos illum amet, soluta maiores quia eos laboriosam nemo ea molestias id sed repudiandae nesciunt in?</p>
          <app-button v-if = "!wasRead" color="primary" @action= "mark">Read news</app-button>
            <!-- передали параметр из App -->
          <app-news-list></app-news-list>
      </div>
    </div>
</template>

<script>
import AppButton from "./AppButton.vue"
import AppNewsList from './AppNewsList.vue'
export default {
    // props: ['title'],
    props: {
        wasRead: Boolean,

        title: {
            type: String,
            required: true
        },
        id: {
            type:Number,
            required: true
        },
        isOpen: {
            type: Boolean,
            required: false,
            default: true,
            validator(value){
                return value === true || value === false
            }
        },
    },
    // emits: ['open-news'],
    emits: {
        'open-news': null,
        'read-news'(id) {
            if(id) {return true}
            console.warn('No id parametr for read news')
            return false
        },
        unmark: null
    },
    data() {
        return {
            isNewsOpen: this.isOpen,
        }
    },
    methods: {
        open() {
            this.isNewsOpen = !this.isNewsOpen

            if (this.isNewsOpen) {
                //сообщение родителю о событии и передача параметра
            this.$emit('open-news')
            }
        },
        mark() {
            this.isNewsOpen = false
            this.$emit('read-news', this.id)
        },
        // unmark() {
        //     this.$emit('unmark', this.id)
        // }
    },
    components: {
        AppButton, AppNewsList
    }
}
</script>