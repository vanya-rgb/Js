<template>
  <div>
    <app-loader v-if="loading"></app-loader>
    <app-page title = "Список заявок" v-else>
      <!-- <template #header>
        <button class="btn primary" @click="modal = true"> Создать</button>
      </template> -->
      <!-- принимаем name и status в filter -->
      <request-filter v-model="filter"></request-filter>
      <reqest-table :requests="requests"></reqest-table>

    </app-page>
  </div>
  
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import AppPage from '../components/ui/AppPage.vue'
import ReqestTable from '../components/request/RequestTable.vue'
// import AppModal from '../components/ui/AppModal.vue'
import RequestFilter from '../components/request/RequestFilter.vue'
// import RequestModal from '../components/request/RequestModal.vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader.vue'

export default {
  setup() {
    // const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const filter = ref({})
    //следим за изменением filter
    // watch(filter, val => console.log(val))

    //Список записей
    // фильтруем от заданных параметров
    const requests = computed(()=> store.getters['request/requests']
      .filter(request => {
        if (filter.value.name) {
          return request.fio.includes(filter.value.name)
        }
        return request
      })
      .filter(request => {
        if (filter.value.status){
          return filter.value.status === request.status
        }
        return request
      })
    )
    console.log("REQUESYS", requests);

    onMounted(async() => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })
    // close: () => modal.value = false
    return {
      requests, loading, filter
    }
  },
  components: {
    AppPage, ReqestTable, AppLoader, RequestFilter
  }
  
}
</script>
