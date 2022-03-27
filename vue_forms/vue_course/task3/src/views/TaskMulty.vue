<template>
  <div class="card" v-if="task">
    <h2>{{task.title}}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="setStatus('active')">Взять в работу</button>
      <button class="btn primary" @click="setStatus('done')">Завершить</button>
      <button class="btn danger" @click="setStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{idKey}}</strong> нет.
  </h3>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
  components: {AppStatus},
  props: ['id'],
  
  setup(props) {
    const store = useStore()
    const router = useRouter()

    console.log(props.id)
    const task = computed(() => store.getters.taskById(props.id))

    const setStatus = status => {
      const updated = {...task.value, status}
      store.dispatch('changeTask', updated)
      router.push('/')
    }

    return {
      task,
      idKey: props.id,
      setStatus
    }
  }
}
</script>

<style scoped>

</style>