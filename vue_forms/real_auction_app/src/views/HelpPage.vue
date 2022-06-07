<template>
  <div>
    <app-loader v-if="loading"></app-loader>
    <app-page title = "Хоть поле и называется помощь, но сейчас помощь нужна мне. Чиркани пару строк что сделать, чтобы было все заимбирь." v-else>
    <div class="form-control">
        <textarea v-model="text" rows="3" cols="40"></textarea>
    </div>
    <button class="btn" style="margin-bottom: 20px;" @click="sendMessage">Отправить послание</button>
    <div v-for="r in requests" :key="r.id">
        <div class="card">{{r.text}}</div>
    </div>

    </app-page>
  </div>
  
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import AppPage from '../components/ui/AppPage.vue'
// import AppModal from '../components/ui/AppModal.vue'
// import RequestModal from '../components/request/RequestModal.vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader.vue'

export default {
  setup() {
    // const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const text = ref()
    
    const requests = computed(()=> store.getters['help/requests'])
      
    const sendMessage = async() => {
        loading.value = true
        await store.dispatch('help/create', {text: text.value})
        await store.dispatch('help/load')
        text.value = ''
        loading.value = false
    }
    onMounted(async() => {
      loading.value = true
      await store.dispatch('help/load')
      loading.value = false
    })
    // close: () => modal.value = false
    return {
      requests, loading, text, sendMessage
    }
  },
  components: {
    AppPage, AppLoader
  }
  
}
</script>
