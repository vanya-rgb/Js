<template>
  <div>
    <title>Главная</title>
    <app-loader v-if="loading"></app-loader>
    <app-page visible="true" title = "Список заявок" v-else>
      <request-filter v-model="filter"></request-filter>
      <reqest-table :requests="requests"></reqest-table>
    </app-page>
    <!-- <router-link to="/upload">
      <a href="">Загрузка фоточки</a>
    </router-link> -->
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import AppPage from '../components/ui/AppPage.vue'
import ReqestTable from '../components/requests/RequestTable.vue'
import RequestFilter from '../components/requests/RequestFilter.vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader.vue'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    const filter = ref({})
    //следим за изменением filter
    // watch(filter, val => console.log(val))

    //Список записей
    // фильтруем от заданных параметров
    const requests = computed(()=> store.getters['request/requests']
      .filter(request => {
        if (request.status){
          return request.status == 'active' || request.status == 'pending'
        }
      })
      .sort((a, b) => {
        switch(filter.value.filter) {
          case 'earlier': {
            return new Date(a.dateSort) - new Date(b.dateSort)
          }
          case 'later': {
            return new Date(b.dateSort) - new Date(a.dateSort)
          }
          case 'expensive': {
            return b.amount - a.amount
          }
          case 'cheap': {
            return a.amount - b.amount
          }
        }
      })
    )

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
